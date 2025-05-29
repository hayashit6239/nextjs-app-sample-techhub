"use server";

import { prisma } from "@/lib/prisma";
import { ResProject, ResTechtopic, ResUser } from "@/lib/server-response-types";

export async function getProjectsWithTechtopics(): Promise<ResProject[]> {
    const projects = await prisma.project.findMany({
        include: {
            department: true,
            adoption: {
                include: {
                    techtopic: {
                        include: {
                            techcategory: true
                        }
                    }
                }
            }
        }
    });

    return projects.map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description || "",
        representativeName: project.representativeName,
        representativeEmail: project.representativeEmail,
        departmentName: project.department.name,
        techtopics: project.adoption.map((adoption) => ({
            id: adoption.techtopic.id,
            name: adoption.techtopic.name,
            techcategoryName: adoption.techtopic.techcategory.name,
            version: adoption.version,
            purpose: adoption.purpose,
        }))
    }));
}

export async function getProjectWithTechtopics(projectId: number): Promise<ResProject | null> {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        include: {
            department: true,
            adoption: {
                include: {
                    techtopic: {
                        include: {
                            techcategory: true
                        }
                    }
                }
            }
        }
    });

    if (!project) {
        return null;
    }

    return {
        id: project.id,
        name: project.name,
        description: project.description || "",
        representativeName: project.representativeName,
        representativeEmail: project.representativeEmail,
        departmentName: project.department.name,
        techtopics: project.adoption.map((adoption) => ({
            id: adoption.techtopic.id,
            name: adoption.techtopic.name,
            techcategoryName: adoption.techtopic.techcategory.name,
            version: adoption.version,
            purpose: adoption.purpose,
        }))
    };
}

export async function getTechtopicsByProjectId(projectId: number): Promise<ResTechtopic[]> {
    const adoptions = await prisma.adoption.findMany({
        where: {
            projectId,
        },
        include: {
            techtopic: {
                include: {
                    techcategory: true
                }
            }
        }
    });

    return adoptions.map((adoption) => ({
        id: adoption.techtopic.id,
        name: adoption.techtopic.name,
        techcategoryName: adoption.techtopic.techcategory.name,
        version: adoption.version,
        purpose: adoption.purpose,
        adoptionId: adoption.id
    }));
}

export async function getUserWithProjectIds(userId: number): Promise<ResUser | null> {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            affiliations: true,
        }
    });

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        name: user.name,
        projectIds: user.affiliations.map((affiliation) => affiliation.projectId)
    };
}