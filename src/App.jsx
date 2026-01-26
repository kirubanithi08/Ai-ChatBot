import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./layout/Sidebar";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import FAQ from "./pages/Faq";

function App() {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-4 ">
        <Routes>
          <Route
            path="/"
            element={
              <div className="h-full bg-gray-800 text-white rounded-lg">
                <Chat />
              </div>
            }
          />
          <Route
            path="/settings"
            element={
              <div className="h-full bg-gray-800 text-white rounded-lg">
                <Settings />
              </div>
            }
          />
          <Route
            path="/faq"
            element={
              <div className="h-full bg-gray-800 text-white rounded-lg">
                <FAQ />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
