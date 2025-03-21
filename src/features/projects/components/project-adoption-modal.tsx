import { BaseModal } from "@/components/modal";

type Props = {
    children: React.ReactNode;
}

export default function ProjectAdoptionModal(props: Props) {
    const { children } = props;

    return (
        <BaseModal elementName="project-adoption-modal">
            {children}
        </BaseModal>
      );
}