import React, { useEffect } from "react";
import TravelerState from "../../../../state/TravelerState";
import Booking from "../components/Booking";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faSuitcaseRolling,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function MyBookings({ bookings, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-xl font-semibold text-gray-600">
          <FontAwesomeIcon icon={faSuitcaseRolling} className="mr-2" />
          Loading your bookings...
        </h2>
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {bookings?.length === 0 ? (
        <div className="text-center p-6 bg-gray-50 rounded-lg shadow-md ">
          <h2 className="text-lg text-gray-700 mb-4">
            You don’t have any bookings yet.
          </h2>
          <Link
            onClick={() => console.log("Link Clicked")}
            to="/travels"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-all"
          >
            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
            Book Your First Trip
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map(
            (booking) =>
              booking.status === "Pending" && (
                <Booking booking={booking} key={booking._id} />
              )
          )}
        </div>
      )}
    </div>
  );
}
