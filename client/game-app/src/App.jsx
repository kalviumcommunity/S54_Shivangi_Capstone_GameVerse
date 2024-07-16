import React from "react";
import "./App.css";
import AllRoutes from "./AllRoutes";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./Context/LoginContext";
import { WindowWidthProvider } from "./Context/WindowWidthContext";

function App() {
  return (
    <WindowWidthProvider>
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
    </WindowWidthProvider>
  );
}

export default App;
