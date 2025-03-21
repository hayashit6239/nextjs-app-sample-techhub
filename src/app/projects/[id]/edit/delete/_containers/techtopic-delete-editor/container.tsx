"use client";

import { TechCategoryAndTopicNames, TechCategoryTopicWithAdoptionId, TechtopicDeleteEditorPresentational } from "./presentational";
import { ResTechtopic } from "@/lib/server-response-types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getAdoptionsByProjectId } from "../../_utils/fetcher";

export function TechtopicDeleteEditorContainer() {
    const [techCategoryTopics, setTechCategoryTopics] = useState<TechCategoryAndTopicNames[]>([]);

    const pathname = usePathname();
    if (pathname.split("/").length < 3) {
        throw new Error("Invalid pathname");
    }
    const projectId = Number(pathname.split("/")[2]);

    useEffect(() => {
      loadAdoptionByProjectId(
        projectId,
        setTechCategoryTopics
      );
    }, [projectId]);

    return (
        <TechtopicDeleteEditorPresentational
          propjectId={projectId}
          techtopicCategorTopics={techCategoryTopics}
        />
    );
}

const loadAdoptionByProjectId = async (
  projectId: number,
  setTechCategoryTopics: (techCategoryTopics: TechCategoryAndTopicNames[]) => void
) => {
    const res = await getAdoptionsByProjectId(projectId);

    if (!res.ok) {
        console.log(res.error);
        throw new Error("Failed to fetch adoptions");
    }

    const adoptions = res.value;

    setTechCategoryTopics(
        transformTechtopicsToTechCategoryTopics_v2(adoptions).map(categoryTopic => {
            return {
                techCategoryName: categoryTopic.techCategoryName as string,
                techtopics: categoryTopic.techtopics.map(techtopic => {
                    return {
                        adoptionId: techtopic.adoptionId,
                        name: techtopic.name
                    }
                }),
            } as TechCategoryAndTopicNames
        }   
    ));
}

// プロジェクトに紐づく技術トピックをカテゴリごとに分類する
export function transformTechtopicsToTechCategoryTopics_v2 (techtopics: ResTechtopic[]): TechCategoryTopicWithAdoptionId[] {
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