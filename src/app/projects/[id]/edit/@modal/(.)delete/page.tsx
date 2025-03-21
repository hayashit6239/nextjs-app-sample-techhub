"use client";

import ProjectAdoptionModal from "@/features/projects/components/project-adoption-modal";
import { TechtopicDeleteEditor } from "../../delete/_containers/techtopic-delete-editor";

export default function TechtopicDeleteEditorModal() {

    return (
      <ProjectAdoptionModal>
        <TechtopicDeleteEditor />
      </ProjectAdoptionModal>
    );
  }