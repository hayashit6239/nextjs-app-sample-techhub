"use client"

import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea";
// import { Modal, Select } from '@mantine/core';
import Link from "next/link";
// import { useState } from "react";

type Props = {
  projectId: number;
}

export function  ProjectTecjTopicEditPresentational(props: Props) {
    const { projectId } = props;

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
                    }}
                >
                    <p className="text-gray-800 text-sm">バグるボタン</p>
                </Button>
            </div>
        </div>
    )
}
