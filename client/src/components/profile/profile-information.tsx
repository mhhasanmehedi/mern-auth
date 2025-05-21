import useAuth from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const ProfileInformation = () => {
  const { user } = useAuth();
  return (
    <ul className="space-y-5">
      <li className="grid grid-cols-[120px_auto]">
        <span>Name</span>
        <span>{user?.name}</span>
      </li>
      <li className="grid grid-cols-[120px_auto]">
        <span>Email</span>
        <span>{user?.email}</span>
      </li>
      <li className="grid grid-cols-[120px_auto]">
        <span>Address</span>
        <span>{user?.address || "-"}</span>
      </li>
      <li className="grid grid-cols-[120px_auto]">
        <span>Phone</span>
        <span>{user?.phone || "-"}</span>
      </li>
      <li className="grid grid-cols-[120px_auto]">
        <span>Role</span>
        <div>
          <Badge variant={"outline"} className="rounded-full">
            {user?.role}
          </Badge>
        </div>
      </li>
      <li className="grid grid-cols-[120px_auto]">
        <span>Join Date</span>
        <div>
          <Badge variant={"outline"} className="rounded-full">
            {user?.created_at && format(user?.created_at, "dd MMM yyyy")}
          </Badge>
        </div>
      </li>
    </ul>
  );
};

export default ProfileInformation;
