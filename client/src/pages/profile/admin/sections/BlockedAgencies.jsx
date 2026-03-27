import React, { useEffect, useState } from "react";
import BlockedAgencyCard from "../components/BlockedAgencyCard";
import AdminState from "../../../../state/AdminState";

export default function BlockedAgencies() {
  const { getBlockedProfiles, blockedProfiles, unBlockProfile } = AdminState();
  const [unblockAgencyId, setUnblockAgencyId] = useState(null);
  const [isUnblocking, setIsUnblocking] = useState(false);

  const fetchBlockedProfile = async () => {
    await getBlockedProfiles();
  };

  useEffect(() => {
    fetchBlockedProfile();
    // eslint-disable-next-line
  }, []);

  const handleUnblock = async (id) => {
    await unBlockProfile(id);
    setIsUnblocking(false);
    setUnblockAgencyId(null);
    fetchBlockedProfile();
  };

  return (
    <div>
      {blockedProfiles &&
        blockedProfiles.map((profile) => (
          <BlockedAgencyCard
            key={profile.id}
            agency={profile}
            handleUnblock={handleUnblock}
            setUnblockAgencyId={setUnblockAgencyId}
            unblockAgencyId={unblockAgencyId}
            setIsUnblocking={setIsUnblocking}
            isUnblocking={isUnblocking}
          />
        ))}
    </div>
  );
}
