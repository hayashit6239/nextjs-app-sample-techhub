"use server";

import { NextRequest, NextResponse } from "next/server";
import { Adoption, ProjectWithDepartmentName } from "@/lib/server-types";
import { prisma } from "@/lib/prisma";
import { ResProject } from "@/lib/server-response-types";
import { corsHeaders } from "@/lib/cors";
import { sleep } from "@/lib/utils";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const projectId = Number(id);
    if (typeof projectId !== "number") {
        return NextResponse.json( {message: "ProjectId is not Number"}, { status: 500 });;
    }

    const project = await _fetchProject(projectId);

    if (project === null) {
        return NextResponse.json( {message: "Project not found"}, { status: 404 });
    }

    const adoptions = await _fetchAdoptionsByProjectId(projectId);

    await sleep(1500);

    return NextResponse.json({
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
    } as ResProject,
    {
        status: 200,
        headers: corsHeaders
    })
}

async function _fetchProject(id: number): Promise<ProjectWithDepartmentName | null> {
    return await prisma
        .project
        .findUnique(
            {
                where: {
                    id,
                },
                include: {
                    department: true,
                }
            }
        )
        .then((project) => {

            if(project === null) {
                return null;
            }

            return {
                id: project.id,
                name: project.name,
                description: project.description || "",
                representativeName: project.representativeName,
                representativeEmail: project.representativeEmail,
                departmentName: project.department.name,
            }
        })
}

async function _fetchAdoptionsByProjectId(projectId: number): Promise<Adoption[]> {
    return await prisma
        .adoption
        .findMany({
            where: {
                projectId,
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