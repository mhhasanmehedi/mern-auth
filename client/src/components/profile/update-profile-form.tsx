import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { ArrowUpRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import ChangesAlertModal from "./changes-alert-modal";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Phone number is too short"),
  address: z.string().min(5, "Address is too short"),
});

export default function UpdateProfileForm({
  handleEditChange,
}: {
  handleEditChange: () => void;
}) {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  const { backendUrl, loadUser } = useAuth();

  const { isDirty } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.put(`${backendUrl}/me/update`, values, {
        withCredentials: true,
      });
      toast.success("Profile updated");
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Something went wrong while updating.");
    } finally {
      await loadUser();
      handleEditChange();
    }
  };

  const handleCancelClick = () => {
    if (isDirty) {
      setShowModal(true);
    } else {
      handleEditChange();
    }
  };

  const handleConfirmDiscard = () => {
    setShowModal(false);
    handleEditChange();
  };

  return (
    <>
      <div className="max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                type="button"
                variant={"destructive"}
                onClick={handleCancelClick}
              >
                Cancel
                <X />
              </Button>
              <Button type="submit">
                Update Profile
                <ArrowUpRight />
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <ChangesAlertModal
        open={showModal}
        onConfirm={handleConfirmDiscard}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
