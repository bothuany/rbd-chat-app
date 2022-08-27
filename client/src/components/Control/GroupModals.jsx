import React, { useState } from "react";
import { useEffect } from "react";
import GroupInformationModal from "./GroupInformationModal";
import GroupSettingsModal from "./GroupSettingsModal";

function GroupModals({
  isGroupSettingsOpen,
  onGroupSettingsOpen,
  onGroupSettingsClose,
  isGroupInfoOpen,
  onGroupInfoOpen,
  onGroupInfoClose,
  chat,
}) {
  const [members, setMembers] = useState(chat.users);

  useEffect(() => {
    setMembers(chat.users);
  }, [chat.users]);
  return (
    <>
      <GroupSettingsModal
        isOpen={isGroupSettingsOpen}
        onOpen={onGroupSettingsOpen}
        onClose={onGroupSettingsClose}
        chat={chat}
        members={members}
        setMembers={setMembers}
      />
      <GroupInformationModal
        isOpen={isGroupInfoOpen}
        onOpen={onGroupInfoOpen}
        onClose={onGroupInfoClose}
        chat={chat}
        members={members}
      />
    </>
  );
}

export default GroupModals;
