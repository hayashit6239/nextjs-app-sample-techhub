import { NextResponse } from "next/server";
import { ResProject } from "@/lib/server-response-types";
import { corsHeaders } from "@/lib/cors";
import { getProjectsWithTechtopics } from "@/lib/repositories/project-repository";


export async function GET() {
    try {
        const projectsWithTechtopics = await getProjectsWithTechtopics();
        
        return NextResponse.json(
            projectsWithTechtopics as ResProject[],
            {
                status: 200,
                headers: corsHeaders
            }
        );
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }
}

