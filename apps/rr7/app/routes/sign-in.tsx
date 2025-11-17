import type { FC } from "react";
import { Button } from "~/components/ui/button";
import { signIn } from "~/lib/auth-client";
import type { Route } from "./+types/home";

export const meta = (_: Route.MetaArgs) => {
	return [
		{ title: "Better Auth Example | Sign In Page" },
		{ name: "description", content: "React Router v7 + Better Auth" },
	];
};

const SignInPage: FC<Route.ComponentProps> = () => {
	return (
		<main className="container flex-1 mx-auto py-4 space-y-4">
			<h1 className="text-base">This is Sign In Page</h1>
			<Button
				className="px-0 hover:shadow-sm"
				size="lg"
				variant="ghost"
				onClick={async () => {
					await signIn.social({
						provider: "google",
						callbackURL: "/protected",
					});
				}}
			>
				<img src="/web_neutral_sq_SI.svg" alt="Google" />
			</Button>
		</main>
	);
};

export default SignInPage;
