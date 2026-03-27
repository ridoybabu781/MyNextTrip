import React from "react";

export default function CompletedTripCard({ trip }) {
  return (
    <div className="border rounded-lg shadow-sm overflow-hidden max-w-sm bg-white">
      <div className="h-40 w-full bg-gray-100">
        {trip.thumbnail ? (
          <img
            src={trip.thumbnail}
            alt={trip.travel.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800">
          {trip.travel.title}
        </h3>
        <p className="text-sm text-slate-500">{trip.travel.location}</p>

        <div className="mt-2 text-sm text-slate-600">
          <p>{trip.tourDate.split("T")[0]}</p>
          <p>{trip.numberOfTraveler} Travelers</p>
          <p className="font-medium">
            {trip.totalPrice} {trip.currency || "USD"}
          </p>
        </div>
      </div>
    </div>
  );
}
