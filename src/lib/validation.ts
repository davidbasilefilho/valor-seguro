import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email("Email inválido"),
    password: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Senha inválida"
      ),
    username: z
      .string()
      .min(3, "Nome de usuário deve ter no mínimo 3 caracteres")
      .max(20, "Nome de usuário deve ter no máximo 20 caracteres")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Nome de usuário deve conter apenas letras, números e underscores"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const tagInsertSchema = z.object({
  title: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(20, "Nome deve ter no máximo 20 caracteres"),
});

export type tagInsertSchemaType = z.infer<typeof tagInsertSchema>;

export const tagSchema = tagInsertSchema.extend({
  id: z.string().optional(),
  created_at: z.string().optional(),
  user_id: z.string().optional().nullable(),
});

export type TagSchemaType = z.infer<typeof tagSchema>;

export const transactionInsertSchema = z.object({
  date: z.string({ message: "Data inválida" }),
  value: z.number({ message: "Valor inválido" }),
  description: z.string().nullable(),
  type_id: z.string(),
  title: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
});

export type TransactionInsertSchemaType = z.infer<
  typeof transactionInsertSchema
>;

export const transactionSchema = transactionInsertSchema.extend({
  id: z.string().optional(),
  created_at: z.string().optional(),
  user_id: z.string().optional().nullable(),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;

export const transactionTypeSchema = z.object({
  id: z.string(),
  title: z.string(),
  created_at: z.string(),
  description: z.string().nullable(),
});

export type TransactionTypeSchemaType = z.infer<typeof transactionTypeSchema>;

export const budgetInsertSchema = z.object({
  title: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  deadline: z.string({ message: "Data inválida" }),
  description: z.string().nullable(),
  limit: z.number(),
});

export type BudgetInsertSchemaType = z.infer<typeof budgetInsertSchema>;

export const budgetSchema = budgetInsertSchema.extend({
  id: z.string().optional(),
  created_at: z.string().optional(),
  user_id: z.string().optional().nullable(),
});

export type BudgetSchemaType = z.infer<typeof budgetSchema>;

export const budgetTagSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  budget_id: z.string(),
  tag_id: z.string(),
});

export type BudgetTagSchemaType = z.infer<typeof budgetTagSchema>;

export const transactionTagSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  transaction_id: z.string(),
  tag_id: z.string(),
});
export type TransactionTagSchemaType = z.infer<typeof transactionTagSchema>;

export const transactionTagFormSchema = z.object({
  transaction_tags: z.array(transactionTagSchema),
});

export type TransactionTagFormSchemaType = z.infer<
  typeof transactionTagFormSchema
>;
