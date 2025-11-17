"use client";

import { LogOut, User } from "lucide-react";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { signIn, signOut, useSession } from "@/lib/auth-client";

export const UserMenu: FC = () => {
	const { data: session, isPending } = useSession();

	if (isPending) {
		return <div>Loading...</div>;
	}
	if (!session) {
		return (
			<Button
				className="px-0 hover:shadow-sm"
				size="lg"
				variant="ghost"
				onClick={async () => {
					await signIn.social({
						provider: "google",
						callbackURL: "/",
					});
				}}
			>
				<img src="/web_neutral_sq_SI.svg" alt="Google" />
			</Button>
		);
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-8 w-8 rounded-full p-0 transition-opacity hover:opacity-80"
				>
					<Avatar className="h-8 w-8">
						<AvatarImage
							src={session.user?.image || ""}
							alt={session.user?.name || "User"}
						/>
						<AvatarFallback>
							<User className="h-5 w-5" />
						</AvatarFallback>
					</Avatar>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-72 p-0" align="end">
				<div className="p-4">
					<div className="flex items-center gap-3">
						<Avatar className="h-10 w-10">
							<AvatarImage
								src={session.user?.image || ""}
								alt={session.user?.name || "User"}
							/>
							<AvatarFallback>
								<User className="h-5 w-5" />
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 overflow-hidden">
							<p className="truncate font-medium text-sm">
								{session.user?.name}
							</p>
							<p className="truncate text-muted-foreground text-xs">
								{session.user?.email}
							</p>
						</div>
					</div>
				</div>

				<Separator />

				<div className="p-2">
					<Button
						variant="ghost"
						className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
						onClick={() => signOut()}
					>
						<LogOut className="h-4 w-4" />
						Sign out
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
