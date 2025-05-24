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
    try {
      if (editData) {
        await axios.put(`${backendUrl}/chatrabash/${editData.id}`, data);
      } else {
        await axios.post(`${backendUrl}/chatrabash`, data);
      }
      setEditData(null);
      fetchData();
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  const handleEdit = (item: any) => {
    setEditData(item);
    setSheetOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${backendUrl}/chatrabash/${id}`);
      setDeleteId(null);
      setDialogOpen(false);
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <div className="p-6 bg-white border rounded w-full min-h-[calc(100vh_-_65px)]">
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
