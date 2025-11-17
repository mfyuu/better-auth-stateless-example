import type { FC } from "react";
import { Outlet } from "react-router";
import { MainNav } from "~/components/main-nav";
import { UserMenu } from "~/components/user-menu";

const RootLayout: FC = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky flex justify-center border-b">
				<div className="mx-auto flex h-16 container w-full items-center justify-between">
					<MainNav />
					<UserMenu />
				</div>
			</header>
			<Outlet />
		</div>
	);
};

export default RootLayout;
