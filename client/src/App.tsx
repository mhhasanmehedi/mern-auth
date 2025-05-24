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
import Dashboard from "./screens/user/dashboard";
import ProtectedRoute from "./components/protected-route";
import ActivityPage from "./screens/user/activities";
import UsersPage from "./screens/user/users";
import ProfilePage from "./screens/user/profile";
import ChatrabashPage from "./screens/user/chatrabash";
import ChatrabashOverviewPage from "./screens/user/chatrabash/overview";
import ChatrabashSettingPage from "./screens/user/chatrabash/settings";

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
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/chatrabash" element={<ChatrabashPage />} />
          <Route
            path="/user/chatrabash/:id"
            element={<ChatrabashOverviewPage />}
          />
          <Route
            path="/user/chatrabash/:id/settings"
            element={<ChatrabashSettingPage />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
