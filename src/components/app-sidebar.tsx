"use client";
import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import * as Sidebar from "@/components/ui/sidebar";
import { useAuthSignOut, useAuthUserData } from "@/lib/auth";
import {
	QueryClient,
	QueryClientProvider,
	useQueryClient,
} from "@tanstack/react-query";
import {
	CircleDollarSign,
	HandCoins,
	Info,
	LogIn,
	LogOut,
	Mountain,
	Tag,
} from "lucide-react";
import { LoadingSpinner } from "./loading-spinner";
import { Separator } from "./ui/separator";

const queryClient = new QueryClient();
export function AppSidebar() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppSidebarContent />
		</QueryClientProvider>
	);
}

export function AppSidebarContent() {
	const { state, isMobile } = Sidebar.useSidebar();
	const userData = useAuthUserData({ refetchInterval: 2000 });
	const logout = useAuthSignOut();
	const queryClient = useQueryClient();
	const logoutUser = () => {
		logout.mutate();
		queryClient.invalidateQueries({ queryKey: ["authUserData"] });
		userData.refetch();
	};

	return (
		<Sidebar.Sidebar variant={"inset"} collapsible="icon">
			<Sidebar.SidebarContent>
				<Sidebar.SidebarMenu className="flex flex-col items-stretch">
					<Sidebar.SidebarMenuItem>
						<Sidebar.SidebarMenuButton asChild>
							<Link className="font-semibold text-lg" href="/">
								<Mountain /> {state === "expanded" ? "Valor Seguro" : ""}
							</Link>
						</Sidebar.SidebarMenuButton>
					</Sidebar.SidebarMenuItem>

					<Separator />

					<Sidebar.SidebarMenuItem>
						<Sidebar.SidebarMenuButton asChild>
							<Link className="font-medium" href="/about">
								<Info /> {state === "expanded" ? "Sobre" : ""}
							</Link>
						</Sidebar.SidebarMenuButton>
					</Sidebar.SidebarMenuItem>

					{userData.data && (
						<Sidebar.SidebarMenuItem>
							<Sidebar.SidebarMenuButton asChild>
								<Link className="font-medium" href="/tags">
									<Tag /> {state === "expanded" ? "Rótulos" : ""}
								</Link>
							</Sidebar.SidebarMenuButton>
						</Sidebar.SidebarMenuItem>
					)}

					{userData.data && (
						<Sidebar.SidebarMenuItem>
							<Sidebar.SidebarMenuButton asChild>
								<Link className="font-medium" href="/transactions">
									<HandCoins />
									{state === "expanded" ? "Transações" : ""}
								</Link>
							</Sidebar.SidebarMenuButton>
						</Sidebar.SidebarMenuItem>
					)}

					{userData.data && (
						<Sidebar.SidebarMenuItem>
							<Sidebar.SidebarMenuButton asChild>
								<Link className="font-medium" href="/budgets">
									<CircleDollarSign />
									{state === "expanded" ? "Orçamentos" : ""}
								</Link>
							</Sidebar.SidebarMenuButton>
						</Sidebar.SidebarMenuItem>
					)}
				</Sidebar.SidebarMenu>
			</Sidebar.SidebarContent>

			<Sidebar.SidebarFooter>
				<Sidebar.SidebarMenu>
					{isMobile ? (
						<>
							{userData.isLoading ? (
								<LoadingSpinner />
							) : userData.data ? (
								<div className="flex flex-row justify-between items-center">
									<Sidebar.SidebarMenuItem>
										<Sidebar.SidebarMenuButton
											onClick={() => logoutUser()}
											className="flex cursor-pointer flex-row justify-around w-full border bg-transparent"
										>
											<LogOut />
											{userData.data?.username}
										</Sidebar.SidebarMenuButton>
									</Sidebar.SidebarMenuItem>
									<Sidebar.SidebarMenuItem>
										<ModeToggle />
									</Sidebar.SidebarMenuItem>
								</div>
							) : (
								<div className="flex flex-row justify-end items-center gap-2">
									<Sidebar.SidebarMenuItem>
										<Sidebar.SidebarMenuButton asChild>
											<Link
												href="/login"
												className={buttonVariants({ variant: "outline" })}
											>
												<LogIn /> Entrar
											</Link>
										</Sidebar.SidebarMenuButton>
									</Sidebar.SidebarMenuItem>
									<Sidebar.SidebarMenuItem>
										<ModeToggle />
									</Sidebar.SidebarMenuItem>
								</div>
							)}
						</>
					) : state === "expanded" ? (
						<>
							{userData.isLoading ? (
								<LoadingSpinner color="var(--color-primary)" />
							) : userData.data ? (
								<div className="flex flex-row justify-end items-center gap-2">
									<Sidebar.SidebarMenuItem>
										<Sidebar.SidebarMenuButton
											onClick={() => logoutUser()}
											className="flex cursor-pointer flex-row justify-around w-full border bg-transparent"
										>
											<LogOut />
											{userData.data?.username}
										</Sidebar.SidebarMenuButton>
									</Sidebar.SidebarMenuItem>
									<Sidebar.SidebarMenuItem>
										<ModeToggle />
									</Sidebar.SidebarMenuItem>
								</div>
							) : (
								<div className="flex flex-row justify-end items-center gap-2">
									<Sidebar.SidebarMenuItem>
										<Sidebar.SidebarMenuButton asChild>
											<Link
												href="/login"
												className={buttonVariants({ variant: "outline" })}
											>
												<LogIn />
											</Link>
										</Sidebar.SidebarMenuButton>
									</Sidebar.SidebarMenuItem>
									<Sidebar.SidebarMenuItem>
										<ModeToggle />
									</Sidebar.SidebarMenuItem>
								</div>
							)}
						</>
					) : (
						<>
							{userData.isLoading ? (
								<LoadingSpinner />
							) : userData.data ? (
								<div className="flex flex-col justify-end gap-2 items-center">
									<Sidebar.SidebarMenuItem>
										<Sidebar.SidebarMenuButton
											onClick={() => logoutUser()}
											className="flex cursor-pointer flex-row justify-around w-full border bg-transparent"
										>
											<LogOut />
											{userData.data?.username}
										</Sidebar.SidebarMenuButton>
									</Sidebar.SidebarMenuItem>
									<Sidebar.SidebarMenuItem>
										<ModeToggle />
									</Sidebar.SidebarMenuItem>
								</div>
							) : (
								<div className="flex flex-col justify-end gap-2 items-center">
									<Sidebar.SidebarMenuButton asChild>
										<Link
											href="/login"
											className={buttonVariants({ variant: "outline" })}
										>
											<LogIn />
										</Link>
									</Sidebar.SidebarMenuButton>
									<Sidebar.SidebarMenuItem>
										<ModeToggle />
									</Sidebar.SidebarMenuItem>
								</div>
							)}
						</>
					)}
				</Sidebar.SidebarMenu>
			</Sidebar.SidebarFooter>
		</Sidebar.Sidebar>
	);
}
