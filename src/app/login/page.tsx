"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthSignIn, useAuthSignUp, useAuthState } from "@/lib/auth";
import {
	type LoginSchemaType,
	loginSchema,
	type SignUpSchemaType,
	signUpSchema,
} from "@/lib/validation";

export default function LoginPage() {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<LoginPageContent />
		</QueryClientProvider>
	);
}

function LoginPageContent() {
	const loginMutation = useAuthSignIn();
	const signUpMutation = useAuthSignUp();
	const { data: authState, isLoading, refetch } = useAuthState({});

	const loginForm = useForm<LoginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onLoginSubmit = async (data: LoginSchemaType) => {
		try {
			await loginMutation.mutateAsync(data);
			refetch();
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	const signUpForm = useForm<SignUpSchemaType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			username: "",
		},
	});

	const onSignUpSubmit = async (data: SignUpSchemaType) => {
		try {
			await signUpMutation.mutateAsync(data);
			refetch();
		} catch (error) {
			console.error("Sign up failed:", error);
		}
	};

	const [showPassword, setShowPassword] = useState(false);

	if (isLoading) {
		return <LoadingSpinner color="var(--color-primary)" />;
	} else {
		if (authState) {
			return (
				<div className="flex flex-col items-center justify-center pt-16 p-4 gap-6">
					<h1 className="text-2xl font-bold">Você já está logado!</h1>
					<Link href="/" className={buttonVariants({ variant: "default" })}>
						Voltar para a página inicial
					</Link>
				</div>
			);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center pt-16 p-4">
			<Tabs defaultValue={"login"} className="w-80">
				<TabsList className="w-full grid grid-cols-2">
					<TabsTrigger value="login" className="w-full">
						Entrar
					</TabsTrigger>
					<TabsTrigger value="register" className="w-full">
						Cadastrar
					</TabsTrigger>
				</TabsList>
				<TabsContent value="login" className="w-full">
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Entre na sua conta</CardTitle>
						</CardHeader>
						<CardContent>
							<Form {...loginForm}>
								<form
									onSubmit={loginForm.handleSubmit(onLoginSubmit)}
									className="flex flex-col gap-4"
								>
									<FormField
										control={loginForm.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="Digite seu email"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={loginForm.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Senha</FormLabel>
												<FormControl className="flex flex-row gap-2">
													<div>
														<Input
															type={showPassword ? "text" : "password"}
															placeholder="Digite sua senha"
															{...field}
														/>
														<Button
															variant={"outline"}
															size={"icon"}
															type="button"
															onClick={() => setShowPassword(!showPassword)}
														>
															{showPassword ? <Eye /> : <EyeClosed />}
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Button
										type="submit"
										disabled={loginMutation.isPending}
										className="w-full"
									>
										{loginMutation.isPending ? "Entrando..." : "Entrar"}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="register" className="w-full">
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Crie uma nova conta</CardTitle>
						</CardHeader>

						<CardContent>
							<Form {...signUpForm}>
								<form
									onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
									className="flex flex-col gap-4"
								>
									<FormField
										control={signUpForm.control}
										name="username"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nome de usuário</FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="Digite seu nome de usuário"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={signUpForm.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="Digite seu email"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={signUpForm.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Senha</FormLabel>
												<FormControl className="flex flex-row gap-2">
													<div>
														<Input
															type={showPassword ? "text" : "password"}
															placeholder="Digite sua senha"
															{...field}
														/>
														<Button
															variant={"outline"}
															size={"icon"}
															type="button"
															onClick={() => setShowPassword(!showPassword)}
														>
															{showPassword ? <Eye /> : <EyeClosed />}
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={signUpForm.control}
										name="confirmPassword"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Confirmar Senha</FormLabel>
												<FormControl className="flex flex-row gap-2">
													<div>
														<Input
															type={showPassword ? "text" : "password"}
															placeholder="Confirme sua senha"
															{...field}
														/>
														<Button
															variant={"outline"}
															size={"icon"}
															type="button"
															onClick={() => setShowPassword(!showPassword)}
														>
															{showPassword ? <Eye /> : <EyeClosed />}
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<Alert>
										<AlertTitle>A senha deve conter:</AlertTitle>
										<AlertDescription>
											<ul className="list-disc pl-4">
												<li>6 ou mais caracteres</li>
												<li>1 letra maiúscula</li>
												<li>1 letra minúscula</li>
												<li>1 número</li>
												<li>1 caractere especial</li>
											</ul>
										</AlertDescription>
									</Alert>

									<Button
										type="submit"
										disabled={signUpMutation.isPending}
										className="w-full"
									>
										{signUpMutation.isPending ? "Criando..." : "Criar conta"}
									</Button>
								</form>
							</Form>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
