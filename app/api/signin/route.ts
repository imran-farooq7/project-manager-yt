import { createJWT } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
	const data = await request.json();
	const { email, password } = data;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return NextResponse.json({ error: "invalid user" });
	}
	const isUser = password === user.password;
	if (isUser) {
		const jwt = await createJWT(user);
		const response = NextResponse.next();
		const cookie = response.cookies.set({
			name: process.env.COOKIE_NAME as string,
			value: jwt,
			httpOnly: true,
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});
		return NextResponse.json(
			{ message: "signed in successfully" },
			{
				status: 201,
				headers: {
					"Set-Cookie": cookie.toString(),
				},
			}
		);
	} else {
		return NextResponse.json(
			{ error: "invalid login" },
			{
				status: 401,
			}
		);
	}
}
