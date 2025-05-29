"use server";

import { ResProject } from "@/lib/server-response-types";
import { Result } from "@/lib/type";
import { getProjectsWithTechtopics } from "@/lib/repositories/project-repository";


export async function getProjects(): Promise<Result<ResProject[], string>> {
    try {
        const projectsWithTechtopics = await getProjectsWithTechtopics();
        return { ok: true, value: projectsWithTechtopics };
    } catch (e) {
        if (e instanceof Error) {
            return { ok: false, error: e.message };
        }
        throw e; 
    }
}

