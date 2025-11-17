import { type FC, Suspense } from "react";
import { SessionData } from "./session-data";

const ServerExample: FC = () => {
	return (
		<main className="container mx-auto grid grid-rows-[auto_1fr] flex-1 gap-4 py-4">
			<h1 className="text-base">This is Middleware Example</h1>
			<Suspense
				fallback={
					<div className="flex items-center justify-center">
						<p className="text-lg text-muted-foreground">読み込み中...</p>
					</div>
				}
			>
				<SessionData />
			</Suspense>
		</main>
	);
};

export default ServerExample;
