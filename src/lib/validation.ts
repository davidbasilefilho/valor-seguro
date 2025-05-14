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
