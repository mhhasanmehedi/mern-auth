import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  last_login?: string | null;
  avatar?: string | null;
  phone?: string | null;
  address?: string | null;
  created_at: string;
  updated_at: string;
}

export default function UsersPage() {
  const { backendUrl, assetUrl } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/users`);
        // const res = await fetch(
        //   `${backendUrl}/users?page=${page}&limit=${pageSize}`
        // );
        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  return (
    <div className="bg-white dark:bg-black border rounded p-6 min-h-[calc(100vh_-_100px)]">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6" />
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Is Online</TableHead>
                <TableHead className="text-right">Join Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        {user?.avatar && (
                          <AvatarImage
                            src={`${assetUrl}/${user?.avatar}`}
                            alt="User"
                          />
                        )}
                        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {user.name}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "-"}</TableCell>
                  <TableCell>
                    <Badge className="rounded-full" variant={"outline"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.last_login &&
                      format(new Date(user.last_login), "dd MMM yyyy, hh:mm a")}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">
                    {format(user.created_at, "dd MMM yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <DataTablePagination
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
              totalItems={100} // Replace with actual total from backend
            /> */}
        </>
      )}
    </div>
  );
}
