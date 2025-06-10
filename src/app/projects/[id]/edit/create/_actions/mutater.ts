"use server"

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { FormStatus } from "../_utils/enum";

type PostAdoptionForm = {
    status?: string;
    projectId: number;
    techtopicId: number;
    version: string;
    purpose: string;
}

type ZodErrors = {
    projectId?: string[];
    techtopicId?: string[];
    version?: string[];
    purpose?: string[];
}

type PostAdoptionFormState = PostAdoptionForm & {
    zodErrors?: ZodErrors;
}

const PostAdoptionFormSchema = z.object({
    projectId: z.number().min(1),
    techtopicId: z.number(),
    version: z.string().min(1),
    purpose: z.string().min(1),
});

export async function postAdoption(prevState: PostAdoptionFormState, formData: FormData): Promise<PostAdoptionFormState> {
    const projectId = formData.get("projectId") as string;
    const techtopicId = formData.get("techtopicId") as string;
    const version = formData.get("version") as string;
    const purpose = formData.get("purpose") as string;

    const validatedFormData = PostAdoptionFormSchema.safeParse({
        projectId: Number(projectId),
        techtopicId: Number(techtopicId),
        version,
        purpose,
    });


    if (!validatedFormData.success) {
        return {
            status: FormStatus.FAILED,
            projectId: Number(projectId),
            techtopicId: Number(techtopicId),
            version,
            purpose,
            zodErrors: validatedFormData.error.flatten().fieldErrors as ZodErrors,
        }
    }

    await _mutateCreateAdoption(validatedFormData.data);

    return {
        status: FormStatus.SUCCESS,
        projectId: Number(projectId),
        techtopicId: Number(techtopicId),
        version,
        purpose,
    }
}

export async function _mutateCreateAdoption(data: PostAdoptionForm) {
    const createdAdoption = await prisma.adoption.create({
        data: {
            version: data.version,
            purpose: data.purpose,
            techtopicId: data.techtopicId,
            projectId: data.projectId
        },
    });

    return createdAdoption;
}