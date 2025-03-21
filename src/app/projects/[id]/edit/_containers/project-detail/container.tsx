import { getProject } from "../../_utils/fetcher";
import { ProjectDetailPresentational  } from "./presentational";
import { transformTechtopicsToTechCategoryTopics } from "@/lib/utils";

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
                        techCategoryTopics: transformTechtopicsToTechCategoryTopics(project.techtopics)
                    }
                }
            >
                {children}
            </ProjectDetailPresentational>
        </div>
    )
}
