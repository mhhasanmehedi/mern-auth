import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ChatrabashDeleteAlert from "./chatrabash-delete-alert";
import { PenSquare } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import type { Chatrabash } from "@/types";

export default function ChatrabashTable({
  data,
  onEdit,
  onDeleteTrigger,
  deleteId,
  confirmDelete,
  dialogOpen,
  setDialogOpen,
}: any) {
  const { user } = useAuth();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-end">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No Data Found
            </TableCell>
          </TableRow>
        ) : (
          <>
            {data.map((item: Chatrabash) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative">
                    {item.name}
                    {user?.role === "admin" && user?.id === item.ownerId && (
                      <span className="inline-block absolute size-2 bg-red-600 rounded-full"></span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.description || "-"}</TableCell>
                <TableCell>
                  {user?.role === "admin" && user?.id === item.ownerId && (
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" onClick={() => onEdit(item)}>
                        <PenSquare className="size-[14px]" />
                        Edit
                      </Button>
                      <ChatrabashDeleteAlert
                        isOpen={dialogOpen && deleteId === item.id}
                        onOpenChange={setDialogOpen}
                        onDelete={() => confirmDelete(item.id)}
                        trigger={() => onDeleteTrigger(item.id)}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </>
        )}
      </TableBody>
    </Table>
  );
}
