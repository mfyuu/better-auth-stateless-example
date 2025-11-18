import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
	const cookies = getSessionCookie(request);
	const redirectTo = encodeURIComponent(
		request.nextUrl.pathname + request.nextUrl.search,
	);
	if (!cookies) {
		return NextResponse.redirect(
			new URL(`/sign-in?redirectTo=${redirectTo}`, request.url),
		);
	}
	return NextResponse.next();
};

export const config = {
	matcher: ["/middleware-example"], // Specify the routes the middleware applies to
};
