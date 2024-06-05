import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import NewAccountPage from "./pages/NewAccountPage";
import TextAnalysePage from "./pages/TextAnalysePage";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<StartPage></StartPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/new-account"
          element={<NewAccountPage></NewAccountPage>}
        ></Route>
        <Route
          path="/text-analyse"
          element={<TextAnalysePage></TextAnalysePage>}
        ></Route>
      </Routes>

      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
