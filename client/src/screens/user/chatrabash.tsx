import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ChatrabashForm from "@/components/users/chatrabash/chatrabash-form";
import ChatrabashTable from "@/components/users/chatrabash/chatrabash-table";
import type { Chatrabash } from "@/types";

export default function ChatrabashPage() {
  const { backendUrl } = useAuth();
  axios.defaults.withCredentials = true;

  const [chatrabash, setChatrabash] = useState<Chatrabash[]>([]);
  const [editData, setEditData] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchData = async () => {
    const res = await axios.get(`${backendUrl}/chatrabash`);
    setChatrabash(res.data.chatrabash);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (data: any) => {
    if (editData) {
      await axios.put(`${backendUrl}/chatrabash/${editData.id}`, data);
    } else {
      await axios.post(`${backendUrl}/chatrabash`, data);
    }
    setEditData(null);
    fetchData();
  };

  const handleEdit = (item: any) => {
    setEditData(item);
    setSheetOpen(true);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${backendUrl}/chatrabash/${id}`);
    setDeleteId(null);
    setDialogOpen(false);
    fetchData();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Chatrabash List</h1>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              onClick={() => {
                setEditData(null);
              }}
            >
              <CirclePlus /> Create Chatrabash
            </Button>
          </SheetTrigger>
          <SheetContent className="p-6">
            <ChatrabashForm
              onSubmit={handleSubmit}
              initialData={editData}
              closeSheet={() => setSheetOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      <ChatrabashTable
        data={chatrabash}
        onEdit={handleEdit}
        onDeleteTrigger={(id: number) => {
          setDeleteId(id);
          setDialogOpen(true);
        }}
        deleteId={deleteId}
        confirmDelete={handleDelete}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
}
