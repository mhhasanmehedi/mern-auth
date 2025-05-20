import useAuth from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";

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
    <header className="w-full bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <Link to={"/"} className="text-xl font-bold cursor-pointer">
        My App
      </Link>

      <div className="flex items-center gap-4">
        {loading ? (
          <span>Loading...</span>
        ) : isAuthenticated && user ? (
          <>
            <span className="text-sm">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 font-semibold py-1 px-4 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-white text-blue-600 font-semibold py-1 px-4 rounded hover:bg-gray-100"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
