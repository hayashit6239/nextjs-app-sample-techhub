import { corsHeaders } from "@/lib/cors";
import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { User } from "@/lib/server-types";
import { createSession } from "@/lib/session";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const user = await _fetchUser(body.username);

    if(!user) {
        return NextResponse.json(
            { message: "User not found" },
            {
                status: 404,
                headers: corsHeaders
            }
        );
    }

    const passwordMatch = await compare(body.password, user.password);

    if(!passwordMatch) {
        return NextResponse.json(
            { message: "Password doesn't match" },
            {
                status: 401,
                headers: corsHeaders
            }
        );
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    if(!secretKey) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }

    await createSession(user.id, user.name, user.username, secretKey);

    return NextResponse.json(
        user,
        {
            status: 200,
            headers: corsHeaders
        }
    );
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