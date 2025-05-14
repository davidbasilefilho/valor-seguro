"use client";
import Link from "next/link";
import { createClient } from "@/app/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

import * as Sidebar from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import { Info, LogIn, LogOut, Mountain } from "lucide-react";
import { LoadingSpinner } from "./loading-spinner";
import { useAuthSignOut, useAuthUser, useAuthUserData } from "@/lib/auth";
import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";

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

  return (
    <Sidebar.Sidebar variant={"inset"} collapsible="icon">
      <Sidebar.SidebarContent className="flex flex-col gap-2 items-center">
        <Sidebar.SidebarMenuButton asChild>
          <Link className="font-semibold text-lg" href="/">
            <Mountain /> {state === "expanded" ? "Valor Seguro" : ""}
          </Link>
        </Sidebar.SidebarMenuButton>
        <Separator />
        <Sidebar.SidebarMenuButton asChild>
          <Link className="font-medium" href="/about">
            <Info /> {state === "expanded" ? "Sobre" : ""}
          </Link>
        </Sidebar.SidebarMenuButton>
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
                      onClick={() => {
                        logout.mutate();
                        userData.refetch();
                      }}
                      className="flex *cursor-pointer flex-row justify-around w-full border bg-transparent"
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
                      onClick={() => {
                        logout.mutate();
                        userData.refetch();
                      }}
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
                <div className="flex flex-col justify-end gap-2">
                  <Sidebar.SidebarMenuItem>
                    <Sidebar.SidebarMenuButton
                      onClick={() => {
                        logout.mutate();
                        userData.refetch();
                      }}
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
                <div className="flex flex-col justify-end gap-2">
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
