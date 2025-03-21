import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ProjectTechTopicEdit } from "../project-techtopic-edit";

type Techtopic = {
    name: string;
    version: string;
    purpose: string;
}

export type TechCategoryTopic = {
    techCategoryName: string;
    techtopics: Techtopic[];
}

export type ProjectWithTechCategoryTopics = {
    id: number;
    name: string;
    description: string;
    representativeName: string;
    representativeEmail: string;
    departmentName: string;
    techCategoryTopics: TechCategoryTopic[];
}

type Props = {
    project: ProjectWithTechCategoryTopics;
    children: React.ReactNode;
}

export async function ProjectDetailPresentational(props: Props) {
    const { project, children } = props;

    return (
        <div className="h-screen pt-20 pb-12">
            <div id="project-adoption-modal" />
            <Link href={`/projects/${project.id}`}>
                <div className="my-2">&lt;&lt; プロジェクト詳細に戻る</div>
            </Link>
            <div className="flex flex-row gap-x-4 px-4 h-full">
                <div className="w-[45%] space-y-12 justify-center">
                    <div className="space-y-6 pt-12">
                        <div className="text-5xl font-bold">{project.name}</div>
                        <Badge className="h-7 px-10">{project.departmentName}</Badge>
                        <div className="text-gray-700">{project.description}</div>
                    </div>
                    <div className="space-y-4">
                        <div className="text-3xl font-bold">連絡先の代表者情報</div>
                        <div>
                            <div>名前: {project.representativeName}</div>
                            <div>メールアドレス: {project.representativeEmail}</div>
                        </div>
                    </div>
                    <ProjectTechTopicEdit projectId={project.id} />
                </div>
                <div className="flex flex-col space-y-4 h-full w-full">
                    <div className="text-3xl font-bold">採用している技術スタック</div>
                    {children}
                </div>
            </div>
        </div>
    )
}