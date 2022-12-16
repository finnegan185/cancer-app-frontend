import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import Axios from "axios";
Axios.defaults.baseURL = process.env.BACKENDURL || "https://cancerappbackend.onrender.com";

// My Components
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
const CompetingSearch = React.lazy(() => import("./components/CompetingSearch"));
const AllTrials = React.lazy(() => import("./components/AllTrials"));
import theme from "./theme";
import LoadingDotsIcon from "./components/LoadingDotsIcon";

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<LoadingDotsIcon />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/competing-search" element={<CompetingSearch />} />
            <Route path="/all-trials" element={<AllTrials />} />
          </Routes>
        </Suspense>
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
