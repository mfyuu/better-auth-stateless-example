import Image from "next/image";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import GoogleSI from "@/public/web_neutral_sq_SI.svg";

const SignInPage: FC<PageProps<"/sign-in">> = async ({ searchParams }) => {
	const query = await searchParams;
	const redirectTo = Array.isArray(query.redirectTo)
		? query.redirectTo[0]
		: query.redirectTo;

	const signIn = async () => {
		"use server";
		const res = await auth.api.signInSocial({
			body: {
				provider: "cognito",
				callbackURL: redirectTo,
			},
		});
		return redirect(res.url ?? "/");
	};

	return (
		<main className="container flex-1 mx-auto py-4 space-y-4">
			<h1 className="text-base">This is Sign In Page</h1>
			<form action={signIn}>
				<Button
					type="submit"
					className="px-0 hover:shadow-sm"
					size="lg"
					variant="ghost"
				>
					<Image src={GoogleSI} alt="Google" />
				</Button>
			</form>
		</main>
	);
};

export default SignInPage;
