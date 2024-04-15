import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
	req: NextRequest,
	event: NextFetchEvent
) {
	const token = await getToken({ req });
	const isAuthenticated = !!token;

	if (req.nextUrl.pathname.startsWith("/auth") && isAuthenticated) {
		return NextResponse.redirect(new URL("/chat", req.url));
	}

	if (req.nextUrl.pathname.startsWith("/admin") && isAuthenticated) {
		if (token?.role !== "Admin") {
			return NextResponse.redirect(new URL("/chat", req.url));
		}
	}

	const authMiddleware = await withAuth({
		pages: {
			signIn: `/auth`,
		},
	});

	// @ts-expect-error
	return authMiddleware(req, event);
}

export const config = {
	matcher: ["/chat", "/auth", "/admin", "/chat/:pathname*"],
};
