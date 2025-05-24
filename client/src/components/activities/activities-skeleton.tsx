import { Skeleton } from "../ui/skeleton";

const ActivitiesSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex mb-6">
          <div className="mr-4 flex flex-col items-center">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="mt-2 h-full w-0.5 bg-muted" />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="w-full flex items-center justify-between gap-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesSkeleton;
