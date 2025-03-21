import { corsHeaders } from "@/lib/cors";
import { prisma } from "@/lib/prisma"
import { ResTechtopic } from "@/lib/server-response-types";
import { Adoption } from "@/lib/server-types"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const projectId = searchParams.get("projectId");

    const adoptions = projectId ? (
        await _fetchAdoptionsByProjectId(Number(projectId))
    ) : (
        await _fetchAdoptions()
    )

    return NextResponse.json(adoptions.map(adoption => {
        return {
            id: adoption.techtopic.id,
            name: adoption.techtopic.name,
            techcategoryName: adoption.techtopic.techcategoryName,
            version: adoption.version,
            purpose: adoption.purpose,
            adoptionId: adoption.id
        }
    }) as ResTechtopic[],
    {
        status: 200,
        headers: corsHeaders
    }); 
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

export async function POST(request: NextRequest) {;
    const body = await request.json()

    const createdAdoption = await prisma.adoption.create({
        data: {
            version: body.version,
            purpose: body.purpose,
            techtopicId: body.techtopicId,
            projectId: body.projectId
        },
    });
    return NextResponse.json(
        createdAdoption,
        {
            status: 200,
            headers: corsHeaders
        }
    );
}
