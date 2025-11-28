"use client";

import { LogIn, LogOut, User } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";
import { toast } from "sonner";
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
	const pathname = usePathname();
	const query = useSearchParams();
	const router = useRouter();
	const callbackURL = `${pathname}?${query.toString()}`;

	const handleSignIn = async () => {
		await signIn.social({
			provider: "cognito",
			callbackURL,
		});
	};

	const handleSignOut = async () => {
		await signOut({
			fetchOptions: {
				onSuccess(ctx) {
					console.debug("ctx", ctx);
					toast.success("Signed out successfully");
					// Making a new request to the server, re-fetching data requests, and re-rendering Server Components.
					// MEMO: `/`, `client-example` などの useSession でセッション取得・表示しているコンポーネントなら router.refresh() がなくても即座に更新される
					router.refresh();
					// TODO: refetch でもいけそうな気もするがこれだと即座に更新されない
				},
				onError(err) {
					console.error("error", err);
					toast.error("Failed to sign out");
				},
			},
		});
	};

	// `!sPending` が条件にないとサインイン済みのときにレイアウトシフトが発生する
	if (!isPending && !session) {
		return (
			<Button
				variant="ghost"
				className="text-muted-foreground hover:text-foreground"
				onClick={handleSignIn}
			>
				<LogIn className="h-4 w-4" />
				Sign in
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
							src={session?.user?.image || "User"}
							alt={session?.user?.name || "User"}
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
								src={session?.user?.image || "User"}
								alt={session?.user?.name || "User"}
							/>
							<AvatarFallback>
								<User className="h-5 w-5" />
							</AvatarFallback>
						</Avatar>
						<div className="flex-1 overflow-hidden">
							<p className="truncate font-medium text-sm">
								{session?.user?.name || "User"}
							</p>
							<p className="truncate text-muted-foreground text-xs">
								{session?.user?.email || "User"}
							</p>
						</div>
					</div>
				</div>

				<Separator />

				<div className="p-2">
					<Button
						variant="ghost"
						className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
						onClick={handleSignOut}
					>
						<LogOut className="h-4 w-4" />
						Sign out
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
