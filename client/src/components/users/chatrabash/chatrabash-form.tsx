/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { Chatrabash } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  description: z.string().optional(),
});

type ChatrabashFormValues = z.infer<typeof formSchema>;

export default function ChatrabashForm({
  isEdit,
  editData,
  closeSheet,
}: {
  isEdit?: boolean;
  editData?: Chatrabash;
  closeSheet?: () => void;
}) {
  const { backendUrl } = useAuth();
  const form = useForm<ChatrabashFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: (isEdit && editData?.name) || "",
      location: (isEdit && editData?.location) || "",
      description: (isEdit && editData?.description) || "",
    },
  });

  const onSubmit = async (values: ChatrabashFormValues) => {
    try {
      if (editData) {
        const res = await axios.put(
          `${backendUrl}/chatrabash/${editData.id}`,
          values
        );
        toast.success(res.data.message);
      } else {
        await axios.post(`${backendUrl}/chatrabash`, values);
        closeSheet?.();
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update"
            : "Create"}
        </Button>
      </form>
    </Form>
  );
}
