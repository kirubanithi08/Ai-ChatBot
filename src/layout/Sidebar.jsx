
import { NavLink } from "react-router-dom";


export default function Sidebar() {
 
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">
            Ai<span>ChatBot</span>
          </h1>
        </div>

        <nav className="sidebar-nav">
          <ul>
           
            <li>
              <NavLink to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <i className="fa-solid fa-house"></i>
                New Chat
              </NavLink>
            </li>

            <li>
              <NavLink to="/settings" className="nav-link">
                <i className="fas fa-gamepad"></i>
                Settings
              </NavLink>
            </li>

             <li>
              <NavLink to="/faq" className="nav-link">
                <i className="fas fa-gamepad"></i>
                FAQ
              </NavLink>
            </li>

          </ul>
        </nav>

       
      </aside>

      
    </>
  );
}
