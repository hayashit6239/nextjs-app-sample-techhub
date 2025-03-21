"use server"

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

type DeleteAdoptionForm = {
    projectId?: number;
    adoptionIds: number[];
}

type ZodErrors = {
    projectId?: string[];
    adoptionId?: string[];
}

type DeleteAdoptionsState = DeleteAdoptionForm & {
    zodErrors?: ZodErrors;
}

const DeleteAdoptionsFormSchema = z.object({
    projectId: z.number(),
    adoptionIds: z.array(z.number()).nonempty(),
});

export async function deleteAdoptions(prevState: DeleteAdoptionsState, formData: FormData): Promise<DeleteAdoptionsState> {
    const projectId = formData.get("projectId") as string;
    const adoptionIds = formData.get("adoptionIds") as string;
    console.log(projectId);
    console.log(adoptionIds);
    const validatedFormData = DeleteAdoptionsFormSchema.safeParse({
        projectId: Number(projectId),
        adoptionIds: adoptionIds
    });
    console.log(validatedFormData);
    if (!validatedFormData.success) {
        console.log(validatedFormData.error.flatten().fieldErrors as ZodErrors);
        return {
            adoptionIds: [],
            zodErrors: validatedFormData.error.flatten().fieldErrors as ZodErrors,
        }
    }

    const resList = validatedFormData.data.adoptionIds.map(async (adoptionId) => {
        await _mutateDeleteAdoptions(adoptionId);
    })

    await Promise.all(resList);

    redirect(`/projects/${validatedFormData.data.projectId}/edit`);
}

async function _mutateDeleteAdoptions(adoptionId: number): Promise<void> {
    await prisma.adoption.delete({
        where: {
            id: adoptionId
        }
    });
}
