import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";

const authUser = create((set) => {
  return {
    user: null,
    loading: false,
    error: null,
    message: "",
    token: null,
    profilePic: null,
    coverPic: null,

    sendCode: async (email) => {
      set({ loading: true, error: null });

      try {
        let res = await axiosInstance.post("/auth/sendCode", { email });
        set({ message: res.data.message, error: null, loading: false });
        return { success: true };
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
        return { success: false };
      }
    },

    createUser: async (name, email, password, verificationCode, role) => {
      set({ loading: true, error: null });

      try {
        let res = await axiosInstance.post("/auth/register", {
          name,
          email,
          password,
          verificationCode,
          role,
        });
        set({
          user: res.data.user,
          token: res.data.token,
          message: res.data.message,
          error: null,
          loading: false,
        });
        localStorage.setItem("token", authUser.getState().token);
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    login: async (email, password) => {
      set({ loading: true, error: null });

      try {
        const res = await axiosInstance.post("/auth/login", {
          email,
          password,
        });
        set({
          user: res.data.user,
          message: res.data.message,
          loading: false,
          error: null,
        });
        localStorage.setItem("token", authUser.getState().token);
      } catch (error) {
        set({
          user: null,
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    profile: async () => {
      set({ loading: true, error: null });

      try {
        const res = await axiosInstance.get("/auth/profile");
        set({
          user: res.data.user,
          message: res.data.message,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.warn("User not logged in or session expired.");
        set({
          user: null,
          loading: false,
        });
      }
    },

    logout: async () => {
      set({ loading: true, error: null });

      try {
        const res = await axiosInstance.post("/auth/logout");
        set({
          user: null,
          error: null,
          loading: false,
          message: res.data.message,
        });
        localStorage.removeItem("token");
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    setProfile: (file) => set({ profilePic: file }),
    updateProfilePicture: async () => {
      try {
        const file = authUser.getState().profilePic;
        if (!file) {
          set({ error: "Image Not found" });
        }
        let formData = new FormData();
        formData.append("profilePic", file);

        set({ loading: true, error: null });

        const res = await axiosInstance.put(
          "/auth/updateProfilePicture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        set({
          user: res.data.user,
          loading: false,
          error: null,
          message: res.data.message,
        });
        return res;
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },
    setCover: (file) => set({ coverPic: file }),
    updateCoverPicture: async () => {
      try {
        const file = authUser.getState().coverPic;
        if (!file) {
          set({ error: "Image Not found" });
        }
        let formData = new FormData();
        formData.append("coverPic", file);

        set({ loading: true, error: null });

        const res = await axiosInstance.put(
          "/auth/updateCoverPicture",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        set({
          user: res.data.user,
          loading: false,
          error: null,
          message: res.data.message,
        });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    updateProfile: async (formData) => {
      try {
        set({ loading: true, error: null });

        const res = await axiosInstance.put("/auth/updateProfile", formData);
        set({ user: res.data.user, loading: false, message: res.data.message });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    updatePassword: async (oldPass, newPass) => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.put("/auth/updatePassword", {
          oldPass,
          newPass,
        });
        set({ message: res.data.message, loading: false });
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
      }
    },

    forgetPasswordCode: async (email) => {
      set({ loading: true, error: null });

      try {
        const res = await axiosInstance.post("/auth/sendForgetPassCode", {
          email,
        });
        set({ message: res.data.message, loading: false });
        return { success: true };
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
        return { success: false };
      }
    },

    forgetPassword: async (email, verificationCode, newPassword) => {
      set({ loading: true, error: null });
      try {
        const res = await axiosInstance.post("/auth/forgetPassword", {
          email,
          verificationCode,
          newPassword,
        });
        set({ message: res.data.message, loading: false });
        return { success: true };
      } catch (error) {
        set({
          error: error.response?.data?.message || error.message,
          loading: false,
        });
        return { success: false };
      }
    },

    resetMessage: () => set({ error: null, message: null }),
  };
});

export default authUser;
