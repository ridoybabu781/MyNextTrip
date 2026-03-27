import { useEffect, useState } from "react";
import AdminState from "../../../../state/AdminState";
import AgencyCard from "../../../../components/user/AgencyCard";

export default function AllAgencies() {
  const { getAllAgencies, agencies } = AdminState();
  const [isLoading, setIsLoading] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blockAgencyId, setBlockAgencyId] = useState(null);
  const [deleteAgencyId, setDeleteAgencyId] = useState(null);

  const { blockProfile, deleteProfile } = AdminState();

  const findAgencies = async () => {
    const res = await getAllAgencies();
    if (res.status === 200 || res.status === 201) {
      setIsLoading(false);
      return;
    }
    console.log("Failed to fetch Agencies");
  };

  useEffect(() => {
    setIsLoading(true);
    findAgencies();
    setIsLoading(false);
  }, []);

  const handleBlock = async (id) => {
    await blockProfile(id);
    setIsBlocking(false);
    setBlockAgencyId(null);
    findAgencies();
  };
  const handleDelete = async (id) => {
    await deleteProfile(id);
    setIsDeleting(false);
    setDeleteAgencyId(null);
    findAgencies();
  };

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {agencies &&
        agencies.map((agency) => (
          <AgencyCard
            agency={agency}
            handleBlock={handleBlock}
            handleDelete={handleDelete}
            setIsBlocking={setIsBlocking}
            setIsDeleting={setIsDeleting}
            setBlockAgencyId={setBlockAgencyId}
            setDeleteAgencyId={setDeleteAgencyId}
            isBlocking={isBlocking}
            isDeleting={isDeleting}
            blockAgencyId={blockAgencyId}
            deleteAgencyId={deleteAgencyId}
          />
        ))}
    </div>
  );
}
