"use server";

import { cache } from "react";
import { Adoption, ProjectWithDepartmentName } from "@/lib/server-types";
import { prisma } from "@/lib/prisma";
import { ResProject, ResTechtopic, ResUser } from "@/lib/server-response-types";
import { Result } from "@/lib/type";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export const getProject = cache(async (projectId: number): Promise<Result<ResProject, string>> => {
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
});

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

export const getAdoptionsByProjectId = cache(async (projectId: number): Promise<Result<ResTechtopic[], string>> => {
    try {
        const adoptions = await _fetchAdoptionsByProjectId(projectId);


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
});

async function _fetchProject(id: number): Promise<ProjectWithDepartmentName | null> {
    const project = await prisma.project.findUnique({
        where: { id },
        include: { department: true }
    });

    if (!project) return null;

    return {
        id: project.id,
        name: project.name,
        description: project.description || "",
        representativeName: project.representativeName,
        representativeEmail: project.representativeEmail,
        departmentName: project.department.name,
    };
}

async function _fetchAdoptionsByProjectId(projectId: number): Promise<Adoption[]> {
    const adoptions = await prisma.adoption.findMany({
        where: { projectId },
        include: {
            project: true,
            techtopic: {
                include: {
                    techcategory: true,
                }
            }
        }
    });

    return adoptions.map((adoption) => ({
        id: adoption.id,
        projectId: adoption.project.id,
        techtopic: {
            id: adoption.techtopic.id,
            name: adoption.techtopic.name,
            techcategoryName: adoption.techtopic.techcategory.name,
        },
        version: adoption.version,
        purpose: adoption.purpose,
    }));
}

// テスト用にプライベート関数だが export する
export async function _fetchUser(userId: number): Promise<ResUser | null> {
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