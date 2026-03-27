import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingStore from "../../state/BookingStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Success() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { getBooking } = BookingStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      const res = await getBooking(id);
      setBooking(res.booking);
    };
    fetchBooking();
  }, [id, getBooking]);

  if (!booking) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-medium">
        Loading booking details...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 text-6xl"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed. Thank you for choosing us!
        </p>

        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left space-y-1">
          <p className="font-semibold text-gray-800">
            Tour: <span className="font-normal">{booking.tourName}</span>
          </p>
          <p className="font-semibold text-gray-800">
            Location:{" "}
            <span className="font-normal">{booking.tourLocation}</span>
          </p>
          <p className="font-semibold text-gray-800">
            Date: <span className="font-normal">{booking.tourDate}</span>
          </p>
          <p className="font-semibold text-gray-800">
            Travelers:{" "}
            <span className="font-normal">{booking.numberOfTraveler}</span>
          </p>
          <p className="font-semibold text-gray-800">
            Total Paid:{" "}
            <span className="font-normal">৳ {booking.totalPrice}</span>
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            <i className="fas fa-home mr-2"></i> Homepage
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-800"
          >
            <i className="fas fa-user mr-2"></i> Profile
          </button>
        </div>
      </div>
    </div>
  );
}
