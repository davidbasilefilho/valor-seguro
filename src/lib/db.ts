import { createClient } from "@/app/utils/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  BudgetInsertSchemaType,
  BudgetSchemaType,
  BudgetTagSchemaType,
  tagInsertSchemaType,
  TagSchemaType,
  TransactionSchemaType,
  TransactionTagSchemaType,
} from "./validation";

export const supabase = createClient();
const changes = supabase
  .channel("schema-db-changes")
  .on(
    "postgres_changes",
    {
      schema: "public", // Subscribes to the "public" schema in Postgres
      event: "*", // Listen to all changes
    },
    (payload) => console.log(payload)
  )
  .subscribe();

export type CustomQueryOptions = {
  refetchInterval?: number | false;
  retry?: boolean | false;
  enabled?: boolean;
};

export const useSelectTags = ({
  refetchInterval = false,
  retry = false,
  enabled = true,
}: CustomQueryOptions) =>
  useQuery({
    queryKey: ["tags"],
    enabled,
    refetchInterval,
    retry,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("tag")
        .select("*")
        .eq("user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
  });

export const useSelectTagById = (
  tagId: string,
  { enabled = true, refetchInterval = false, retry = false }: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["tag", tagId],
    enabled,
    refetchInterval,
    retry,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("tag")
        .select("*")
        .eq("id", tagId)
        .eq("user_id", user?.id ?? "")
        .single();
      if (error) throw error;
      return data;
    },
  });

export const useInsertTag = () =>
  useMutation({
    mutationFn: async (tag: tagInsertSchemaType) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("tag")
        .insert({ ...tag, user_id: user?.id ?? "" });
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Tag criada com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao criar tag!", { description: error.message }),
  });

export const useUpdateTagById = () =>
  useMutation({
    mutationFn: async (tag: TagSchemaType) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("tag")
        .update(tag)
        .eq("id", tag.id!)
        .eq("user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Tag atualizada com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao atualizar tag: ", { description: error.message }),
  });

export const useDeleteTagById = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase.from("tag").delete().eq("id", id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Tag excluída com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao excluir tag: ", { description: error.message }),
  });

export const useSelectTransactions = (options: CustomQueryOptions) =>
  useQuery({
    queryKey: ["transactions"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction")
        .select("*")
        .eq("user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useSelectTransactionById = (
  transactionId: string,
  options: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["transaction", transactionId],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction")
        .select("*")
        .eq("id", transactionId)
        .eq("user_id", user?.id ?? "")
        .single();
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useInsertTransaction = () =>
  useMutation({
    mutationFn: async (transaction: TransactionSchemaType) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction")
        .insert({ ...transaction, user_id: user?.id ?? "" });
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Transação criada com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao criar transação!", { description: error.message }),
  });

export const useUpdateTransactionById = () =>
  useMutation({
    mutationFn: async (transaction: TransactionSchemaType) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction")
        .update({ ...transaction, user_id: user?.id ?? undefined })
        .eq("id", transaction.id!)
        .eq("user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Transação atualizada com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao atualizar transação: ", {
        description: error.message,
      }),
  });

export const useDeleteTransactionById = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("transaction")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Transação excluída com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao excluir transação: ", {
        description: error.message,
      }),
  });
export const useSelectTransactionTypes = (options: CustomQueryOptions) =>
  useQuery({
    queryKey: ["transaction_types"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transaction_type")
        .select("*");
      if (error) throw error;
      return data;
    },
    ...options,
  });
export const useSelectTransactionTypeById = (
  transactionTypeId: string,
  options: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["transaction_type", transactionTypeId],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transaction_type")
        .select("*")
        .eq("id", transactionTypeId)
        .single();
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useSelectBudgets = (options: CustomQueryOptions) =>
  useQuery({
    queryKey: ["budgets"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("budget")
        .select("*")
        .eq("user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    ...options,
  });
export const useSelectBudgetById = (
  budgetId: string,
  options: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["budget", budgetId],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("budget")
        .select("*")
        .eq("id", budgetId)
        .eq("user_id", user?.id ?? "")
        .single();
      if (error) throw error;
      return data;
    },
    ...options,
  });
export const useInsertBudget = () =>
  useMutation({
    mutationFn: async (budget: BudgetInsertSchemaType) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("budget")
        .insert({ ...budget, user_id: user?.id ?? "" });
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Orçamento criado com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao criar orçamento!", { description: error.message }),
  });

export const useUpdateBudgetById = () =>
  useMutation({
    mutationFn: async (budget: BudgetSchemaType) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("budget")
        .update({ ...budget, user_id: user?.id ?? "" })
        .eq("id", budget.id!)
        .eq("user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Orçamento atualizado com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao atualizar orçamento!", {
        description: error.message,
      }),
  });
export const useDeleteBudgetById = () =>
  useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("budget")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Orçamento excluído com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao excluir orçamento!", { description: error.message }),
  });
export const useSelectBudgetTags = (options: CustomQueryOptions) =>
  useQuery({
    queryKey: ["budget_tags"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("budget_tags")
        .select("*, budget!inner(user_id)")
        .eq("budget.user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useDeleteBudgetTagsById = () =>
  useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase
        .from("budget_tags")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Tag do orçamento excluída com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao excluir tag do orçamento!", {
        description: error.message,
      }),
  });
export const useInsertBudgetTags = () =>
  useMutation({
    mutationFn: async (budgetTag: BudgetTagSchemaType) => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("budget_tags")
        .insert({ ...budgetTag });
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Tag do orçamento criada com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao criar tag do orçamento!", {
        description: error.message,
      }),
  });
export const useSelectTransactionTags = (options: CustomQueryOptions) =>
  useQuery({
    queryKey: ["transaction_tags"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction_tags")
        .select("*, transaction!inner(user_id)")
        .eq("transaction.user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useSelectTransactionTagsById = (
  transactionTagId: number,
  options: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["transaction_tag", transactionTagId],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction_tags")
        .select("*, transaction!inner(user_id)")
        .eq("id", transactionTagId)
        .eq("transaction.user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useDeleteTransactionTagsById = () =>
  useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase
        .from("transaction_tags")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Tag da transação excluída com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao excluir tag da transação!", {
        description: error.message,
      }),
  });
export const useInsertTransactionTags = () =>
  useMutation({
    mutationFn: async ({
      transactionTag,
      transaction_id,
    }: {
      transaction_id: string;
      transactionTag: TransactionTagSchemaType;
    }) => {
      const { data, error } = await supabase
        .from("transaction_tags")
        .insert({ ...transactionTag, transaction_id });
      if (error) throw error;
      return data;
    },
    onSuccess: () => toast("Tag da transação criada com sucesso!"),
    onError: (error) =>
      toast.error("Erro ao criar tag da transação!", {
        description: error.message,
      }),
  });

export const useSelectTransactionsFromLastMonth = (
  options: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["transactions_last_month"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction")
        .select("*, user!inner(id)")
        .eq("user.id", user?.id ?? "")
        .gte("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
        .lt("created_at", new Date());
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useSelectTransactionsFromLastWeek = (
  options: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["transactions_last_week"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction")
        .select("*, user!inner(id)")
        .eq("user.id", user?.id ?? "")
        .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
        .lt("created_at", new Date());
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useSelectTransactionsFromLastYear = (
  options: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["transactions_last_year"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction")
        .select("*, user!inner(id)")
        .eq("user.id", user?.id ?? "")
        .gte("created_at", new Date(Date.now() - 365 * 24 * 60 * 60 * 1000))
        .lt("created_at", new Date());
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useSelectTransactionsBeforeDate = (
  date: Date,
  options: CustomQueryOptions
) =>
  useQuery({
    queryKey: ["transactions_before_date", date],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction")
        .select("*, user!inner(id)")
        .eq("user.id", user?.id ?? "")
        .lt("created_at", date);
      if (error) throw error;
      return data;
    },
    ...options,
  });

export const useSelectTransactionTagsJoin = (options: CustomQueryOptions) =>
  useQuery({
    queryKey: ["transaction_tags_join"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("transaction_tags")
        .select("*, transaction!inner(*), tag!inner(*)")
        .eq("transaction.user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    ...options,
  });
export const useSelectBudgetTagsJoin = (options: CustomQueryOptions) =>
  useQuery({
    queryKey: ["budget_tags_join"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      const { data, error } = await supabase
        .from("budget_tags")
        .select("*, budget!inner(*), tag!inner(*)")
        .eq("budget.user_id", user?.id ?? "");
      if (error) throw error;
      return data;
    },
    ...options,
  });
