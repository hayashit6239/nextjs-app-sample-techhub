"use server";

import { prisma } from "@/lib/prisma";
import { ResTechtopic } from "@/lib/server-response-types";
import { Adoption } from "@/lib/server-types";
import { Result } from "@/lib/type";

export async function getAdoptionsByProjectId(projectId: number): Promise<Result<ResTechtopic[], string>> {

    const adoptions = await _fetchAdoptionsByProjectId(projectId);
    return {
        ok: true,
        value: adoptions.map(adoption => {
            return {
                id: adoption.techtopic.id,
                name: adoption.techtopic.name,
                techcategoryName: adoption.techtopic.techcategoryName,
                version: adoption.version,
                purpose: adoption.purpose,
                adoptionId: adoption.id
            }
        }) as ResTechtopic[]
    } 
}

async function _fetchAdoptionsByProjectId(projectId: number): Promise<Adoption[]> {
    return await prisma
        .adoption
        .findMany({
            where: {
                projectId: projectId
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

export async function deleteAdoptions(adoptionIds: number[]): Promise<Result<void, string>> {

    const resList = adoptionIds.map(async (adoptionId) => {
        await prisma.adoption.delete({
            where: {
                id: adoptionId
            }
        });
    })

    await Promise.all(resList);

   return { ok: true, value: undefined };
}
