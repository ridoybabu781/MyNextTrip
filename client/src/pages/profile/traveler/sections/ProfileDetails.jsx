import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faEdit,
  faTimes,
  faUser,
  faBirthdayCake,
  faVenusMars,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import UserState from "../../../../state/UserState";

import background from "../../../../assets/images/background.jpg";

export default function ProfileDetails({ user }) {
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    birthDate: user.birthDate || "",
    age: user.age || "",
    gender: user.gender || "",
    phone: user.phone || "",
    address: user.address || "",
  });

  const {
    setProfile,
    setCover,
    updateProfilePicture,
    updateCoverPicture,
    updateProfile,
  } = UserState();

  const [profilePic, setProfilePic] = useState(user.profilePic || "");
  const [coverPhoto, setCoverPhoto] = useState(user.coverPic || background);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await setProfile(file);
      const res = await updateProfilePicture();
      const url = res?.data?.user?.profilePic || URL.createObjectURL(file);
      setProfilePic(url);
    }
  };
  const handleCoverPhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await setCover(file);
      const res = await updateCoverPicture();
      const url = res?.data?.user?.coverPic || URL.createObjectURL(file);
      setCoverPhoto(url);
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    await updateProfile(editData);
    setShowEdit(false);
  };

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="w-full md:w-3xl xl:w-7xl">
          <div
            className="w-full h-64 relative bg-cover bg-center bg-no-repeat shadow-lg rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `url(${coverPhoto})`,
            }}
          >
            <label className="absolute top-4 right-4 bg-white/80 hover:bg-white transition rounded-full p-3 shadow-lg cursor-pointer z-20 border border-gray-200">
              <FontAwesomeIcon icon={faCamera} className="text-gray-700" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverPhotoChange}
              />
            </label>
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none rounded-2xl" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-xl px-10 py-8 -mt-24 z-10 border border-gray-100">
            <div className="w-40 h-40 relative rounded-full shadow-xl border-4 border-white overflow-hidden flex-shrink-0 bg-gray-100">
              <img
                src={profilePic || ""}
                alt={editData.name}
                className="w-full h-full object-cover"
              />
              <label className="absolute right-2 bottom-2 bg-white/90 hover:bg-gray-100 transition rounded-full p-2 shadow cursor-pointer border border-gray-200">
                <FontAwesomeIcon icon={faCamera} className="text-gray-700" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePicChange}
                />
              </label>
            </div>
            <div className="ml-0 md:ml-10 mt-8 md:mt-0 flex-1 w-full">
              <div className="flex items-center gap-3">
                <h2 className="text-3xl font-bold text-gray-900">
                  {editData.name}
                </h2>
                <button
                  className="ml-2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 shadow"
                  onClick={() => setShowEdit(true)}
                  aria-label="Edit Profile"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
              <p className="text-gray-600 mt-2 text-lg">{editData.bio}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 text-gray-700">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    className="text-pink-400"
                  />
                  <span>
                    <span className="font-semibold">Birth Date:</span>{" "}
                    {editData.birthDate
                      ? new Date(editData.birthDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faUser} className="text-blue-400" />
                  <span>
                    <span className="font-semibold">Age:</span>{" "}
                    {editData.age || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    className="text-purple-400"
                  />
                  <span>
                    <span className="font-semibold">Gender:</span>{" "}
                    {editData.gender || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faPhone} className="text-green-400" />
                  <span>
                    <span className="font-semibold">Phone:</span>{" "}
                    {editData.phone || "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3 col-span-2">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="text-red-400"
                  />
                  <span>
                    <span className="font-semibold">Address:</span>{" "}
                    {editData.address || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm overflow-scroll">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative border border-gray-100">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setShowEdit(false)}
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              Edit Profile
            </h3>
            <form onSubmit={handleEditSave} className="space-y-5">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={editData.birthDate}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={editData.age}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  min={0}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Gender
                </label>
                <select
                  name="gender"
                  value={editData.gender}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={editData.phone}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleEditChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
