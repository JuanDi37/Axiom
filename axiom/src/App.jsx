import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import "./styles/globals.css"; 

function App() {
  return (
    <BrowserRouter>
      <div id="bg-wrap">
        <div className="bg-scrim" />
      </div>

      <main className="ax-main">
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
