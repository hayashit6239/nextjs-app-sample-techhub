import { ProjectTecjTopicEditPresentational } from "./presentational";

type Props = {
    projectId: number;
}

export async function ProjectTechtopicEditContainer(props: Props) {
    const { projectId } = props;
    return (
        <ProjectTecjTopicEditPresentational projectId={projectId} />
    )
}