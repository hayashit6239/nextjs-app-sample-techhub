"use client";

import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/features/projects/components/project-card";
import { useState } from "react";

export type Project = {
    id: number;
    name: string;
    description: string;
    representativeName: string;
    representativeEmail: string;
    departmentName: string;
    techtopicCount: number;
}

type Props = {
    projects: Project[];
}

export function ProjectListPresentational(props: Props) {
    const { projects } = props;
    const [searchText, setSearchText] = useState("");

    const filteredData = projects.filter(x => x.name.includes(searchText));

    return (
        <div className="h-screen space-y-4 pt-24 pb-12">
            <Input
                className="w-3/5 bg-white h-10"
                placeholder="プロジェクト名や技術トピックを入力してください"
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
            />
            <div className="flex flex-wrap place-content-between space-y-3">
                {filteredData.length !== 0 ? (
                    filteredData.map(x => {
                        return (
                            <ProjectCard
                                key={x.id}
                                name={x.name}
                                description={x.description}
                                department={x.departmentName}
                                techtopicCount={x.techtopicCount}
                                projectId={x.id}
                                className=""
                            />
                        )
                    })
                ) : (
                    <p>該当するプロジェクトがありません</p>
                )}
            </div>
        </div>
    )
}