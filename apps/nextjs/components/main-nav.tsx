"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import NextWordmark from "@/public/next.svg";
import CustomLink from "./custom-link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export function MainNav() {
	return (
		<div className="flex items-center gap-4">
			<CustomLink href="/">
				<div className="flex items-center gap-3">
					<Image
						src="/better-auth-logo.png"
						alt="Better Auth"
						width={32}
						height={32}
					/>
					<X className="h-5 w-5" />
					<Image src={NextWordmark} alt="Next.js" height={16} />
				</div>
			</CustomLink>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger className="px-2">
							Server Side
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<ListItem href="/server-example" title="RSC Example">
									Protecting React Server Component.
								</ListItem>
								<ListItem href="/middleware-example" title="Middleware Example">
									Using Middleware to protect pages & APIs.
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/client-example"
							className={navigationMenuTriggerStyle()}
						>
							Client Side
						</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}

const ListItem = React.forwardRef<
	React.ElementRef<"a">,
	React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</a>
			</NavigationMenuLink>
		</li>
	);
});
ListItem.displayName = "ListItem";
