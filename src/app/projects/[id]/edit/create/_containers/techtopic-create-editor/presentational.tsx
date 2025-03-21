"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { postAdoption } from "../../_actions/mutater";
import { FormStatus } from "../../_utils/enum";

export type TechCategoryAndTopicNames = {
    techCategoryName: string;
    techtopics: {
        id: number;
        name: string;
    }[];
}

type Props = {
    projectId: number;
    techtopicCategorTopics: TechCategoryAndTopicNames[];
}

export function TechtopicCreateEditorPresentational(props: Props) {
    const { projectId, techtopicCategorTopics } = props;

    const [state, formAction] = useActionState(
        postAdoption,
        {
            projectId: projectId,
            techtopicId: 0,
            version: "",
            purpose: "",
        }
    );

    const [selectedTechCategory, setSelectedTechCategory] = useState<string>("init"); 
    const router = useRouter();

    const filteredTechTopics = useMemo(() => {
        return selectedTechCategory === "init" ? (
            <option>--- 技術名 ---</option>
        ) : (
            [
                <option key="init">--- 技術名 ---</option>,
                ...techtopicCategorTopics
                    .filter((techCategoryTopic) => techCategoryTopic.techCategoryName === selectedTechCategory)[0]
                    .techtopics.map((techtopic) => {
                        return <option key={techtopic.id} value={techtopic.id}>{techtopic.name}</option>
                    })
            ]
        )
    }, [selectedTechCategory, techtopicCategorTopics]);

    useEffect(() => {
        if (state.status === FormStatus.SUCCESS) {
            router.back();
            // redirect(`/projects/${projectId}/edit`);
        }
    }, [router, state.status]);

    return (
        <div className="w-full flex flex-col space-y-2">
            <div className="text-2xl font-bold mb-4">採用技術を追加する</div>
            <form action={formAction}>
                <input type="hidden" name="projectId" value={projectId} />
                <div className="space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="category" className="text-md font-bold">技術カテゴリ</Label>
                        <select
                            className="w-full border border-gray-300 rounded-sm h-9 px-3 text-gray-500 text-xs"
                            onChange={(event) => {
                                setSelectedTechCategory(event.target.value);
                            }}
                        >
                            <option key="init" value="init" >--- 技術カテゴリ ---</option>
                            {techtopicCategorTopics.map((categoryTopic) => {
                                return (
                                    <option key={categoryTopic.techCategoryName} value={categoryTopic.techCategoryName}>{categoryTopic.techCategoryName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="category" className="text-md font-bold">技術名</Label>
                        <select
                            name="techtopicId"
                            className="w-full border border-gray-300 rounded-sm h-9 px-3 text-gray-500 text-xs"
                        >
                            {selectedTechCategory === "init" ? <option>--- 技術名 ---</option> : filteredTechTopics}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="category" className="text-md font-bold">バージョン</Label>
                        <Input
                            name="version"
                            className="bg-white rounded-sm"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="category" className="text-md font-bold">採用目的</Label>
                        <Textarea
                            name="purpose"
                            className="bg-white  rounded-sm" 
                        />
                    </div>
                </div>
                <div className="flex flex-row mt-4 justify-end space-x-3">
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
                        className="w-[110px] hover:cursor-pointer"
                        type="submit"
                    >
                        <p className="font-bold">追加</p>
                    </Button>
                </div>
            </form>
        </div>
    )
}


// export type AdoptionFormType = z.infer<typeof AdoptionFormSchema>;

// const handleCreateAdoption = async (values: AdoptionFormType, projectId: number) => {
//     const res = await fetch(`${process.env.ROUTE_HANDLERS_BASE_URL}/adoptions`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             projectId: projectId,
//             techtopicId: values.techtopicId,
//             version: values.version,
//             purpose: values.purpose,
//         }),
//     });

//     if (!res.ok) {
//         const error = await res.json();
//         console.log(error);
//         throw new Error(error.error || `Failed to fetch product (status: ${res.status})`);
//     }

//     // const adoption = await res.json();

//     redirect(`/projects/${projectId}/edit`);
// }
