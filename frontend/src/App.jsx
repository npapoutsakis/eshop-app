import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignForm from "./components/SignForm.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignForm />}></Route>
        <Route path="/products"></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
