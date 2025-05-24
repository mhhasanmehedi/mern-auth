import { useParams } from "react-router";
import PanelHeader from "@/components/shared/panel-header";
import ChatrabashDelete from "@/components/users/chatrabash/chatrabash-delete";
import ChatrabashEdit from "@/components/users/chatrabash/chatrabash-edit";

const ChatrabashSettingPage = () => {
  const { id } = useParams();

  if (!id || !parseInt(id)) {
    return <div>No Chatrabash Id</div>;
  }

  return (
    <div>
      <PanelHeader
        title="Settings"
        description="Configure the settings for this chatrabash"
      />
      <div className="grid gap-6">
        <ChatrabashEdit chatrabashId={parseInt(id)} />
        <ChatrabashDelete chatrabashId={parseInt(id)} />
      </div>
    </div>
  );
};

export default ChatrabashSettingPage;
