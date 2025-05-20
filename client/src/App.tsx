import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./screens/home";
import About from "./screens/about";
import NotFound from "./screens/not-found";
import Login from "./screens/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterPage from "./screens/register";
import GuestLayout from "./components/layouts/guest-layout";
import DashboardLayout from "./components/layouts/dashboard-layout";
import Dashboard from "./screens/dashboard";
import ProtectedRoute from "./components/protected-route";
import ActivityPage from "./screens/activities";
import UsersPage from "./screens/users";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/user/dashboard" element={<Dashboard />} />
          <Route path="/user/activities" element={<ActivityPage />} />
          <Route path="/user/users" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
