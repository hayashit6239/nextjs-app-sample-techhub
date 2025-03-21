import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TechtopicRow } from "./techtopic-row";

type Techtopic = {
    name: string;
    version: string;
    purpose: string;
}

type TechtopicCardProps = {
    techtopicCategoryName: string;
    techtopics: Techtopic[];
}

export function TechtopicCard(props: TechtopicCardProps) {
    const { techtopicCategoryName, techtopics } = props;

    if (techtopics === undefined) {
        return;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{techtopicCategoryName}</CardTitle>
                <CardDescription>{techtopics.length}個の技術</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                {techtopics !== undefined && techtopics.map((x, i) => {
                    return (
                        <TechtopicRow key={i} name={x.name} version={x.version} purpose={x.purpose} />
                    )
                })}
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}
