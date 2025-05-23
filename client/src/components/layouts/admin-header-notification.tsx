import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popovar";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import io from "socket.io-client";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

interface Notification {
  id: string;
  userId: number;
  message: string;
  isRead: boolean;
  type: string;
  created_at: Date;
  updated_at: Date;
  user: User;
}

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const AdminHeaderNotification = () => {
  const { backendUrl } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/notifications`);

        setNotifications(res.data.notifications);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Listen for new notifications
    socket.on("notification", (notification) => {
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("notification");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications?.length > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white">
                {notifications?.length}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Notifications</h4>
              {notifications?.length > 0 && (
                <Button variant="ghost" size="sm">
                  Mark all as read
                </Button>
              )}
            </div>
          </div>
          <div className="max-h-80 overflow-auto">
            {notifications?.length > 0 ? (
              <>
                {notifications?.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-start gap-4 p-4 border-b"
                  >
                    <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                    <div>
                      <p className="text-sm font-medium">{notification.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(notification.created_at, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No new notifications
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default AdminHeaderNotification;
