import { Badge } from "@/components/ui/badge";

type TechtopicRowProps = {
    name: string;
    version: string;
    purpose: string;
}

export function TechtopicRow(props: TechtopicRowProps) {
    const { name, version, purpose } = props;
    return (
        <div className="flex space-x-4 items-center">
            <Badge className="flex h-10 px-5 gap-2">
                <div className="text-md font-bold">{name}</div>
                <div className="text-md text-gray-400">{version}</div>
            </Badge>
            <p>{purpose}</p>
        </div>
    )
}