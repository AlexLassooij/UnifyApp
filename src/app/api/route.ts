import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const userId = request.body!.id;

    return NextResponse.json({ message: `Returned to user ${userId}!` }, { status: 201 });
}