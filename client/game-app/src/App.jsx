import React from "react";
import "./App.css";
import AllRoutes from "./AllRoutes";
import { BrowserRouter } from "react-router-dom";
import LoginProvider from "./Context/LoginContext";

/**
 * This component is the root of the application. It sets up the LoginContext
 * and wraps all the routes in a BrowserRouter. It also includes a placeholder
 * for the navigation bar and a placeholder for the footer.
 *
 * @return {JSX.Element} The App component
 */
function App() {
  return (
    // Wrap all the routes in a LoginProvider and a BrowserRouter
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
