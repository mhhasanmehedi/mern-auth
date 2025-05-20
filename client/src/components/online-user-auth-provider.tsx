import React, { createContext, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import socket from "@/lib/socket";

export const OnlineUsersContext = createContext<number[]>([]);

export const OnlineUsersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [onlineUserIds, setOnlineUserIds] = useState<number[]>([]);

  useEffect(() => {
    if (user) {
      socket.emit("user-online", user.id);
    }

    socket.on("online-users", (ids: number[]) => {
      setOnlineUserIds(ids);
    });

    return () => {
      socket.off("online-users");
      // optional: socket.emit("user-offline", user?.id);
      // Don't disconnect here to keep socket singleton alive globally
    };
  }, [user]);

  return (
    <OnlineUsersContext.Provider value={onlineUserIds}>
      {children}
    </OnlineUsersContext.Provider>
  );
};
