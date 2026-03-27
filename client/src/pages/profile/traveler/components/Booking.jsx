import {
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Booking({ booking }) {
  return (
    <div className="max-w-md w-full bg-white border rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800">
        {booking.tourName}
      </h2>

      <p className="flex items-center text-sm text-gray-500 mt-1">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-blue-500" />
        {booking.tourLocation}
      </p>

      <p className="flex items-center text-sm text-gray-600 mt-1">
        <FontAwesomeIcon
          icon={faCalendarAlt}
          className="mr-2 text-emerald-500"
        />
        {new Date(booking.tourDate).toLocaleDateString()}
      </p>

      <div className="mt-3">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            booking.status === "Cancelled"
              ? "bg-red-100 text-red-700"
              : booking.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : booking.status === "Confirmed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <div className="mt-4">
        <Link
          to={`/bookings/${booking._id}`}
          className="inline-block text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
