import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const baseLink =
    "flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-colors";
  const inactive = "text-gray-400 hover:bg-gray-800 hover:text-white";
  const active = "bg-gray-800 text-white";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
          ${collapsed ? "w-20" : "w-[14rem]"}
          ${mobileOpen ? "left-0" : "-left-full"}
          md:left-0
        `}
      >
        <div className="flex flex-col h-full">
          
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

          
          <nav className="px-3 py-4 space-y-2 flex-1">
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
              <i className="fa-solid fa-gear"></i>
              {!collapsed && <span>Settings</span>}
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? active : inactive}`
              }
            >
              <i className="fa-solid fa-circle-question"></i>
              {!collapsed && <span>FAQ</span>}
            </NavLink>
          </nav>

          
          <div className="px-3 py-4 border-t border-gray-800">
            {user ? (
              <>
                
                <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300">
                  <i className="fa-solid fa-user-circle text-lg"></i>
                  {!collapsed && (
                    <div className="leading-tight">
                      <div className="font-medium text-white">
                        {user.name || "User"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  )}
                </div>

               
                <button
                  onClick={handleLogout}
                  className={`${baseLink} w-full text-red-400 hover:bg-red-500/10 hover:text-red-300`}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  {!collapsed && <span>Logout</span>}
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  <i className="fa-solid fa-right-to-bracket"></i>
                  {!collapsed && <span>Login</span>}
                </NavLink>

                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `${baseLink} ${isActive ? active : inactive}`
                  }
                >
                  <i className="fa-solid fa-user-plus"></i>
                  {!collapsed && <span>Register</span>}
                </NavLink>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
