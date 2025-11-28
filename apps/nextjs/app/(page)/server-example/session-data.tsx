import { headers } from "next/headers";
import type { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@/lib/auth";

export const SessionData: FC = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const { idToken } = await auth.api.getAccessToken({
		body: {
			providerId: "cognito",
		},
		headers: await headers(),
	});

	const res = idToken
		? await fetch(
				"https://cu8u38ku8d.execute-api.ap-northeast-1.amazonaws.com/dev/",
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
					cache: "no-store",
				},
			)
		: undefined;

	const data = res ? await res.json() : null;

	return (
		<div className="grid grid-rows-[auto_1fr] overflow-hidden rounded-md">
			<div className="bg-gray-200 px-6 py-4">
				<h2 className="text-xl font-bold">Current Session</h2>
			</div>
			<ScrollArea className="bg-muted p-6">
				<pre className="text-sm">{JSON.stringify(session, null, 2)}</pre>
				<pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
			</ScrollArea>
		</div>
	);
};
