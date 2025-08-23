"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	// Use class attribute so the `.dark` class is applied to <html> for shadcn variables
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			{...props}
		>
			{children}
		</NextThemesProvider>
	);
}
