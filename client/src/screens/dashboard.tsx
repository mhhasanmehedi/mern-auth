"use client";

import { Smile } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import InteractiveGrid from "@/components/ui/interactive-grid";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <InteractiveGrid>
      <div className="p-6 w-full min-h-[calc(100vh_-_65px)]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
              Welcome back, {user?.name || "User"}!
            </h1>
            <p className="mt-1 text-sm md:text-base text-gray-600">
              We’re glad to see you again. Let’s make today productive.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center bg-gray-100 rounded-full p-4">
            <Smile className="w-10 h-10 text-indigo-500" />
          </div>
        </div>
      </div>
    </InteractiveGrid>
  );
};

export default Dashboard;
