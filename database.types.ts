export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			budget: {
				Row: {
					created_at: string;
					deadline: string;
					description: string | null;
					id: string;
					limit: number;
					title: string;
					user_id: string;
				};
				Insert: {
					created_at?: string;
					deadline: string;
					description?: string | null;
					id?: string;
					limit: number;
					title: string;
					user_id: string;
				};
				Update: {
					created_at?: string;
					deadline?: string;
					description?: string | null;
					id?: string;
					limit?: number;
					title?: string;
					user_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "budget_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			budget_tags: {
				Row: {
					budget_id: string;
					created_at: string;
					id: number;
					tag_id: string;
				};
				Insert: {
					budget_id: string;
					created_at?: string;
					id?: number;
					tag_id: string;
				};
				Update: {
					budget_id?: string;
					created_at?: string;
					id?: number;
					tag_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "budget_tags_budget_id_fkey";
						columns: ["budget_id"];
						isOneToOne: false;
						referencedRelation: "budget";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "budget_tags_tag_id_fkey";
						columns: ["tag_id"];
						isOneToOne: false;
						referencedRelation: "tag";
						referencedColumns: ["id"];
					},
				];
			};
			tag: {
				Row: {
					created_at: string;
					id: string;
					title: string;
					user_id: string | null;
				};
				Insert: {
					created_at?: string;
					id?: string;
					title: string;
					user_id?: string | null;
				};
				Update: {
					created_at?: string;
					id?: string;
					title?: string;
					user_id?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "tag_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			transaction: {
				Row: {
					created_at: string;
					date: string;
					description: string | null;
					id: string;
					title: string;
					type_id: string;
					user_id: string;
					value: number;
				};
				Insert: {
					created_at?: string;
					date: string;
					description?: string | null;
					id?: string;
					title: string;
					type_id?: string;
					user_id?: string;
					value: number;
				};
				Update: {
					created_at?: string;
					date?: string;
					description?: string | null;
					id?: string;
					title?: string;
					type_id?: string;
					user_id?: string;
					value?: number;
				};
				Relationships: [
					{
						foreignKeyName: "transaction_type_id_fkey";
						columns: ["type_id"];
						isOneToOne: false;
						referencedRelation: "transaction_type";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "transaction_user_id_fkey";
						columns: ["user_id"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["id"];
					},
				];
			};
			transaction_tags: {
				Row: {
					created_at: string;
					id: number;
					tag_id: string;
					transaction_id: string;
				};
				Insert: {
					created_at?: string;
					id?: number;
					tag_id: string;
					transaction_id: string;
				};
				Update: {
					created_at?: string;
					id?: number;
					tag_id?: string;
					transaction_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "transaction_tags_tag_id_fkey";
						columns: ["tag_id"];
						isOneToOne: false;
						referencedRelation: "tag";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "transaction_tags_transaction_id_fkey";
						columns: ["transaction_id"];
						isOneToOne: false;
						referencedRelation: "transaction";
						referencedColumns: ["id"];
					},
				];
			};
			transaction_type: {
				Row: {
					created_at: string;
					description: string | null;
					id: string;
					title: string;
				};
				Insert: {
					created_at?: string;
					description?: string | null;
					id?: string;
					title: string;
				};
				Update: {
					created_at?: string;
					description?: string | null;
					id?: string;
					title?: string;
				};
				Relationships: [];
			};
			users: {
				Row: {
					created_at: string;
					email: string;
					id: string;
					username: string;
				};
				Insert: {
					created_at?: string;
					email: string;
					id?: string;
					username: string;
				};
				Update: {
					created_at?: string;
					email?: string;
					id?: string;
					username?: string;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof Database },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
	? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database;
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
