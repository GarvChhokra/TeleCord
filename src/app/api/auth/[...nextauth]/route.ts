import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { GetUserAPI, LoginAPI } from "@/api/authentication";

const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(
				credentials: Record<"email" | "password", string> | undefined
			) {
				const user: any = await LoginAPI(
					credentials?.email ?? "",
					credentials?.password ?? ""
				);
				if (!user) {
					throw new Error("Invalid Email or Password");
				}
				return {
					email: user.Email,
				} as any;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session, token }: { session: any; token: any }) {
			if (!session?.user?.email) {
				return session;
			}
			const sessionUser: any = await GetUserAPI(session?.user?.email);
			const filteredSessionUser = Object.keys(sessionUser).reduce(
				(acc, key) => {
					if (key !== "Password") {
						acc[key] = sessionUser[key];
					}
					return acc;
				},
				{} as any
			);

			// add role to token
			token.role = sessionUser.Role;

			session.user = { ...session?.user, ...filteredSessionUser };

			return session;
		},
	},
};

const handler: any = NextAuth(authOptions);
export { handler as GET, handler as POST };
