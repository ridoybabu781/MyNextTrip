import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const AdminState = create((set) => {
  return {
    agencies: [],
    message: "",
    error: null,
    selectedPortion: "profile",
    blockedProfiles: [],

    loading: false,

    setSelectedPortion: (portion) => {
      set((state) => ({
        selectedPortion: portion || state.selectedPortion,
      }));
    },

    getPendingAgencies: async () => {
      try {
        const result = await axiosInstance.get("/admin/getPendingAgencies");
        set({
          agencies: result.data.agencies,
          error: null,
          message: result.message,
        });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },
    approveAgency: async (id) => {
      try {
        const result = await axiosInstance.post(`/admin/approveAgency/${id}`);
        set({ error: null, message: result.message });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },
    rejectAgency: async (id) => {
      try {
        const result = await axiosInstance.post(`/admin/rejectAgency/${id}`);
        set({ error: null, message: result.message });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    getAllAgencies: async () => {
      try {
        const res = await axiosInstance.get("/admin/getAllAgencies");

        set({ agencies: res.data.agencies });
        return res;
      } catch (error) {
        set({
          user: null,
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },
    deleteProfile: async (id) => {
      try {
        const res = await axiosInstance.delete(`/admin/deleteProfile/${id}`);
        set({ message: res.data.message });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    blockProfile: async (id) => {
      try {
        const res = await axiosInstance.put(`/admin/blockProfile/${id}`);
        set({ message: res.data.message });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    unBlockProfile: async (id) => {
      try {
        const res = await axiosInstance.put(`/admin/unBlockProfile/${id}`);
        set({ message: res.data.message });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    getBlockedProfiles: async () => {
      try {
        const res = await axiosInstance.get(`/admin/getBlockedProfiles`);
        set({
          message: res.data.message,
          blockedProfiles: res.data.blockedProfiles || [],
        });
        return res;
      } catch (error) {
        set({
          blockedProfiles: [],
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },
  };
});

export default AdminState;
