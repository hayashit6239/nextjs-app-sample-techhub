import { ResTechtopic } from "@/lib/server-response-types";
import { ProjectTechtopicListPresentational, TechCategoryTopic } from "./presentational";
import { getAdoptionsByProjectId } from "../../_utils/fetcher";

type Props = {
    projectId: number;
}

export async function ProjectTechtopicListContainer(props: Props) {
    const { projectId } = props;

    const res = await getAdoptionsByProjectId(projectId);

    if (!res.ok) {
        console.log(res.error);
        throw new Error("Failed to fetch adoptions");
    }

    const adoptions = res.value;
    
    return (
        <ProjectTechtopicListPresentational
            techCategoryTopics={transformTechtopicsToTechCategoryTopics(adoptions)}
        />
    )
}

// プロジェクトに紐づく技術トピックをカテゴリごとに分類する
function transformTechtopicsToTechCategoryTopics (techtopics: ResTechtopic[]): TechCategoryTopic[] {
    const techCategoryTopics: { [techcategoryName: string]: ResTechtopic[] } = {};

    techtopics.forEach(item => {
        if (!techCategoryTopics[item.techcategoryName]) {
            techCategoryTopics[item.techcategoryName] = [];
        }
        techCategoryTopics[item.techcategoryName].push(item);
    });

    return Object.keys(techCategoryTopics).map(techcategoryName => {
        return {
            techCategoryName: techcategoryName,
            techtopics: techCategoryTopics[techcategoryName]
        }
    })

}