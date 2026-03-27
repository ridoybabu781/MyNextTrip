import React, { useEffect } from "react";
import BookingStore from "../../../../state/BookingStore";
import BookingCard from "../components/BookingCard";

export default function Bookings() {
  const { agenciesBookingsList, getAgenciesBookings, loading } = BookingStore();
  useEffect(() => {
    const fetchAgenciesBooking = async () => {
      await getAgenciesBookings();
    };
    fetchAgenciesBooking();
  }, []);

  if (loading) {
    return <>Loading</>;
  }

  return (
    <div>
      {agenciesBookingsList ? (
        <div>
          {agenciesBookingsList.map((booking) =>
            booking.status === "Completed" ? (
              <>No Booking Yet</>
            ) : (
              <BookingCard booking={booking} />
            )
          )}
        </div>
      ) : (
        <div>No Booking Here</div>
      )}
    </div>
  );
}
