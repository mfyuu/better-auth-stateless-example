import { X } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";
import CustomLink from "./custom-link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export function MainNav() {
	return (
		<div className="flex items-center gap-4">
			<CustomLink to="/">
				<div className="flex items-center gap-3">
					<img
						src="/better-auth-logo.png"
						alt="Better Auth"
						className="h-8 w-8"
					/>
					<X className="h-5 w-5" />
					<img
						src="/rr_logo_light.svg"
						alt="React Router"
						className="h-8 w-8"
					/>
				</div>
			</CustomLink>
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuLink
							href="/protected"
							className={navigationMenuTriggerStyle()}
						>
							Protected
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
