import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type FC, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { auth } from "@/lib/auth";
import { SessionData } from "./session-data";

const ServerExample: FC = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/login");
	}
	let githubToken = null;
	try {
		const tokenResponse = await auth.api.getAccessToken({
			body: {
				// providerId: "cognito",
				providerId: "github",
			},
			headers: await headers(),
		});
		githubToken = tokenResponse;
	} catch (error) {
		console.error("Failed to get GitHub token:", error);
	}

	return (
		<main className="container mx-auto grid grid-rows-[auto_1fr] flex-1 gap-4 py-4">
			<h1 className="text-base">This is Server Component Example</h1>
			token: {githubToken?.accessToken}
			<Suspense
				fallback={
					<div className="grid place-content-center">
						<Spinner />
					</div>
				}
			>
				<SessionData />
			</Suspense>
		</main>
	);
};

export default ServerExample;
