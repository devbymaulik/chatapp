import React from "react";
import Left from "./left/Left";
import Right from "./right/Right";

function Dashboard() {
  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Chat Area */}
      <div className="drawer-content flex flex-col">
        {/* Toggle button only for mobile */}
        <div className="p-2 bg-gray-900 lg:hidden">
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            ☰ Open Menu
          </label>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Right />
        </div>
      </div>

      {/* Sidebar (Left Panel) */}
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="min-h-full w-80 bg-gray-900 text-white border-r border-gray-800">
          <Left />
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
