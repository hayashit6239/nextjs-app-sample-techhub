import { corsHeaders } from "@/lib/cors";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log(request);
    const cookieStore = await cookies();
    cookieStore.delete("session");

    return NextResponse.json(
        { message: "Logout success" },
        {
            status: 200,
            headers: corsHeaders
        }
    );
}