import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const TravelerState = create((set) => ({
  selectedSection: "bookings",
  bookings: [],
  loading: true,

  setSelectedSection: (section) => {
    set({ selectedSection: section });
  },
}));

export default TravelerState;
