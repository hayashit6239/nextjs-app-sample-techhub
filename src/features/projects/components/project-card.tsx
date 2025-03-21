import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from '@/lib/utils';
import Link from "next/link";

type ProjectCardProps = {
    name: string;
    description: string;
    department: string;
    projectId: number;
    techtopicCount: number;
    className?: string;
}

export function ProjectCard(props: ProjectCardProps) {
    const { name, description, department, techtopicCount, projectId, className } = props;
    return (
        <Card className={cn("w-[48%] h-[250px] hover:bg-card/90 transition-all duration-200 border-secondary hover:-translate-y-1", className)}>
            <CardHeader className="h-[80px]">
                <CardTitle className="text-xl">{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-5">
                <Badge className="h-7 px-10">{department}</Badge>
                {techtopicCount}個の技術を採用
            </CardContent>
            <CardFooter>
                <Link href={`/projects/${projectId}`}>
                    プロジェクトの詳細を見る
                </Link>
            </CardFooter>
        </Card>
    )
}