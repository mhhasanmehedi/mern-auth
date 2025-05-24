/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ChatrabashForm from "@/components/users/chatrabash/chatrabash-form";
import ChatrabashTable from "@/components/users/chatrabash/chatrabash-table";
import type { Chatrabash } from "@/types";
import { toast } from "react-toastify";
import PanelHeader from "@/components/shared/panel-header";

export default function ChatrabashPage() {
  const { backendUrl } = useAuth();
  axios.defaults.withCredentials = true;

  const [chatrabash, setChatrabash] = useState<Chatrabash[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/chatrabash`);
      setChatrabash(res.data.chatrabash);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PanelHeader
        title="Chatrabash List"
        description={"Manage your chatrabash"}
      >
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button>
              <CirclePlus /> Create Chatrabash
            </Button>
          </SheetTrigger>
          <SheetContent className="p-6">
            <ChatrabashForm closeSheet={() => setSheetOpen(false)} />
          </SheetContent>
        </Sheet>
      </PanelHeader>

      <ChatrabashTable data={chatrabash} />
    </>
  );
}
