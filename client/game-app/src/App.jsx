import React from "react";
import "./App.css";
import AllRoutes from "./AllRoutes";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./Context/LoginContext";

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        {/* Navigation bar */}
        {/* <NavBar /> */}

        {/* Routes */}
        <AllRoutes />

        {/* Footer */}
        {/* <Footer /> */}
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
