import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";

export default function Canceled() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faBan} className="text-yellow-500 text-6xl" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Canceled 🚫
        </h2>
        <p className="text-gray-600 mb-6">
          You canceled the payment process. No money was deducted.
        </p>

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
