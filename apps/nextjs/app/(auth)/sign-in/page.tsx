import { redirect } from "next/navigation";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

const SignInPage: FC<PageProps<"/sign-in">> = async ({ searchParams }) => {
	const query = await searchParams;
	const callbackURL = Array.isArray(query.callback)
		? query.callback[0]
		: query.callback;

	const signIn = async () => {
		"use server";
		const res = await auth.api.signInSocial({
			body: {
				provider: "google",
				callbackURL: callbackURL,
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
					<img src="/web_neutral_sq_SI.svg" alt="Google" />
				</Button>
			</form>
		</main>
	);
};

export default SignInPage;
