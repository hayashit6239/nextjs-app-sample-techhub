"use client"

import { Button } from "@/components/ui/button";
import { Modal } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

type Props = {
  projectId: number;
}

export function  ProjectTecjTopicEditPresentational(props: Props) {
    const { projectId } = props;

    const [open, setOpen] = useState(false);

    return (
        <div className="w-full space-y-4">
            <div className="text-3xl font-bold">編集モード</div>
            <div className="flex flex-col justify-end space-y-3">
                <Button
                    variant="secondary"
                    className="hover:cursor-auto"
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                >
                    <Link href={`/projects/${projectId}/edit/create`}>
                      <p className="text-gray-800 text-sm">採用技術の追加モーダルを開く</p>
                    </Link>
                </Button>
                <Button
                    variant="secondary"
                    className="hover:cursor-auto w-full"
                    onClick={(event) => {
                        event.preventDefault();
                    }}
                >
                    <Link href={`/projects/${projectId}/edit/delete`}>
                      <p className="text-gray-800 text-sm">採用技術の削除モーダルを開く</p>
                    </Link>
                </Button>
                <Button
                    variant="secondary"
                    className="hover:cursor-auto w-full"
                    onClick={(event) => {
                        event.preventDefault();
                        setOpen(true);
                    }}
                >
                    <p className="text-gray-800 text-sm">バグるボタン</p>
                </Button>
            </div>
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
            >
                なぜかバグる
            </Modal>
        </div>
    )
}
