"use client";

import { useEffect, useState } from "react";
import { TechCategoryAndTopicNames, TechtopicCreateEditorPresentational } from "./presentational";
import { removeDuplicateObjects, transformTechtopicsToTechCategoryTopics } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { getAdoptions } from "../../_utils/fetcher";


export function TechtopicCreateEditorContainer() {
    const [techCategoryTopics, setTechCategoryTopics] = useState<TechCategoryAndTopicNames[]>([]);

    const pathname = usePathname();
    if (pathname.split("/").length < 3) {
        throw new Error("Invalid pathname");
    }
    const projectId = Number(pathname.split("/")[2]);

    useEffect(() => {
        loadAdoptions(setTechCategoryTopics);
    }, []);

    return (
        <TechtopicCreateEditorPresentational
            projectId={projectId}
            techtopicCategorTopics={techCategoryTopics}
        />
    )
}

const loadAdoptions = async (
    setTechCategoryTopics: (techCategoryTopics: TechCategoryAndTopicNames[]) => void
) => {
    const res = await getAdoptions();

    if (!res.ok) {
        console.log(res.error);
        throw new Error("Failed to fetch product");
    }
    const adoptions = res.value;
    setTechCategoryTopics(
        transformTechtopicsToTechCategoryTopics(adoptions).map(categoryTopic => {
            return {
                techCategoryName: categoryTopic.techCategoryName as string,
                techtopics: removeDuplicateObjects(categoryTopic.techtopics.map(techtopic => {
                    const techtopicId = adoptions.find(x => x.name === techtopic.name)
                    if (techtopicId === undefined) {
                        return
                    }
                    return {
                        id: techtopicId.id,
                        name: techtopic.name
                    }
                }).filter(x => x !== undefined)),
            } as TechCategoryAndTopicNames
        }   
    ));
}
