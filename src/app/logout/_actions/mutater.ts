"use server"

import { FormStatus } from "@/app/projects/[id]/edit/create/_utils/enum";
import { cookies } from "next/headers";

type PostLogoutForm = {
    status?: string;
}

type PostLogoutFormState = PostLogoutForm;

export async function postLogout(prevState: PostLogoutFormState): Promise<PostLogoutFormState> {
    console.log(prevState);
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return { 
        status: FormStatus.SUCCESS
    };
}