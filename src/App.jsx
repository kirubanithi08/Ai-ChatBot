import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./layout/Sidebar";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import FAQ from "./pages/Faq";

function App() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      <Sidebar />

      <main className="flex-1 p-6 overflow-hidden bg-[#0f0f11]">
        
        <div className="h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>

        </div>

      </main>

    </div>
  );
}

export default App;
