"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { deleteAdoptions } from "../../_utils/fetcher";

type TechtopicWithAdoptionId = {
    name: string;
    version: string;
    purpose: string;
    adoptionId: number;
}

export type TechCategoryTopicWithAdoptionId = {
    techCategoryName: string;
    techtopics: TechtopicWithAdoptionId[];
}

export type TechCategoryAndTopicNames = {
    techCategoryName: string;
    techtopics: {
        adoptionId: number;
        name: string;
    }[];
}

type Props = {
    propjectId: number;
    techtopicCategorTopics: TechCategoryAndTopicNames[];
}

export function TechtopicDeleteEditorPresentational(props: Props) {
    const { propjectId, techtopicCategorTopics } = props;

    const [checkedTechtopics, setCheckedTechtopics] = useState<number[]>([]);
    const router = useRouter();

    return (
        <div className="w-full flex flex-col space-y-2">
            <div className="text-2xl font-bold mb-4">採用技術を削除する</div>
            {techtopicCategorTopics.map((categoryTopic) => {
                return (
                    <div key={categoryTopic.techCategoryName}>
                        <div className="text-lg font-bold">{categoryTopic.techCategoryName}</div>
                        <div className="flex flex-row space-x-4">
                            {categoryTopic.techtopics.map((techtopic) => {
                                return (
                                    <div key={techtopic.adoptionId} className="flex flex-row items-center space-x-2">
                                        <Checkbox
                                            value={techtopic.adoptionId}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    setCheckedTechtopics([...checkedTechtopics, techtopic.adoptionId]);
                                                } else {
                                                    setCheckedTechtopics(checkedTechtopics.filter((x) => x !== techtopic.adoptionId));
                                                }
                                            }}
                                        />
                                        <div>{techtopic.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            <div className="flex flex-row py-8 justify-end space-x-3 mt-auto">
                <Button
                    variant="secondary"
                    onClick={(event) => {
                        event.preventDefault();
                        router.back();
                    }}
                    className="w-[110px] hover:cursor-pointer"
                >
                    <p className="font-bold">キャンセル</p>
                </Button>
                <Button
                    className="w-[110px] hover:cursor-pointer hover:bg-red-500"
                    type="submit"
                    disabled={checkedTechtopics.length === 0}
                    onClick={(event) => {
                        event.preventDefault();
                        handleDeleteAdoptions(checkedTechtopics, propjectId);
                        router.back();
                    }}
                >
                    <p className="font-bold">削除</p>
                </Button>
            </div>
        </div>
    )
}

const handleDeleteAdoptions = async (adoptionIds: number[], projectId: number) => {
    const res = await deleteAdoptions(adoptionIds);

    if (!res.ok) {
        console.log(res.error);
        throw new Error("Failed to delete adoptions");
    }

    redirect(`/projects/${projectId}/edit`);
}