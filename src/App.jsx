import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import Sidebar from "./components/layout/Sidebar";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import FAQ from "./pages/Faq";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        
        <div className="flex flex-col md:flex-row h-screen bg-[#0a0a0a] overflow-hidden">

          <Sidebar />

         
          <main className="flex-1 overflow-hidden flex flex-col min-w-0 bg-[#111111]">
            <Routes>
              <Route path="/"         element={<Chat />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/faq"      element={<FAQ />} />
            </Routes>
          </main>

        </div>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;