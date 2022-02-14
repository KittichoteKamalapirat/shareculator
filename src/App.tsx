import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppContainer } from "./components/layouts/AppContainer";
import { Navbar } from "./components/layouts/Navbar";
import { Guide } from "./pages/Guide";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
