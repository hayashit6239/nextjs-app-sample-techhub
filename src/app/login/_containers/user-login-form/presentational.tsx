"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { postLogin } from "../../_actions/mutater";
import { FormStatus } from "@/app/projects/[id]/edit/create/_utils/enum";

export function UserLoginFormPresentational() {
    const router = useRouter();

    const [state, formAction] = useActionState(postLogin, {
        username: "",
        password: "",
    });

    useEffect(() => {
        if (state.status === FormStatus.SUCCESS) {
            router.back();
        }
    }, [router, state.status]);

    return (
        <div className="w-full flex flex-col space-y-3">
            <div className="text-2xl font-bold mb-4">ログイン</div>
            <form action={formAction}>
                <div className="flex flex-col space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="username">ユーザー名</label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                        />
                        {state.zodErrors?.username && <p className="text-red-600 text-xs">{state.zodErrors?.username}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="username">パスワード</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                        />
                        {state.zodErrors?.password && <p className="text-red-600 text-xs">{state.zodErrors?.password}</p>}
                    </div>
                </div>
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
                        <p className="font-bold">ログイン</p>
                    </Button>
                </div>
            </form>
        </div>
    )
}
