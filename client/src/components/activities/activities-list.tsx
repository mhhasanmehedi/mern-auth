import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import ActivitiesSkeleton from "./activities-skeleton";

type User = {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string;
};

type Activity = {
  id: number;
  action: string;
  detail: string;
  userId: number;
  created_at: string;
  user: User;
};

const ActivitiesList = () => {
  const { backendUrl, assetUrl } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get<Activity[]>(backendUrl + "/activity");
        setActivities(res.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch activity logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <ActivitiesSkeleton />;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  return (
    <div>
      {activities?.map((activity) => (
        <div key={activity.id} className="flex">
          <div className="mr-4 flex flex-col items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`${assetUrl}/${activity.user?.avatar}`}
                alt={activity.user.name}
              />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="mt-2 h-full w-0.5 bg-muted" />
          </div>
          <div className="flex flex-col gap-2 pb-8 flex-1">
            <div className=" w-full flex items-center justify-between gap-2">
              <div className="font-medium">{activity.user.name}</div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-muted-foreground">
                  {new Date(activity.created_at).toLocaleString()}
                </div>
                <Badge variant={"default"} className="rounded-full">
                  {activity.action}
                </Badge>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              {activity.detail}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesList;
