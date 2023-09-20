import { createJWT } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
	const data = await request.json();
	const { email, password, firstName, lastName } = data;
	const user = await prisma.user.create({
		data: {
			email,
			password,
			firstName,
			lastName,
		},
	});
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
		{ message: "user registered successfully" },
		{
			headers: {
				"Set-Cookie": cookie.toString(),
			},
		}
	);
}
