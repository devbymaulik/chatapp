import React, { useState } from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSigninRequestData } from "../../signin/redux/action";
import apiEndPoint from "../../../utils/apiList";

export default function Left() {
  const uploadUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.signinReducer);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const openProfile = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
    });
    setIsProfileOpen(true);
  };

  const closeProfile = () => setIsProfileOpen(false);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    if (formData.avatar instanceof File) {
      formPayload.append("avatar", formData.avatar);
    }
    try {
      const response = await axios.post(
        `${apiEndPoint.UPDATE_USER}`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      const updatedUser = response.data.data;
      dispatch(setSigninRequestData(updatedUser));
      setFormData({
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      });

      setIsProfileOpen(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error("Profile update failed!");
    }
  };

  return (
    <>
      {/* Left Panel: scrollable */}
      <div className="w-full bg-black text-gray-300 flex flex-col h-screen overflow-y-auto scrollbar-hide relative z-0">
        {/* Profile Header Section */}
        <div
          onClick={openProfile}
          className="flex items-center justify-between p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition-colors select-none"
          title="Click to update profile"
        >
          {/* Profile Image & Name */}
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2 overflow-hidden">
                <img
                  src={
                    formData.avatar instanceof File
                      ? URL.createObjectURL(formData.avatar)
                      : formData?.avatar
                      ? `${uploadUrl}/public${formData.avatar}`
                      : "https://i.pravatar.cc/150?img=12"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {formData.name || "Your Name"}
              </h2>
              <p className="text-sm text-gray-400">{formData.email}</p>
            </div>
          </div>

          {/* Logout Icon/Button */}
          <Logout />
        </div>

        {/* Search Bar */}
        <Search />

        {/* Divider */}
        <hr className="border-gray-700 my-1" />

        {/* Users List */}
        <Users />
      </div>

      {/* Modal: rendered outside the scrollable panel, fixed on screen */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeProfile}
        >
          <div
            className="bg-gray-900 rounded-lg w-full max-w-md p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-6 text-white text-center">
              Update Profile
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className="block text-gray-300 mb-2 font-medium"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label
                  className="block text-gray-300 mb-2 font-medium"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-gray-300 mb-2 font-medium"
                  htmlFor="avatar"
                >
                  Upload Avatar
                </label>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input file-input-bordered file-input-info w-full max-w-xs"
                />
                {formData.avatar instanceof File && (
                  <img
                    src={URL.createObjectURL(formData.avatar)}
                    alt="Preview"
                    className="mt-4 w-24 h-24 rounded-full object-cover border border-gray-600 mx-auto"
                  />
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeProfile}
                  className="px-5 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition text-gray-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
