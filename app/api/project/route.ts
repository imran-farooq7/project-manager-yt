import { validteJWT } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
	const jwt = req.cookies.get(process.env.COOKIE_NAME as string);
	// console.log(req.nextUrl.pathname, "pathname from project");
	// const cook = cookies();
	// const jwt = cook.get("Imran_user");

	const data = await req.json();
	const name = data;

	const user = await validteJWT(jwt);
	const project = await prisma.project.create({
		data: {
			ownerId: user.id,
			name,
		},
	});
	return NextResponse.json({
		message: "project created successfully",
	});
}
