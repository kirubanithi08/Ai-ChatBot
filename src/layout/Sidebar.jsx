import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors";
  const inactive = "text-gray-400 hover:bg-gray-800 hover:text-white";
  const active = "bg-gray-800 text-white";

  return (
    <>
      
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-black text-white">
        <span className="font-semibold">AiChatBot</span>
        <button onClick={() => setMobileOpen(true)}>
          <i className="fa-solid fa-bars text-lg"></i>
        </button>
      </div>

      
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      
      <aside
        className={`
          fixed md:static z-50
          h-screen bg-black text-white
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "left-0" : "-left-full"}
          md:left-0
        `}
      >
        
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
          {!collapsed && (
            <h1 className="text-lg font-bold">
              Ai<span className="text-indigo-400">ChatBot</span>
            </h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden md:block text-gray-400 hover:text-white"
          >
            <i
              className={`fa-solid ${
                collapsed ? "fa-chevron-right" : "fa-chevron-left"
              }`}
            ></i>
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden text-gray-400"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

       
        <nav className="px-3 py-4 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <i className="fa-solid fa-pen-to-square"></i>
            {!collapsed && <span>New Chat</span>}
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <i className="fa-solid fa-gear text-base"></i>
            {!collapsed && <span>Settings</span>}
          </NavLink>

          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? active : inactive}`
            }
          >
            <i className="fa-solid fa-circle-question text-base"></i>
            {!collapsed && <span>FAQ</span>}
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
