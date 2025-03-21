import { corsHeaders } from "@/lib/cors";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const adoptionId = Number(id);
    if (typeof adoptionId !== "number") {
        return NextResponse.json({ message: "AdoptionId is not Number" }, { status: 500 });
    }
    
    const deletedAdoption = await prisma.adoption.delete({
        where: {
            id: adoptionId
        }
    });
    return NextResponse.json(
        deletedAdoption,
        {
            status: 200,
            headers: corsHeaders
        }
    );
}