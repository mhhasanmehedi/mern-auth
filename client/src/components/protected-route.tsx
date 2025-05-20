import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (!loading && !user) {
    return navigate("/login");
  }

  return children;
};

export default ProtectedRoute;
