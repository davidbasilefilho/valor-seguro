"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
	const { setTheme, theme, resolvedTheme } = useTheme();

	// theme can be 'light' | 'dark' | 'system' | undefined
	// resolvedTheme is the actual applied theme when theme === 'system'
	const current = theme === "system" ? "system" : (resolvedTheme ?? theme);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="size-8">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					<div className="flex items-center justify-between w-full">
						<span>Light</span>
						{current === "light" ? (
							<Check className="h-4 w-4 text-primary" />
						) : null}
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					<div className="flex items-center justify-between w-full">
						<span>Dark</span>
						{current === "dark" ? (
							<Check className="h-4 w-4 text-primary" />
						) : null}
					</div>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					<div className="flex items-center justify-between w-full">
						<span>System</span>
						{theme === "system" ? (
							<Check className="h-4 w-4 text-primary" />
						) : null}
					</div>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
