import React, { useState } from "react";
import BookingStore from "../../../../state/BookingStore";

export default function BookingCard({ booking }) {
  const { updateBooking } = BookingStore();
  const [bookingStatus, setBookingStatus] = useState(
    booking.status || "Pending"
  );

  const handleUpdate = async (status) => {
    const res = await updateBooking(status, booking._id);
    if (res.status === 400 || res.status === 401) {
      console.error(res.data.message);
      return;
    }
    setBookingStatus(status);
  };

  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-5 border">
      <h2 className="text-xl font-semibold text-gray-800">
        {booking.tourName}
      </h2>
      <p className="text-sm text-gray-500 mb-3">{booking.tourLocation}</p>

      {/* Info */}
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Travelers:</span>{" "}
          {booking.numberOfTraveler}
        </p>
        <p>
          <span className="font-medium">Date:</span>{" "}
          {new Date(booking.tourDate).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Total Price:</span> ৳
          {booking.totalPrice}
        </p>
      </div>

      {/* Payment */}
      <div className="mt-4 space-y-1 text-sm">
        <p>
          <span className="font-medium">Payment Method:</span>{" "}
          {booking.paymentMethod}
        </p>
        <p>
          <span className="font-medium">Payment Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded text-xs ${
              booking.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : booking.paymentStatus === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {booking.paymentStatus}
          </span>
        </p>
      </div>

      <div className="mt-4">
        <span className="font-medium text-sm">Status:</span>{" "}
        <span
          className={`ml-2 px-2 py-1 rounded text-xs ${
            bookingStatus === "Confirmed"
              ? "bg-green-100 text-green-700"
              : bookingStatus === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : bookingStatus === "Completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {bookingStatus}
        </span>
      </div>

      <div className="mt-4 flex gap-3">
        {bookingStatus === "Pending" && (
          <>
            <button
              onClick={() => handleUpdate("Confirmed")}
              className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => handleUpdate("Cancelled")}
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </>
        )}

        {bookingStatus === "Confirmed" && (
          <>
            <button
              onClick={() => handleUpdate("Completed")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            >
              Completed
            </button>
            <button
              onClick={() => handleUpdate("Cancelled")}
              className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
            >
              Cancel
            </button>
          </>
        )}

        {bookingStatus === "Completed" && (
          <button
            disabled
            className="px-4 py-2 rounded-lg bg-gray-400 text-white text-sm cursor-not-allowed"
          >
            Completed
          </button>
        )}

        {bookingStatus === "Cancelled" && (
          <button
            disabled
            className="px-4 py-2 rounded-lg bg-gray-400 text-white text-sm cursor-not-allowed"
          >
            Cancelled
          </button>
        )}
      </div>
    </div>
  );
}
