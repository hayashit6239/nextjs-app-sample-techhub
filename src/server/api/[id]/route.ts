import { corsHeaders } from "@/lib/cors";
import { prisma } from "@/lib/prisma";
import { ResUser } from "@/lib/server-response-types";
import { User } from "@/lib/server-types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const userId = Number(id);
    if (typeof userId !== "number") {
        return NextResponse.json( {message: "UserId is not Number"}, { status: 500 });;
    }

    const user = await _fetchUser(userId);
    if (user === null) {
        return NextResponse.json( {message: "User not found"}, { status: 404 });
    }

    const projectIds = await _fetchAffiliationsByUserId(userId);

    return NextResponse.json(
        {
            id: user.id,
            name: user.name,
            projectIds,
        } as ResUser,
        {
            status: 200,
            headers: corsHeaders
        }
    )
}

async function _fetchUser(userId: number): Promise<User | null> {
    return await prisma
        .user
        .findUnique(
            {
                where: {
                    id: userId,
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
                password: user.password,
            }
        })
}

async function _fetchAffiliationsByUserId(userId: number): Promise<number[]> {
    return await prisma
        .affiliation
        .findMany(
            {
                where: {
                    userId,
                },
                include: {
                    project: true,
                }
            }
        )
        .then((affiliations) => {
            return affiliations.map((affiliation) => {
                return affiliation.projectId
        })
    })
}