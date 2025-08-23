import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInsertTag, useUpdateTagById } from "@/lib/db";
import { type TagSchemaType, tagSchema } from "@/lib/validation";
import { Button } from "./ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function TagsForm({
	tag,
	onSubmitForm,
}: {
	tag: TagSchemaType | null;
	onSubmitForm?: () => void;
}) {
	const insertTag = useInsertTag();
	const updateTag = useUpdateTagById();

	const form = useForm<TagSchemaType>({
		resolver: zodResolver(tagSchema),
		defaultValues: {
			title: tag?.title ?? "",
			created_at: tag?.created_at ?? undefined,
			user_id: tag?.user_id ?? undefined,
		},
	});

	useEffect(() => {
		if (tag?.id) {
			form.reset(tag);
		}
	}, [form, tag]);

	const onSubmit = async (data: TagSchemaType) => {
		if (data?.id) {
			updateTag.mutate(data);
		} else {
			insertTag.mutate(data);
		}
		onSubmitForm?.();
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex gap-4 flex-col"
			>
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Título</FormLabel>
							<FormControl>
								<Input
									placeholder="Comida, limpeza, etc"
									{...field}
									className="w-full"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-fit ml-auto"
					disabled={insertTag.isPending || updateTag.isPending}
				>
					{insertTag.isPending || updateTag.isPending
						? "Carregando..."
						: tag?.id
							? "Salvar alterações"
							: "Cadastrar"}
				</Button>
			</form>
		</Form>
	);
}
