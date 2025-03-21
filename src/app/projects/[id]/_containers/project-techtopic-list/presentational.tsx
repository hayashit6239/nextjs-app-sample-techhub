import { TechtopicCard } from "@/features/techtopics/components/techtopic-card"

type Techtopic = {
    name: string;
    version: string;
    purpose: string;
}

export type TechCategoryTopic = {
    techCategoryName: string;
    techtopics: Techtopic[];
}

type TechCategoryTopicsProps = {
    techCategoryTopics: TechCategoryTopic[];
}

export async function ProjectTechtopicListPresentational(props: TechCategoryTopicsProps) {
    const { techCategoryTopics } = props;
    return (
        <div className="flex flex-col space-y-2 h-[85%] overflow-auto px-4">
            {techCategoryTopics.length > 0 ? (
                techCategoryTopics.map((techtopic, index) => {
                    return (
                        <TechtopicCard
                            key={index}
                            techtopicCategoryName={techtopic.techCategoryName}
                            techtopics={
                                techtopic.techtopics.map((x) => {
                                    return {
                                        name: x.name,
                                        version: x.version,
                                        purpose: x.purpose
                                    }
                                })
                            }
                        />
                    )
                })
            ) : (
                <>採用している技術情報はありません</>
            )}
        </div>
    )
}