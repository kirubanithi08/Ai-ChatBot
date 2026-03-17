import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useChatContext } from "../../context/ChatContext";
import Modal from "../ui/Model";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";

export default function Sidebar() {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModal, setAuthModal]   = useState(null);

  const { user, logout } = useAuth();
  const { resetChat } = useChatContext();
  const navigate = useNavigate();

  const baseLink = "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200";
  const inactive = "text-gray-500 hover:bg-white/5 hover:text-gray-200";
  const active   = "bg-white/[0.08] text-white";

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">

      
      <div className="flex items-center px-3 py-3 border-b border-white/5 min-h-[52px] gap-2">

        
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg text-gray-500 hover:text-gray-200 hover:bg-white/8 transition-all shrink-0"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <i className={`fa-solid fa-arrow-${collapsed ? "right" : "left"} text-xs`} />
        </button>

        
        {!collapsed && (
          <span className="text-sm font-semibold text-gray-200 ml-1">
            Ai<span className="text-indigo-400">Chat</span>
          </span>
        )}

       
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden ml-auto w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
        >
          <i className="fa-solid fa-xmark text-sm" />
        </button>
      </div>

      
      <nav className="px-3 py-4 space-y-1 flex-1">
        <NavLink
          to="/"
          className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}
          onClick={() => { setMobileOpen(false); resetChat(); }}
        >
          <i className="fa-solid fa-plus w-4 text-center text-xs shrink-0" />
          {!collapsed && <span>New Chat</span>}
        </NavLink>

        <NavLink
          to="/faq"
          className={({ isActive }) => `${baseLink} ${isActive ? active : inactive}`}
          onClick={() => setMobileOpen(false)}
        >
          <i className="fa-solid fa-circle-question w-4 text-center text-xs shrink-0" />
          {!collapsed && <span>FAQ</span>}
        </NavLink>
      </nav>

      
      {!collapsed && (
        <div className="px-3 pb-3">
          <div className="rounded-xl bg-indigo-600/10 border border-indigo-500/20 px-3 py-3">
            <div className="flex items-start gap-2.5">
              <i className="fa-solid fa-circle-info text-indigo-400 text-xs mt-0.5 shrink-0" />
              <p className="text-xs text-indigo-300/80 leading-relaxed">
                First response may be slow — the server needs a moment to wake up on Render's free tier.
              </p>
            </div>
          </div>
        </div>
      )}

     
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        {user ? (
          <>
            <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 ${collapsed ? "justify-center" : ""}`}>
              <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-semibold">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              {!collapsed && (
                <div className="leading-tight min-w-0">
                  <div className="text-sm font-medium text-gray-200 truncate">{user.name || "User"}</div>
                  <div className="text-xs text-gray-500 truncate">{user.email}</div>
                </div>
              )}
            </div>
            <button
              onClick={handleLogout}
              className={`${baseLink} w-full text-red-400/80 hover:bg-red-500/10 hover:text-red-400`}
            >
              <i className="fa-solid fa-right-from-bracket w-4 text-center text-xs shrink-0" />
              {!collapsed && <span>Logout</span>}
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setAuthModal("login")} className={`${baseLink} ${inactive} w-full`}>
              <i className="fa-solid fa-right-to-bracket w-4 text-center text-xs shrink-0" />
              {!collapsed && <span>Login</span>}
            </button>
            <button onClick={() => setAuthModal("signup")} className={`${baseLink} ${inactive} w-full`}>
              <i className="fa-solid fa-user-plus w-4 text-center text-xs shrink-0" />
              {!collapsed && <span>Register</span>}
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0a0a0a] border-b border-white/5 shrink-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <i className="fa-solid fa-bars text-sm" />
        </button>
        <div id="mobile-topbar-right" />
      </div>

      
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      
      <aside className={`
        hidden md:flex flex-col h-screen
        bg-[#0a0a0a] text-white border-r border-white/5
        transition-all duration-300 ease-in-out
        ${collapsed ? "w-14" : "w-56"}
      `}>
        {sidebarContent}
      </aside>

      
      <aside className={`
        fixed top-0 left-0 h-full w-64 z-50
        bg-[#0a0a0a] text-white border-r border-white/5
        flex flex-col md:hidden
        transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {sidebarContent}
      </aside>

      
      <Modal open={!!authModal} onClose={() => setAuthModal(null)}>
        {authModal === "login"  && <Login  onSuccess={() => setAuthModal(null)} />}
        {authModal === "signup" && <Signup onSuccess={() => setAuthModal(null)} />}
      </Modal>
    </>
  );
}