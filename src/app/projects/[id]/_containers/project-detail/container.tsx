"use server";

import { ProjectDetailPresentational } from "./presentational";
import { getProject, getUserWithProjectIds } from "../../_utils/fetcher";

type Props = {
    projectId: number;
    children: React.ReactNode;
}

export async function ProjectDetailContainer(props: Props) {
    const { projectId, children } = props;

    const res = await getProject(projectId);

    if (!res.ok) {
        console.log(res.error);
        throw new Error("Failed to fetch project");
    }

    const project = res.value;

    const res2 = await getUserWithProjectIds();

    if (!res2.ok) {
        console.log(res2.error);
        throw new Error("Failed to fetch user");
    }

    const user = res2.value;

    return (
        <div className="">
            <ProjectDetailPresentational
                project={
                    {
                        id: project.id,
                        name: project.name,
                        description: project.description,
                        representativeName: project.representativeName,
                        representativeEmail: project.representativeEmail,
                        departmentName: project.departmentName,
                    }
                }
                isEditable={user !== null  && user.projectIds.includes(projectId)}
            >
                {children}
            </ProjectDetailPresentational>
        </div>
    )
}
