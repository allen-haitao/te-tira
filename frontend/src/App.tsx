import React from "react";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, LogInPage, RegisterPage, DetailPage } from "./pages";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="detail/:touristRouteId/:other" element = {<DetailPage />} />
          <Route path="*" element = {<h1>404 not found Welcome to Mars</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;