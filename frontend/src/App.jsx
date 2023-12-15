// import Keycloak from "keycloak-js";
// import { KeycloakProvider } from "keycloak-react-web";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignForm from "./components/SignForm.jsx";
import ProductPage from "./pages/ProductPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignForm />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
