import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignForm from "./components/SignForm.jsx";
import CustomerPage from "./pages/CustomerPage.jsx";
import SellerPage from "./pages/SellerPage.jsx";
import PrivateRoute from "./security/PrivateRoute.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignForm />} />
        <Route
          path="/customer/*"
          element={
            <PrivateRoute requiredRole="Customer">
              <CustomerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/seller/*"
          element={
            <PrivateRoute requiredRole="Seller">
              <SellerPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
