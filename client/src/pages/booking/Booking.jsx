import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingStore from "../../state/BookingStore";
import TripState from "../../state/TripState";
import axiosInstance from "../../utils/axiosInstance";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addBooking } = BookingStore();
  const { getSingleTravel, travel } = TripState();

  const [numberOfTraveler, setNumberOfTraveler] = useState(1);
  const [tourDate, setTourDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) getSingleTravel(id);
  }, [id]);

  let travelPrice = (travel?.price || 0) * numberOfTraveler;

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!id) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await addBooking(id, {
        numberOfTraveler,
        tourDate,
        paymentMethod,
        totalPrice: travelPrice,
      });

      setMessage(res.message || "Booking successful!");
      console.log(res);

      if (paymentMethod === "cash") {
        return setTimeout(() => navigate("/my-bookings"), 1500);
      }

      if (res.redirectUrl) {
        const payRes = await axiosInstance.post(res.redirectUrl);
        if (payRes.data.url) {
          window.location.href = payRes.data.url;
        }
      }
    } catch (error) {
      setMessage(error?.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  //   console.log(new Date(Date.now()).toISOString().split("T")[0]);

  // Date.now() + for add - for less (in miliseconds) .

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
        {travel ? (
          <>
            <h1 className="text-2xl font-bold mb-4">{travel.title}</h1>
            <p className="text-gray-600 mb-2">📍 {travel.location}</p>
            <p className="text-gray-600 mb-4">
              💵 Price per person: ${travel.price}
            </p>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Tour Date
                </label>
                <input
                  type="date"
                  value={tourDate}
                  min={
                    new Date(Date.now() + 86400000).toISOString().split("T")[0]
                  }
                  max={
                    new Date(Date.now() + 86400000 * 10)
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) => setTourDate(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Number of Travelers
                </label>
                <input
                  type="number"
                  min="1"
                  value={numberOfTraveler}
                  onChange={(e) => setNumberOfTraveler(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
                >
                  <option value="cash">Cash</option>
                  <option value="sslcommerz">SSLCommerz</option>
                </select>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg text-gray-800 font-medium">
                Total Price: ${travelPrice}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-sm font-medium text-green-600">
                {message}
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Loading travel details...</p>
        )}
      </div>
    </div>
  );
}
