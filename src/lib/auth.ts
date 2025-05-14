import { createClient } from "@/app/utils/supabase/client";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { LoginSchemaType, SignUpSchemaType } from "./validation";

export const useAuthState = ({
  refetchInterval = false,
  retry = false,
  enabled = true,
}: {
  refetchInterval?: number | false;
  retry?: UseQueryOptions["retry"];
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["authState"],
    refetchOnWindowFocus: false,
    refetchInterval,
    enabled,
    retry,
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      return session ? true : false;
    },
  });

export const useAuthSession = ({
  refetchInterval = false,
  retry = false,
  enabled = true,
}: {
  refetchInterval?: number | false;
  retry?: UseQueryOptions["retry"];
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["authSession"],
    refetchOnWindowFocus: false,
    refetchInterval,
    retry,
    enabled,
    queryFn: async () => {
      const supabase = createClient();
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;

      return session;
    },
  });

export const useAuthSignIn = () =>
  useMutation({
    mutationKey: ["authSignIn"],
    mutationFn: async ({ email, password }: LoginSchemaType) => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      return data;
    },
  });

export const useAuthSignOut = () =>
  useMutation({
    mutationKey: ["authSignOut"],
    mutationFn: async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
  });

export const useAuthSignUp = () =>
  useMutation({
    mutationKey: ["authSignUp"],
    mutationFn: async ({ email, password, username }: SignUpSchemaType) => {
      const supabase = createClient();
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;

      const { error: userError } = await supabase.from("users").insert([
        {
          id: user?.id,
          username,
          email,
        },
      ]);
      if (userError) throw userError;
    },
  });

export const useAuthUser = ({
  refetchInterval = false,
  retry = false,
  enabled = true,
}: {
  refetchInterval?: number | false;
  enabled?: boolean;
  retry?: UseQueryOptions["retry"];
}) =>
  useQuery({
    queryKey: ["authUser"],
    refetchOnWindowFocus: false,
    enabled,
    retry,
    refetchInterval,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      return data.user;
    },
  });

export const useAuthUserData = ({
  refetchInterval = false,
  retry = false,
  enabled = true,
}: {
  refetchInterval?: number | false;
  retry?: UseQueryOptions["retry"];
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["authUserData"],
    refetchOnWindowFocus: false,
    refetchInterval,
    enabled,
    retry,
    queryFn: async () => {
      const supabase = createClient();
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError) throw userError;
      if (!userData.user) return null;
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userData.user.id)
        .limit(1)
        .single();
      if (error) throw error;

      return data;
    },
  });

export const useAuthUserById = (
  id: string,
  {
    refetchInterval = false,
    retry = false,
    enabled = true,
  }: {
    refetchInterval?: number | false;
    retry?: UseQueryOptions["retry"];
    enabled?: boolean;
  }
) =>
  useQuery({
    queryKey: ["authUserById", id],
    refetchOnWindowFocus: false,
    refetchInterval,
    enabled,
    retry,
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;

      return data;
    },
  });
