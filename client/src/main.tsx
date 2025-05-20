import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "@/contexts/auth-context.tsx";
import { OnlineUsersProvider } from "./components/online-user-auth-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <OnlineUsersProvider>
        <App />
      </OnlineUsersProvider>
    </AuthProvider>
  </StrictMode>
);
