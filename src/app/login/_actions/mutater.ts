"use server"

import { FormStatus } from "@/app/projects/[id]/edit/create/_utils/enum";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { z } from "zod";

type PostLoinForm = {
    status?: string;
    username: string;
    password: string;
}

type ZodErrors = {
    username?: string[];
    password?: string[];
}

type PostLoinFormState = PostLoinForm & {
    zodErrors?: ZodErrors;
}

const PostLoinFormSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export async function postLogin(prevState: PostLoinFormState, formData: FormData): Promise<PostLoinFormState> {
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const validatedFormData = PostLoinFormSchema.safeParse({
        username,
        password,
    });

    if (!validatedFormData.success) {
        return {
            status: FormStatus.FAILED,
            username,
            password,
            zodErrors: validatedFormData.error.flatten().fieldErrors as ZodErrors,
        }
    }

    const user = await _fetchUser(validatedFormData.data.username);

    if (!user) {
        return {
            status: FormStatus.FAILED,
            username,
            password,
            zodErrors: {
                username: ["User not found"]
            }
        }
    }

    const passwordMatch = await compare(validatedFormData.data.password, user.password);

    if (!passwordMatch) {
        return {
            status: FormStatus.FAILED,
            username,
            password,
            zodErrors: {
                password: ["Password doesn't match"]
            }
        }
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if(!secretKey) {
        return {
            status: FormStatus.FAILED,
            username,
            password,
            zodErrors: {
                password: ["Internal Server Error"]
            }
        }
    }

    await createSession(user.id, user.name, user.username, secretKey);

    return {
        status: FormStatus.SUCCESS,
        username,
        password,
    }
}

async function _fetchUser(username: string): Promise<User | null> {
    return await prisma
        .user
        .findFirst(
            {
                where: {
                    username: username,
                }
            }
        )
        .then((user) => {

            if(user === null) {
                return null;
            }

            return {
                id: user.id,
                name: user.name,
                username: user.username,
                password: user.password
            }
        });
}
