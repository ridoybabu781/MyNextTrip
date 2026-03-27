import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const BookingStore = create((set) => {
  return {
    myBookings: [],
    agenciesBookingsList: [],
    loading: true,
    message: "",

    addBooking: async (bookingId, data) => {
      try {
        const res = await axiosInstance.post(
          `/booking/addBooking/${bookingId}`,
          data
        );

        set({ message: res?.data?.message });
        return res.data;
      } catch (error) {
        console.log(error);
        set({
          loading: false,
          message: error.response.data.message || error.message,
        });
      }
    },
    getMyBookings: async () => {
      try {
        set({ loading: true });
        const res = await axiosInstance.get("/booking/myBookings");
        set({ myBookings: res.data.myBookings || [], loading: false });
        return res;
      } catch (error) {
        console.log(error);
        set({ loading: false });
      }
    },
    getAgenciesBookings: async () => {
      try {
        set({ loading: true });
        const res = await axiosInstance.get("/booking/getAgencyBookings");
        set({
          agenciesBookingsList: res.data.agencyBookings || [],
          loading: false,
        });

        return res;
      } catch (error) {
        console.log(error);
        set({ loading: false });
      }
    },
    updateBooking: async (status, id) => {
      try {
        const res = axiosInstance.put(`/booking/updateBooking/${id}`, {
          status,
        });
        return res;
      } catch (error) {
        console.log(error);
      }
    },
    getBooking: async (id) => {
      try {
        const res = await axiosInstance.get(`/booking/getBooking/${id}`);
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
    agencyFinishedTravel: async () => {
      try {
        const res = await axiosInstance.get("/booking/agencyFinishedTravel");

        return res.data;
      } catch (error) {
        return error.response.data.message || error;
      }
    },
  };
});

export default BookingStore;
