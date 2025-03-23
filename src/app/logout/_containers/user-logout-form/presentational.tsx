"use client"

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { postLogout } from "../../_actions/mutater";
import { Button } from "@/components/ui/button";
import { FormStatus } from "@/app/projects/[id]/edit/create/_utils/enum";

export function UserLogoutFormPresentational() {
    const router = useRouter();

    const [state, formAction] = useActionState(postLogout, {});

    useEffect(() => {
        if (state.status === FormStatus.SUCCESS) {
            router.back();
        }
    }, [router, state.status]);

    return (
        <div className="w-full flex flex-col space-y-3">
            <div className="text-2xl font-bold mb-4">ログアウト</div>
            <form action={formAction}>
                <div className="flex flex-row mt-4 justify-end space-x-3">
                    <Button
                        variant="secondary"
                        onClick={(event) => {
                            event.preventDefault();
                            router.back();
                        }}
                        className="w-[110px] hover:cursor-pointer"
                    >
                        <p className="font-bold">キャンセル</p>
                    </Button>
                    <Button
                        className="w-[110px] hover:cursor-pointer"
                        type="submit"
                    >
                        <p className="font-bold">ログアウト</p>
                    </Button>
                </div>
            </form>
        </div>
    )
}