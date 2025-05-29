"use server";

import { ResProject, ResTechtopic, ResUser } from "@/lib/server-response-types";
import { Result } from "@/lib/type";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { getProjectWithTechtopics, getTechtopicsByProjectId, getUserWithProjectIds as getUserWithProjectIdsRepo } from "@/lib/repositories/project-repository";

export async function getProject(projectId: number): Promise<Result<ResProject, string>> {
    try {
        const project = await getProjectWithTechtopics(projectId);

        if (project === null) {
            return  { ok: false, error: "Project not found" };
        }

        return { ok: true, value: project };
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
        const userWithProjectIds = await getUserWithProjectIdsRepo(userId);

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
        const techtopics = await getTechtopicsByProjectId(projectId);

        return { 
            ok: true,
            value: techtopics
        };
    } catch (e) {
        if (e instanceof Error) {
            return { ok: false, error: e.message };
        }
        throw e;
    }
}

// テスト用にプライベート関数だが export する - リポジトリ層に移動済み
export async function _fetchUser(userId: number): Promise<ResUser | null> {
    return await getUserWithProjectIdsRepo(userId);
}