import {
  useInsertTransaction,
  useSelectTags,
  useSelectTransactionTagsById,
  useSelectTransactionTypes,
  useUpdateTransactionById,
} from "@/lib/db";
import { cn } from "@/lib/utils";
import {
  transactionSchema,
  TransactionSchemaType,
  transactionTagFormSchema,
  TransactionTagFormSchemaType,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Plus } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { LoadingSpinner } from "./loading-spinner";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function TagsForm({
  transaction,
  onSubmitForm,
}: {
  transaction: TransactionSchemaType | null;
  onSubmitForm?: () => void;
}) {
  const insertTransaction = useInsertTransaction();
  const updateTransaction = useUpdateTransactionById();
  const selectTransactionTypes = useSelectTransactionTypes({});
  const selectTags = useSelectTags({});

  const form = useForm<TransactionSchemaType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: transaction?.title ?? "",
      created_at: transaction?.created_at ?? undefined,
      user_id: transaction?.user_id ?? undefined,
      type_id: transaction?.type_id ?? undefined,
    },
  });

  useEffect(() => {
    if (transaction?.id) {
      form.reset(transaction);
    }
  }, [form, transaction]);

  const onSubmit = async (data: TransactionSchemaType) => {
    if (data?.id) {
      updateTransaction.mutate(data);
    } else {
      insertTransaction.mutate(data);
    }
    onSubmitForm?.();
  };

  const transactionTagsForm = useForm<TransactionTagFormSchemaType>({
    resolver: zodResolver(transactionTagFormSchema),
    defaultValues: {
      transaction_tags: [],
    },
  });

  const selectTransactionTags = useSelectTransactionTagsById(
    parseInt(form.getValues("id")!),
    {}
  );

  useEffect(() => {
    if (transaction?.id) {
      transactionTagsForm.reset({
        transaction_tags: selectTransactionTags.data,
      });
    }
  }, [transaction, transactionTagsForm]);

  const transactionTagsField = useFieldArray<TransactionTagFormSchemaType>({
    control: transactionTagsForm.control,
    name: "transaction_tags",
  });

  if (selectTransactionTypes.isError) {
    return <div>Erro ao carregar os tipos de transação</div>;
  }

  if (selectTransactionTypes.isLoading || selectTags.isLoading) {
    return (
      <div className="w-full">
        <LoadingSpinner color="var(--foreground)" />
      </div>
    );
  }

  return (
    <>
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

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Descrição da transação"
                    {...field}
                    value={field.value ?? ""}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl className="flex flex-row items-stretch">
                  <Input
                    placeholder="R$ 0,00"
                    type="text"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value ? parseFloat(value) / 100 : 0);
                    }}
                    value={"R$ " + (field.value ?? 0)}
                    className="w-full self-stretch"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de transação</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o tipo de transação" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectTransactionTypes?.data?.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>
                        {type?.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-fit ml-auto"
            disabled={
              insertTransaction.isPending || updateTransaction.isPending
            }
          >
            {insertTransaction.isPending || updateTransaction.isPending
              ? "Carregando..."
              : transaction?.id
              ? "Salvar alterações"
              : "Cadastrar"}
          </Button>
        </form>
      </Form>
      <Form {...transactionTagsForm}>
        <form
          onSubmit={transactionTagsForm.handleSubmit(() => {})}
          className="flex gap-4 flex-col"
        >
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-md font-semibold">Adicionar rótulos</h2>
            <Button
              type="button"
              variant={"outline"}
              size={"icon"}
              className="ml-auto"
              onClick={() =>
                transactionTagsField.append({
                  tag_id: "",
                  transaction_id: form.getValues("id")!,
                  created_at: undefined,
                  id: undefined,
                })
              }
            >
              <Plus />
            </Button>
          </div>
          {transactionTagsField.fields.map((field, index) => (
            <FormField
              key={field.id}
              control={transactionTagsForm.control}
              name={`transaction_tags.${index}.tag_id`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o rótulo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectTags?.data?.map((tag) => (
                        <SelectItem key={tag.id} value={tag.id.toString()}>
                          {tag?.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </>
  );
}
