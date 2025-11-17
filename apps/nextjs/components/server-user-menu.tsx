import { LogOut, User } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import GoogleSI from "@/public/web_neutral_sq_SI.svg";

export const ServerUserMenu: FC = async () => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const signIn = async () => {
		"use server";
		const referer = (await headers()).get("referer");
		const res = await auth.api.signInSocial({
			body: {
				provider: "google",
				callbackURL: referer ?? "/",
			},
		});
		return redirect(res.url ?? "/");
	};

	const signOut = async () => {
		"use server";
		await auth.api.signOut({
			headers: await headers(),
		});
		const referer = (await headers()).get("referer");
		// TODO: `/`, `client-example` などの useSession でセッション取得・表示しているコンポーネントが即座に更新されない
		if (referer) {
			return redirect(referer);
		}
		return redirect("/");
	};

	if (!session) {
		return (
			<form action={signIn}>
				<Button
					type="submit"
					className="px-0 hover:shadow-sm"
					size="lg"
					variant="ghost"
				>
					<Image src={GoogleSI} alt="Google" />
				</Button>
			</form>
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
					<form action={signOut}>
						<Button
							type="submit"
							variant="ghost"
							className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
						>
							<LogOut className="h-4 w-4" />
							Sign out
						</Button>
					</form>
				</div>
			</PopoverContent>
		</Popover>
	);
};
