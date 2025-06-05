"use server";

import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { ResProject } from "@/lib/server-response-types";
import { Result } from "@/lib/type";


export const getProjects = cache(async (): Promise<Result<ResProject[], string>> => {
    try {
        const projectsWithAdoptions = await _fetchProjectsWithAdoptions();
        return { ok: true, value: projectsWithAdoptions };
    } catch (e) {
        if (e instanceof Error) {
            return { ok: false, error: e.message };
        }
        throw e; 
    }
});

async function _fetchProjectsWithAdoptions(): Promise<ResProject[]> {
    const projects = await prisma.project.findMany({
        include: {
            department: true,
            adoption: {
                include: {
                    techtopic: {
                        include: {
                            techcategory: true,
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
            adoptionId: adoption.id,
        }))
    }));
}