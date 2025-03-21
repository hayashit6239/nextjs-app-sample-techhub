"use server";

import { ProjectListPresentational } from "./presentational";
import { getProjects } from "../../_utils/fetcher";

export async function ProjectListContainer() {
    const res = await getProjects();

    if (!res.ok) {
        console.log(res.error);
        throw new Error("Failed to fetch products");
    }

    const projects = res.value;

    return (
        <>
            <ProjectListPresentational projects={projects.map(x => {
                return {
                    id: x.id,
                    name: x.name,
                    description: x.description,
                    representativeName: x.representativeName,
                    representativeEmail: x.representativeEmail,
                    departmentName: x.departmentName,
                    techtopicCount: x.techtopics.length
                }
            })}/>
        </>
    )
}
