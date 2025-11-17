import type { FC } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useSession } from "~/lib/auth-client";
import type { Route } from "./+types/home";

export const meta = (_: Route.MetaArgs) => {
	return [
		{ title: "Better Auth Example | Home Page" },
		{ name: "description", content: "React Router v7 + Better Auth" },
	];
};

const Home: FC<Route.ComponentProps> = () => {
	const { data: session } = useSession();

	return (
		<main className="container mx-auto grid grid-rows-[auto_1fr] flex-1 gap-4 py-4">
			<h1 className="text-base">This is Non Protected Page</h1>

			<div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-md">
				<div className="bg-gray-200 px-6 py-4">
					<h2 className="text-xl font-bold">Current Session</h2>
				</div>
				<ScrollArea className="bg-muted p-6">
					<pre className="text-sm">{JSON.stringify(session, null, 2)}</pre>
				</ScrollArea>
			</div>
		</main>
	);
};

export default Home;
