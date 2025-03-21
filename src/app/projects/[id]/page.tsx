import { Suspense } from "react";
import { ProjectDetail } from "./_containers/project-detail";
import { ProjectTechtopicList } from "./_containers/project-techtopic-list";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProjectDetailPage({ params }: Props) {
    const { id } = await params;

    const projectId = Number(id);

    if (typeof projectId !== "number") {
        return;
    }

    return (
        <div className="">
            <ProjectDetail projectId={projectId} >
                <Suspense fallback={
                    <div className="flex h-full items-center justify-center font-bold text-xl">
                        Loading Now ...
                    </div>
                }>
                    <ProjectTechtopicList projectId={projectId} />
                </Suspense>
            </ProjectDetail>
        </div>
    )
}
