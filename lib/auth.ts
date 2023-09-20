import { SignJWT, jwtVerify } from "jose";
import { prisma } from "./db";
export const createJWT = (user: {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	password: string;
	firstName: string | null;
	lastName: string | null;
}) => {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 60 * 60 * 24 * 7;
	return new SignJWT({
		payload: {
			id: user.id,
			email: user.email,
		},
	})
		.setProtectedHeader({ alg: "HS256", typ: "JWT" })
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validteJWT = async (jwt: any) => {
	const { payload } = await jwtVerify(
		jwt.value,
		new TextEncoder().encode(process.env.JWT_SECRET)
	);
	return payload.payload;
};
export const getUserFromCookies = async (cookies: any) => {
	const jwt = cookies.get(process.env.COOKIE_NAME as string);

	const { id } = await validteJWT(jwt);
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
	});
	return user;
};
