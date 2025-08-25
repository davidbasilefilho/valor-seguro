"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

const Toaster = ({ variant = "default", ...props }: ToasterProps & {
	variant?: "default" | "blurry";
}) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className={cn(
				"toaster group",
				variant === "blurry" && "[&_.sonner-toast]:backdrop-blur-sm [&_.sonner-toast]:bg-opacity-90"
			)}
			style={
				{
					"--normal-bg": variant === "blurry" 
						? "color-mix(in srgb, var(--popover) 90%, transparent)" 
						: "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
				} as React.CSSProperties
			}
			{...props}
		/>
	);
};

export { Toaster };
