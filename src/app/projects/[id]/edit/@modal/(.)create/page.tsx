"use client";

import ProjectAdoptionModal from "@/features/projects/components/project-adoption-modal";
import { TechtopicCreateEditor } from "../../create/_containers/techtopic-create-editor";

export default function TechtopicCreateEditorModal() {
    return (
        <ProjectAdoptionModal>
            <TechtopicCreateEditor />
        </ProjectAdoptionModal>
    );
}