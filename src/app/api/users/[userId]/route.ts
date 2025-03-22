import { NextResponse } from "next/server";

export async function POST(request: Request, context: { params: { id: string } }) {
    const { params } = context;
    const userId = params.id;

    return NextResponse.json(
        { message: `Posted to user ${userId}!` }, 
        { status: 201 }
    );
}