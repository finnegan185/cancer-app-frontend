import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

// My Components
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CompetingSearch from "./components/CompetingSearch";
import AllTrials from "./components/AllTrials";
import theme from "./theme";

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/competing-search" element={<CompetingSearch />} />
          <Route path="/all-trials" element={<AllTrials />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
