import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
	const sessionCookie = getSessionCookie(request);
	if (!sessionCookie) {
		return NextResponse.redirect(
			new URL(`/sign-in?callback=${request.url}`, request.url),
		);
	}
	return NextResponse.next();
};

export const config = {
	matcher: ["/middleware-example"], // Specify the routes the middleware applies to
};
