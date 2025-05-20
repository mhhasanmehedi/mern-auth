import { AuthContext } from "@/contexts/auth-context";
import { useContext } from "react";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used in within an authProvider");
  }
  return context;
};

export default useAuth;
