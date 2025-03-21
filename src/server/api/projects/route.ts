import { NextResponse } from "next/server";
import { Adoption, ProjectWithDepartmentName } from "@/lib/server-types";
import { prisma } from "@/lib/prisma";
import { ResProject } from "@/lib/server-response-types";
import { corsHeaders } from "@/lib/cors";


export async function GET() {
    const projects = await _fetchProjects();

    const adoptions = await _fetchAdoptions();

    const projectsWithTechtopics = projects.map((project) => {
        return {
            id: project.id,
            name: project.name,
            description: project.description,
            representativeName: project.representativeName,
            representativeEmail: project.representativeEmail,
            departmentName: project.departmentName,
            techtopics: adoptions
                .filter((adoption) => adoption.projectId === project.id)
                .map((adoption) => {
                    return {
                        id: adoption.techtopic.id,
                        name: adoption.techtopic.name,
                        techcategoryName: adoption.techtopic.techcategoryName,
                        version: adoption.version,
                        purpose: adoption.purpose,
                    }
                })
        }
    })
    return NextResponse.json(
        projectsWithTechtopics as ResProject[],
        {
            status: 200,
            headers: corsHeaders
        }
    );
}

async function _fetchProjects(): Promise<ProjectWithDepartmentName[]> {
    return await prisma
        .project
        .findMany({
            include: {
                department: true,
            }
        })
        .then((projects) => {
            return projects.map((project) => {
                return {
                    id: project.id,
                    name: project.name,
                    description: project.description || "",
                    representativeName: project.representativeName,
                    representativeEmail: project.representativeEmail,
                    departmentName: project.department.name,
                }
            })
        })
}

async function _fetchAdoptions(): Promise<Adoption[]> {
    return await prisma
        .adoption
        .findMany({
            include: {
                project: {
                    include: {
                        department: true,
                    }
                },  
                techtopic: {
                    include: {
                        techcategory: true,
                    }
                }
            }   
        })
        .then((adopts) => {
            return adopts.map((adopt) => {
                return {
                    id: adopt.id,
                    projectId: adopt.project.id,
                    techtopic: {
                        id: adopt.techtopic.id,
                        name: adopt.techtopic.name,
                        techcategoryName: adopt.techtopic.techcategory.name,
                    },
                    version: adopt.version,
                    purpose: adopt.purpose,
                }
            })
        })
}