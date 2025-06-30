import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../signin/redux/dispatcher";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <button
      onClick={logout}
      aria-label="Logout"
      className="
        flex 
        items-center 
        justify-center 
        w-12 
        h-12 
        bg-red-600 
        hover:bg-red-700 
        rounded-full 
        text-white 
        shadow-md 
        transition 
        duration-300 
        ease-in-out 
        focus:outline-none 
        focus:ring-4 
        focus:ring-red-300
        focus:ring-opacity-50
        active:scale-95
        cursor-pointer
        ml-auto
        p-2
      "
      title="Logout"
      type="button"
    >
      <LuLogOut className="text-2xl" />
    </button>
  );
}
