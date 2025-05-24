/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import PanelHeader from "@/components/shared/panel-header";
import ChatrabashDeleteAlert from "./chatrabash-delete-alert";

const ChatrabashDelete = ({ chatrabashId }: { chatrabashId: number }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { backendUrl } = useAuth();

  //   Handle Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/chatrabash/${chatrabashId}`);
      setDialogOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="p-5 border rounded-xl">
      <PanelHeader
        title="Danger Zone"
        description="The following actions are destructive and cannot be reversed."
      />

      <ChatrabashDeleteAlert
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        onDelete={() => handleDelete()}
      />
    </div>
  );
};

export default ChatrabashDelete;
