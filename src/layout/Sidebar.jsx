import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import Modal from "../components/Model";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const baseLink =
    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200";

  const inactive =
    "text-gray-400 hover:bg-white/5 hover:text-white";

  const active =
    "bg-white/10 text-white shadow-sm";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0f0f11] text-white border-b border-white/10">
        <span className="font-semibold tracking-wide">
          Ai<span className="text-indigo-400">Chat</span>
        </span>
        <button onClick={() => setMobileOpen(true)}>
          <i className="fa-solid fa-bars text-lg" />
        </button>
      </div>

      
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      
      <aside
        className={`
          fixed md:static z-50
          h-screen bg-[#0f0f11] text-white
          border-r border-white/10
          backdrop-blur-xl
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "left-0" : "-left-full"}
          md:left-0
        `}
      >
        <div className="flex flex-col h-full">

          
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            {!collapsed && (
              <h1 className="text-lg font-semibold tracking-wide">
                Ai<span className="text-indigo-400">Chat</span>
              </h1>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:block text-gray-400 hover:text-white transition"
            >
              <i
                className={`fa-solid ${
                  collapsed ? "fa-chevron-right" : "fa-chevron-left"
                }`}
              />
            </button>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden text-gray-400"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          
          <nav className="px-3 py-4 space-y-1 flex-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? active : inactive}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-pen-to-square w-5 text-center" />
              {!collapsed && <span>New Chat</span>}
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? active : inactive}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-gear w-5 text-center" />
              {!collapsed && <span>Settings</span>}
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `${baseLink} ${isActive ? active : inactive}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-circle-question w-5 text-center" />
              {!collapsed && <span>FAQ</span>}
            </NavLink>
          </nav>

          
          <div className="px-3 py-4 border-t border-white/10 space-y-2">
            {user ? (
              <>
                
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
                  <i className="fa-solid fa-user-circle text-xl text-indigo-400" />
                  {!collapsed && (
                    <div className="leading-tight">
                      <div className="text-sm font-medium">
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
                  className={`${baseLink} w-full text-red-400 hover:bg-red-500/10`}
                >
                  <i className="fa-solid fa-right-from-bracket w-5 text-center" />
                  {!collapsed && <span>Logout</span>}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setAuthModal("login")}
                  className={`${baseLink} ${inactive} w-full`}
                >
                  <i className="fa-solid fa-right-to-bracket w-5 text-center" />
                  {!collapsed && <span>Login</span>}
                </button>

                <button
                  onClick={() => setAuthModal("signup")}
                  className={`${baseLink} ${inactive} w-full`}
                >
                  <i className="fa-solid fa-user-plus w-5 text-center" />
                  {!collapsed && <span>Register</span>}
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      
      <Modal open={!!authModal} onClose={() => setAuthModal(null)}>
        {authModal === "login" && (
          <Login onSuccess={() => setAuthModal(null)} />
        )}
        {authModal === "signup" && (
          <Signup onSuccess={() => setAuthModal(null)} />
        )}
      </Modal>
    </>
  );
}
