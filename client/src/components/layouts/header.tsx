import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import ToggleTheme from "@/components/ui/toggle-theme";

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-background  px-6 py-4 border-b flex justify-between items-center">
      <Link to={"/"} className="text-xl font-bold cursor-pointer">
        My App
      </Link>

      <div className=" flex items-center gap-4">
        {loading ? (
          <span>Loading...</span>
        ) : isAuthenticated && user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <Button onClick={handleLogout} variant={"outline"}>
              Logout
            </Button>
            <Link to="/user/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <Button variant={"outline"}>Register</Button>
            </Link>
            <Button onClick={handleLogin}>Login</Button>
          </>
        )}
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
