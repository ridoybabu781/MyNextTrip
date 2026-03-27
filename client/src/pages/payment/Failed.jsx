import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default function Failed() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="text-red-500 text-6xl"
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed ❌
        </h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please try again.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            <i className="fas fa-home mr-2"></i> Homepage
          </button>
          <button
            onClick={() => navigate("/payment/retry")}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700"
          >
            <i className="fas fa-redo mr-2"></i> Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
}
