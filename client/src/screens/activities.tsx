import ActivitiesSkeleton from "@/components/activities/activities-skeleton";
import { lazy, Suspense } from "react";
const ActivitiesList = lazy(
  () => import("@/components/activities/activities-list")
);

export default function ActivityPage() {
  return (
    <div className="bg-white p-6 min-h-[calc(100vh_-_65px)]">
      <h2 className="text-2xl font-bold mb-6">Activity Log</h2>
      <Suspense fallback={<ActivitiesSkeleton />}>
        <ActivitiesList />
      </Suspense>
    </div>
  );
}
