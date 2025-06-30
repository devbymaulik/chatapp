import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/dispatcher";

export default function Search() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);
    dispatch(getUser(q)); // Dispatch on every change
  };
  return (
    <div className="px-4 py-3">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center bg-slate-800 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition duration-300 focus-within:ring-2 focus-within:ring-blue-500">
          <IoSearch className="text-gray-400 text-xl mr-3" />
          <input
            value={query}
            onChange={handleSearch}
            type="text"
            placeholder="Search or start new chat"
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 outline-none"
          />
        </div>
      </form>
    </div>
  );
}
