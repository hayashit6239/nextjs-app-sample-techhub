"use server";

import { Adoption, ProjectWithDepartmentName } from "@/lib/server-types";
import { prisma } from "@/lib/prisma";
import { ResProject, ResTechtopic, ResUser } from "@/lib/server-response-types";
import { sleep } from "@/lib/utils";
import { Result } from "@/lib/type";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export async function getProject(projectId: number): Promise<Result<ResProject, string>> {
    try {
        const project = await _fetchProject(projectId);

        if (project === null) {
            return  { ok: false, error: "Project not found" };
        }

        const adoptions = await _fetchAdoptionsByProjectId(projectId);

        const projectWithTechtopics = {
            ...project,
            techtopics: adoptions.map((adoption) => {
                return {
                    id: adoption.techtopic.id,
                    name: adoption.techtopic.name,
                    techcategoryName: adoption.techtopic.techcategoryName,
                    version: adoption.version,
                    purpose: adoption.purpose,
                }
            })
        } as ResProject;

        return { ok: true, value: projectWithTechtopics };
    } catch (e) {
        if (e instanceof Error) {
            return { ok: false, error: e.message };
        }
        throw e; 
    }
}

export async function getUserWithProjectIds(): Promise<Result<ResUser | null, string>>{
    try {
        const cookie = (await cookies()).get("session")?.value;

        if (!cookie) {
            return { ok: true, value: null };
        }

        const session = await decrypt(cookie);
        if (!session) {
            return { ok: true, value: null };
        }

        const userId = Number(session.sub);
        const userWithProjectIds = await _fetchUser(userId);

        if (!userWithProjectIds) {
            return { ok: true, value: null };
        }

        return { ok: true, value: userWithProjectIds };
    } catch (e) {
        if (e instanceof Error) {
            return { ok: false, error: e.message };
        }
        throw e; 
    }
}

export async function getAdoptionsByProjectId(projectId: number): Promise<Result<ResTechtopic[], string>> {
    try {
        const adoptions = await _fetchAdoptionsByProjectId(projectId);

        await sleep(1500);

        return { 
            ok: true,
            value: adoptions.map((adoption) => {
                return {
                    id: adoption.techtopic.id,
                    name: adoption.techtopic.name,
                    techcategoryName: adoption.techtopic.techcategoryName,
                    version: adoption.version,
                    purpose: adoption.purpose,
                    adoptionId: adoption.id
                }
            }) 
        };
    } catch (e) {
        if (e instanceof Error) {
            return { ok: false, error: e.message };
        }
        throw e;
    }
}

async function _fetchProject(id: number): Promise<ProjectWithDepartmentName | null> {
    return await prisma
        .project
        .findUnique(
            {
                where: {
                    id,
                },
                include: {
                    department: true,
                }
            }
        )
        .then((project) => {

            if(project === null) {
                return null;
            }

            return {
                id: project.id,
                name: project.name,
                description: project.description || "",
                representativeName: project.representativeName,
                representativeEmail: project.representativeEmail,
                departmentName: project.department.name,
            }
        })
}

async function _fetchAdoptionsByProjectId(projectId: number): Promise<Adoption[]> {
    return await prisma
        .adoption
        .findMany({
            where: {
                projectId,
            },
            include: {
                project: true,
                techtopic: {
                    include: {
                        techcategory: true,
                    },
                }
            }
        })
        .then((adoptions) => {
            return adoptions.map((adoption) => {
                return {
                    id: adoption.id,
                    projectId: adoption.project.id,
                    techtopic: {
                        id: adoption.techtopic.id,
                        name: adoption.techtopic.name,
                        techcategoryName: adoption.techtopic.techcategory.name,
                    },
                    version: adoption.version,
                    purpose: adoption.purpose,
                }
            })
        })
}

async function _fetchUser(userId: number): Promise<ResUser | null> {
    return await prisma
        .user
        .findUnique({
            where: {
                id: userId
            },
            include: {
                affiliations: true,
            }
        })
        .then((user) => {
            if (!user) {
                return null;
            }

            return {
                id: user.id,
                name: user.name,
                projectIds: user.affiliations.map((affiliation) => affiliation.projectId)
            }
        })
}