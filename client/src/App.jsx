import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./state/UserState";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import ForgetPass from "./pages/auth/ForgetPass";
import Travels from "./pages/travels/Travels";
import SingleTravel from "./components/travels/SingleTravel";
import BookingDetails from "./pages/profile/traveler/sections/BookingDetails";
import BookingPage from "./pages/booking/Booking";
import Success from "./pages/Payment/Success";
import Failed from "./pages/payment/Failed";
import Canceled from "./pages/payment/Canceled";

export default function App() {
  const { user, profile, logout } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      await profile();
      setLoading(false);
    };
    getProfile();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-300">
      <BrowserRouter>
        <>
          <Navbar user={user} logout={logout} />
          <Routes>
            <Route
              path="/login"
              element={user ? <Navigate to={"/"} /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to={"/"} /> : <Signup />}
            />
            <Route path="/forgetPass" element={<ForgetPass />} />
            <Route path="/" element={<Home />} />
            <Route path={`/travels`} element={<Travels />}></Route>
            <Route path="/travels/:id" element={<SingleTravel />} />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to={"/login"} />}
            />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/payment/success/:id" element={<Success />} />
            <Route path="/payment/failed/:id" element={<Failed />} />
            <Route path="/payment/canceled/:id" element={<Canceled />} />
          </Routes>
        </>
      </BrowserRouter>
    </div>
  );
}
