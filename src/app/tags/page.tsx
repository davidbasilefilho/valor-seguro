"use client";
import { LoadingSpinner } from "@/components/loading-spinner";
import TagsForm from "@/components/tags-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuthState, useAuthUserData } from "@/lib/auth";
import { useDeleteTagById, useSelectTags } from "@/lib/db";
import { TagSchemaType } from "@/lib/validation";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Delete, Edit, EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const queryClient = new QueryClient();
export default function TagsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <TagsPageContent />
    </QueryClientProvider>
  );
}

function TagsPageContent() {
  const authState = useAuthState({ refetchInterval: 1000 });
  const tags = useSelectTags({ refetchInterval: 1000 });
  const deleteTag = useDeleteTagById();
  const { data } = useAuthUserData({ refetchInterval: 5000 });

  const { isMobile } = useSidebar();

  const tagColumns: ColumnDef<TagSchemaType>[] = [
    {
      accessorKey: "title",
      header: "Título",
    },
    {
      accessorKey: "user_id",
      header: "Usuário",
      cell: ({ row }) => {
        return (
          <span>
            {row.getValue("user_id") === data?.id
              ? `${data?.username} (Você)`
              : "Outro"}
          </span>
        );
      },
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return (
          <Dialog>
            <DialogTrigger className={buttonVariants({ variant: "outline" })}>
              Ver ID
            </DialogTrigger>
            <DialogContent className="px-4 py-8">
              <DialogTitle>Rótulo ID</DialogTitle>
              <DialogDescription>
                O ID do rótulo é: {row.getValue("id")}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Criado em",
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"));
        return <span>{format(date, "dd/MM/yyyy")}</span>;
      },
    },
    {
      accessorKey: "actions",
      header: "Ações",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} size={"icon"}>
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {isMobile ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Dialog>
                        <DialogTrigger
                          className={buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-between!",
                          })}
                        >
                          Editar
                          <Edit className="text-muted-foreground w-2 h-2" />
                        </DialogTrigger>
                        <DialogContent className="px-4 py-4">
                          <DialogTitle>
                            Editar rótulo &quot;{row.getValue("title")}&quot;
                          </DialogTitle>
                          <DialogDescription>
                            Use este formulário para editar um rótulo existente,
                            para categorizar suas transações e orçamentos.
                          </DialogDescription>
                          <TagsForm
                            tag={{
                              user_id: row.getValue("user_id"),
                              title: row.getValue("title"),
                              created_at: row.getValue("created_at"),
                              id: row.getValue("id"),
                            }}
                            onSubmitForm={tags.refetch}
                          />
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="w-full justify-between!"
                          >
                            Excluir
                            <Delete className="text-muted-foreground w-2 h-2" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Você tem certeza?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Você irá excluir
                              o rótulo &quot;{row.getValue("title")}&quot;
                              permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel
                              className={buttonVariants({ variant: "ghost" })}
                            >
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteTag.mutate(row.getValue("id")!);
                                tags.refetch();
                              }}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Sheet>
                        <SheetTrigger
                          className={buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-between!",
                          })}
                        >
                          Editar
                          <Edit className="text-muted-foreground w-2 h-2" />
                        </SheetTrigger>
                        <SheetContent className="px-4 py-4">
                          <SheetTitle>
                            Editar rótulo &quot;{row.getValue("title")}&quot;
                          </SheetTitle>
                          <SheetDescription>
                            Use este formulário para editar um rótulo existente,
                            para categorizar suas transações e orçamentos.
                          </SheetDescription>
                          <TagsForm
                            tag={{
                              user_id: row.getValue("user_id"),
                              title: row.getValue("title"),
                              created_at: row.getValue("created_at"),
                              id: row.getValue("id"),
                            }}
                            onSubmitForm={tags.refetch}
                          />
                        </SheetContent>
                      </Sheet>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant={"ghost"}
                            className="w-full justify-between!"
                          >
                            Excluir
                            <Delete className="text-muted-foreground w-2 h-2" />
                          </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Você tem certeza?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Você irá excluir
                              o rótulo {row.getValue("title")} permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter>
                            <AlertDialogCancel
                              className={buttonVariants({ variant: "ghost" })}
                            >
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteTag.mutate(row.getValue("id")!);
                                tags.refetch();
                              }}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (authState.isLoading)
    return (
      <div className="w-full">
        <LoadingSpinner color="var(--color-primary)" />
      </div>
    );

  if (authState.data === false) {
    toast.error("Você precisa estar logado para acessar essa página.");
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">
          Você precisa estar logado para acessar essa página!
        </h1>
        <Link
          href={"/login"}
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className: "mt-8",
          })}
        >
          Fazer login
        </Link>
      </div>
    );
  }

  if (tags.isLoading)
    return (
      <div className="w-full">
        <LoadingSpinner color="var(--color-primary)" />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 gap-4">
      <div className="flex flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Rótulos</h1>
        <div className="flex flex-col items-center justify-center">
          {isMobile ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} size={isMobile ? "icon" : "lg"}>
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent className="px-4 py-8">
                <DialogTitle>Adicionar rótulo</DialogTitle>
                <DialogDescription>
                  Use este formulário para adicionar um novo rótulo, para
                  categorizar suas transações e orçamentos.
                </DialogDescription>
                <TagsForm tag={null} onSubmitForm={tags.refetch} />
              </DialogContent>
            </Dialog>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"outline"} size={isMobile ? "icon" : "lg"}>
                  {isMobile ? <Plus /> : "Adicionar rótulo"}
                </Button>
              </SheetTrigger>
              <SheetContent className="px-4 py-4">
                <SheetTitle>Adicionar rótulo</SheetTitle>
                <SheetDescription>
                  Use este formulário para adicionar um novo rótulo, para
                  categorizar suas transações e orçamentos.
                </SheetDescription>
                <TagsForm tag={null} onSubmitForm={tags.refetch} />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <DataTable
        searchKey="title"
        columns={tagColumns}
        data={tags.data ?? []}
      />
    </div>
  );
}
