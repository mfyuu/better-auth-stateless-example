import { type FC, Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import { SessionData } from "./session-data";

const ServerExample: FC = () => {
	return (
		<main className="container mx-auto grid grid-rows-[auto_1fr] flex-1 gap-4 py-4">
			<h1 className="text-base">This is Middleware Example</h1>
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
