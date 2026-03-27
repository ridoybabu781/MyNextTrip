import { useEffect, useState } from "react";
import BookingStore from "../../../../state/BookingStore";
import CompletedTripCard from "../components/CompletedTripCard";

export default function FinishedTravels() {
  const { agencyFinishedTravel } = BookingStore();

  const [completedTrips, setCompletedTrips] = useState([]);

  useEffect(() => {
    const fetchFinishedTravels = async () => {
      const res = await agencyFinishedTravel();
      setCompletedTrips(res.finishedTravels);
      console.log(res);
    };
    fetchFinishedTravels();
  }, []);

  if (completedTrips.length === 0) {
    return <div>No Trip Found</div>;
  }
  return (
    completedTrips.length > 0 &&
    completedTrips.map((trip) => (
      <CompletedTripCard key={trip._id} trip={trip} />
    ))
  );
}
