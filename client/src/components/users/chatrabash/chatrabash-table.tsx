import useAuth from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, FileText, Settings } from "lucide-react";
import type { Chatrabash } from "@/types";
import { Link } from "react-router";

interface ChatrabashCardGridProps {
  data: Chatrabash[];
}

export default function ChatrabashTable({ data }: ChatrabashCardGridProps) {
  const { user } = useAuth();

  const patterns = [
    "bg-gradient-to-br from-blue-100 to-blue-200",
    "bg-gradient-to-br from-green-100 to-green-200",
    "bg-gradient-to-br from-purple-100 to-purple-200",
    "bg-gradient-to-br from-orange-100 to-orange-200",
    "bg-gradient-to-br from-pink-100 to-pink-200",
  ];

  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Data Found
        </h3>
        <p className="text-gray-500">
          Get started by creating your first chatrabash.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item: Chatrabash, index: number) => (
        <Link to={`/user/chatrabash/${item.id}`} key={item.id}>
          <Card className="relative group border-2 shadow-none hover:border-primary duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg ${patterns[index]} flex items-center justify-center`}
                  >
                    <div className="w-6 h-6 bg-white/30 rounded border border-white/20"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      {user?.role === "admin" && user?.id === item.ownerId && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">No URL specified</p>
                  </div>
                </div>
                <Link to={`/user/chatrabash/${item.id}/settings`}>
                  <Button variant="ghost" size="sm">
                    <Settings className="size-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="size-4" />
                  <span>{item.location}</span>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Free
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import ChatrabashDeleteAlert from "./chatrabash-delete-alert";
// import { PenSquare } from "lucide-react";
// import useAuth from "@/hooks/useAuth";
// import type { Chatrabash } from "@/types";

// export default function ChatrabashTable({
//   data,
//   onEdit,
//   onDeleteTrigger,
//   deleteId,
//   confirmDelete,
//   dialogOpen,
//   setDialogOpen,
// }: any) {
//   const { user } = useAuth();
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Name</TableHead>
//           <TableHead>Location</TableHead>
//           <TableHead>Description</TableHead>
//           <TableHead className="text-end">Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {data?.length === 0 ? (
//           <TableRow>
//             <TableCell colSpan={4} className="text-center">
//               No Data Found
//             </TableCell>
//           </TableRow>
//         ) : (
//           <>
//             {data.map((item: Chatrabash) => (
//               <TableRow key={item.id}>
//                 <TableCell>
//                   <div className="relative">
//                     {item.name}
//                     {user?.role === "admin" && user?.id === item.ownerId && (
//                       <span className="inline-block absolute size-2 bg-red-600 rounded-full"></span>
//                     )}
//                   </div>
//                 </TableCell>
//                 <TableCell>{item.location}</TableCell>
//                 <TableCell>{item.description || "-"}</TableCell>
//                 <TableCell>
//                   {user?.role === "admin" && user?.id === item.ownerId && (
//                     <div className="flex items-center justify-end gap-2">
//                       <Button size="sm" onClick={() => onEdit(item)}>
//                         <PenSquare className="size-[14px]" />
//                         Edit
//                       </Button>
//                       <ChatrabashDeleteAlert
//                         isOpen={dialogOpen && deleteId === item.id}
//                         onOpenChange={setDialogOpen}
//                         onDelete={() => confirmDelete(item.id)}
//                         trigger={() => onDeleteTrigger(item.id)}
//                       />
//                     </div>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </>
//         )}
//       </TableBody>
//     </Table>
//   );
// }
