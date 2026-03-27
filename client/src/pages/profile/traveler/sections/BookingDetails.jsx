import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingStore from "../../../../state/BookingStore";

export default function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  const { getBooking } = BookingStore();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getBooking(id);
        if (res?.booking) {
          setBooking(res.booking);
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };
    fetchBooking();
  }, [id, getBooking]);

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Booking Details</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Tour Name</p>
          <p className="text-lg font-semibold">{booking.tourName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Tour Location</p>
          <p className="text-lg font-semibold">{booking.tourLocation}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Tour Date</p>
          <p className="text-lg font-semibold">
            {new Date(booking.tourDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Number of Travelers</p>
          <p className="text-lg font-semibold">{booking.numberOfTraveler}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Total Price</p>
          <p className="text-lg font-semibold">${booking.totalPrice}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Payment Method</p>
          <p className="text-lg font-semibold">
            {booking.paymentMethod || "N/A"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Payment Status</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : booking.paymentStatus === "Failed"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {booking.paymentStatus}
          </span>
        </div>

        <div>
          <p className="text-sm text-gray-500">Booking Status</p>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              booking.status === "Confirmed"
                ? "bg-green-100 text-green-700"
                : booking.status === "Cancelled"
                ? "bg-red-100 text-red-700"
                : booking.status === "Completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {booking.status}
          </span>
        </div>
      </div>
    </div>
  );
}
