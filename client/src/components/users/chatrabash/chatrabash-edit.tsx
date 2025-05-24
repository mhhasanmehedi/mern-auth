/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import type { Chatrabash } from "@/types";
import { useEffect, useState } from "react";
import PanelHeader from "@/components/shared/panel-header";
import ChatrabashForm from "./chatrabash-form";
import { Skeleton } from "@/components/ui/skeleton";

const ChatrabashEdit = ({ chatrabashId }: { chatrabashId: number }) => {
  const { backendUrl } = useAuth();
  const [loading, setLoading] = useState(false);
  const [chatrabash, setChatrabash] = useState<Chatrabash | null>(null);

  //   Handle Delete
  const fetchChatrabash = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/chatrabash/${chatrabashId}`);
      setChatrabash(res.data.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatrabash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;

  if (loading) {
    content = (
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-9" />
        </div>
        <div className="space-y-1.5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-20" />
        </div>
        <Skeleton className="h-9 w-32" />
      </div>
    );
  }

  if (chatrabash) {
    content = <ChatrabashForm isEdit={true} editData={chatrabash} />;
  }

  return (
    <div className="p-5 border rounded-xl">
      <PanelHeader
        title="General"
        description="Adjust your chatrabash general information"
      />
      {content}
    </div>
  );
};

export default ChatrabashEdit;
