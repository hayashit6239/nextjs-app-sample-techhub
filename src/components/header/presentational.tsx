"use server";

import { Suspense } from "react";
import { LoginoutButton } from "../loginout-button";
import Link from "next/link";

export async function HeaderPresentational() {

    return (
        <header className="fixed top-0 left-0 right-0 bg-foreground z-50 h-16 flex items-center px-10 md:px-30 place-content-between">
            <Link href="/projects" className="hover:cursor-pointer">
                <p className="text-[30px] font-bold text-white">Tech Hub</p>
            </Link>
            <div className="flex flex-row justify-end space-x-2">
                <Suspense>
                    <LoginoutButton />
                </Suspense>
            </div>
        </header>
    );
}
