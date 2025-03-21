"use server";

import { ProjectList } from "./_containers/project-list";

export default async function ProjectPage() {
    return (
        <div className="">
            <ProjectList />
        </div>
    )
}