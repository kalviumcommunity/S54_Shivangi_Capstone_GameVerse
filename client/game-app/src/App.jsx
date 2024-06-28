import React from "react";
import "./App.css";
import AllRoutes from "./AllRoutes";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./Context/LoginContext";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        {/* Navigation bar */}
        {/* <NavBar /> */}

        {/* Routes */}
        <AllRoutes />

        {/* Footer */}
        {/* <Footer /> */}
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
