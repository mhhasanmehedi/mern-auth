import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SquarePen, X } from "lucide-react";
import UpdateProfileForm from "@/components/profile/update-profile-form";
import ProfileInformation from "@/components/profile/profile-information";

const ProfilePage = () => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditChange = () => {
    setIsEdit((prev) => !prev);
  };
  return (
    <Card className="p-4">
      <CardContent>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">
            {isEdit ? "Edit Profile" : "Profile Information"}
          </h1>
          <Button
            onClick={() => handleEditChange()}
            variant={isEdit ? "destructive" : "default"}
          >
            {isEdit ? (
              <X className="size-4" />
            ) : (
              <SquarePen className="size-4" />
            )}
            {isEdit ? "Cancel" : "Edit"}
          </Button>
        </div>
        {isEdit ? (
          <UpdateProfileForm handleEditChange={handleEditChange} />
        ) : (
          <ProfileInformation />
        )}
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
