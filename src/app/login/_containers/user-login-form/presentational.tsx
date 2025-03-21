"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import { z } from "zod";

export function UserLoginFormPresentational() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<{
        username: string | undefined;
        password: string | undefined;
    }>({ username: undefined, password: undefined });
    const form = useFormik<LoginFormSchemaType>({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values) => {
            const res = await handleLoginUser(values, setErrorMessage);
            if (res) {
                router.back();
            }
        }
    })
    return (
        <div className="w-full flex flex-col space-y-3">
            <div className="text-2xl font-bold mb-4">ログイン</div>
            <form onSubmit={form.handleSubmit}>
                <div className="flex flex-col space-y-5">
                    <div className="space-y-2">
                        <label htmlFor="username">ユーザー名</label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={form.values.username}
                            onChange={form.handleChange}
                        />
                        {errorMessage.username && <p className="text-red-600 text-xs">{errorMessage.username}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="username">パスワード</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={form.values.password}
                            onChange={form.handleChange}
                        />
                        {errorMessage.password && <p className="text-red-600 text-xs">{errorMessage.password}</p>}
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

export const LoginFormSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .trim(),
        password: z
            .string()
            .min(2, { message: 'Name must be at least 2 characters long.' })
            .trim(),
    })

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

const handleLoginUser = async (values: LoginFormSchemaType, setErrorMessage: Dispatch<SetStateAction<{
    username: string | undefined;
    password: string | undefined;
}>>): Promise<boolean> => {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        username: values.username,
        password: values.password,
    })
 
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        setErrorMessage({
            username: validatedFields.error.flatten().fieldErrors.username?.[0],
            password: validatedFields.error.flatten().fieldErrors.password?.[0],
        });
        return false;
    }

    const res = await fetch(`${process.env.ROUTE_HANDLERS_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: values.username,
            password: values.password,
        }),
    });

    if (!res.ok) {
        const error = await res.json();
        console.log(error);
        if (res.status === 401) {
            setErrorMessage({
                username: undefined,
                password: "Invalid username or password",
            });
            return false;
        }

        if (res.status === 404) {
            setErrorMessage({
                username: "User not found",
                password: undefined,
            });
            return false;
        }
    }

    setErrorMessage({
        username: undefined,
        password: undefined,
    });

    return true;
}