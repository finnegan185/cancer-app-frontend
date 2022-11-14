import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

// My Components
import Header from "./components/Header";
import Home from "./components/Home";
import HeaderAlt from "./components/HeaderAlt";
import Footer from "./components/Footer";
import CompetingSearch from "./components/CompetingSearch";

function Main() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competing-search" element={<CompetingSearch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
