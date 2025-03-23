"use server"

import Link from "next/link";
import { Button } from "./ui/button";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

export async function LoginoutButton() {
    const cookie = (await cookies()).get("session")?.value;

    if (!cookie) {
        return <CustomButton userId={null} />
    }

    const session = await decrypt(cookie);
    if (!session) {
        return <CustomButton userId={null} />
    }

    const userId = Number(session?.sub);
    if (typeof userId !== "number") {
        return <CustomButton userId={null} />
    }

    return (
        <>
            {userId ? (
                <Link href="/logout">
                    <Button
                        className="hover:cursor-pointer bg-gray-400"
                    >
                        <p className="text-gray-800 font-bold text-lg">ログアウト</p>
                    </Button>
                </Link>
            ) : (
                <Link href="/login">
                    <Button
                        variant="secondary"
                        className="hover:cursor-pointer"
                    >
                        <p className="text-gray-800 font-bold text-lg">ログイン</p>
                    </Button>
                </Link>   
            )}
        </>
    )
}

type Props = {
    userId: number | null;
}

const CustomButton = (props: Props) => {
    const { userId } = props;
    return (
        <>
            {userId ? (
                <Link href="/logout">
                    <Button
                        className="hover:cursor-pointer bg-gray-400"
                    >
                        <p className="text-gray-800 font-bold text-lg">ログアウト</p>
                    </Button>
                </Link>
            ) : (
                <Link href="/login">
                    <Button
                        variant="secondary"
                        className="hover:cursor-pointer"
                    >
                        <p className="text-gray-800 font-bold text-lg">ログイン</p>
                    </Button>
                </Link>   
            )}
        </>
    )
}