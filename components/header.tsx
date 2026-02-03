"use client";
import { useScroll } from "@/hooks/use-scroll";
import { Logo } from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";

export function Header() {
	const scrolled = useScroll(10);

	return (
		<header
			className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
				"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
				<div className="flex items-center gap-5">
					<Link href="/" className="rounded-md px-3 py-2.5 hover:bg-accent">
						<Logo className="h-4" />
					</Link>
					<DesktopNav />
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<Button variant="outline">Sign In</Button>
					<Button>Get Started</Button>
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
