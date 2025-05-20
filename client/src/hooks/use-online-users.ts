import { OnlineUsersContext } from "@/components/online-user-auth-provider";
import { useContext } from "react";

export const useOnlineUsers = () => useContext(OnlineUsersContext);
