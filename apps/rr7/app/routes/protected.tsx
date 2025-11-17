import type { FC } from "react";
import { Navigate, redirect } from "react-router";
import { ScrollArea } from "~/components/ui/scroll-area";
import { auth } from "~/lib/auth";
import { useSession } from "~/lib/auth-client";
import type { Route } from "./+types/protected";

export const meta = (_: Route.MetaArgs) => {
	return [
		{ title: "Better Auth Example | Protected Page" },
		{ name: "description", content: "React Router v7 + Better Auth" },
	];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
	const session = await auth.api.getSession({
		headers: request.headers,
	});
	if (!session) {
		throw redirect("/sign-in");
	}
	return { session };
};

const Protected: FC<Route.ComponentProps> = () => {
	const { data: session, isPending } = useSession();
	if (!isPending && !session) {
		return <Navigate to="/sign-in" />;
	}

	return (
		<main className="container mx-auto grid grid-rows-[auto_1fr] flex-1 gap-4 py-4">
			<h1 className="text-base">This is Protected Page</h1>
			{isPending ? (
				<div className="flex items-center justify-center">
					<p className="text-lg text-muted-foreground">読み込み中...</p>
				</div>
			) : (
				<div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-md">
					<div className="bg-gray-200 px-6 py-4">
						<h2 className="text-xl font-bold">Current Session</h2>
					</div>
					<ScrollArea className="bg-muted p-6">
						<pre className="text-sm">{JSON.stringify(session, null, 2)}</pre>
					</ScrollArea>
				</div>
			)}
		</main>
	);
};

export default Protected;
