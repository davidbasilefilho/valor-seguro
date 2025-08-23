/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: code provided by supabase */
/** biome-ignore-all lint/correctness/noUnusedVariables: code provided by supabase */
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "../../../../database.types";

export const createClient = (request: NextRequest) => {
	// Create an unmodified response
	let supabaseResponse = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	const supabase = createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					cookiesToSet.forEach(({ name, value }) =>
						request.cookies.set(name, value),
					);
					supabaseResponse = NextResponse.next({
						request,
					});
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options),
					);
				},
			},
		},
	);

	return supabaseResponse;
};
