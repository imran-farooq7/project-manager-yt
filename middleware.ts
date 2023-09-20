import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
const PUBLIC_FILE = /\.(.*)$/;

// we are using jwtverify because middleware runs on the edge runtime
export const validteJWT = async (jwt: string) => {
	const { payload } = await jwtVerify(
		jwt,
		new TextEncoder().encode(process.env.JWT_SECRET)
	);
	return payload.payload;
};

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.startsWith("/static") ||
		pathname.startsWith("/signin") ||
		pathname.startsWith("/register") ||
		PUBLIC_FILE.test(pathname)
	) {
		return NextResponse.next();
	}
	const jwt = req.cookies.get(process.env.COOKIE_NAME as string);

	if (req.nextUrl.pathname === "/" && !jwt) {
		req.nextUrl.pathname = "/signin";
		return NextResponse.redirect(req.nextUrl);
	}
	if (req.nextUrl.pathname === "/" && jwt) {
		req.nextUrl.pathname = "/home";
		return NextResponse.redirect(req.nextUrl);
	}

	try {
		await validteJWT(jwt?.value);
		return NextResponse.next();
	} catch (err) {
		console.error(err);
		req.nextUrl.pathname = "/signin";
		return NextResponse.redirect(req.nextUrl);
	}
}
