"use server";

import { prisma } from "@/lib/prisma"
import { ResTechtopic } from "@/lib/server-response-types";
import { Adoption } from "@/lib/server-types"
import { Result } from "@/lib/type";

export async function getAdoptions(): Promise<Result<ResTechtopic[], string>> {

    const adoptions = await _fetchAdoptions();
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

async function _fetchAdoptions(): Promise<Adoption[]> {
    return await prisma
        .adoption
        .findMany({
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
