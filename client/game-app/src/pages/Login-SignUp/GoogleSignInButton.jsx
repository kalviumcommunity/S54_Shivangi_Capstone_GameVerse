import React, { useContext } from "react";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import Cookies from "js-cookie";
import axios from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Context/LoginContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilledBtn from "../../Components/ui/Buttons/FilledBtn";
import GoogleIcon from "../../assets/googleicon.png";

const auth = getAuth(app);

/**
 * GoogleSignInButton component for sign in with Google
 * @returns {JSX.Element} - React component
 */
const GoogleSignInButton = () => {
  // API URL
  const apiUrl = import.meta.env.VITE_API_URL;

  // Navigate hook
  const navigate = useNavigate();

  // Context hook
  const { setIsLoggedIn } = useContext(LoginContext);

  /**
   * Handles Google sign in
   * @returns {Promise<void>} - Promise that resolves when sign in is successful
   */
  const handleGoogleSignIn = async () => {
    // Create a new Google auth provider
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with popup
      const result = await signInWithPopup(auth, provider);

      // Prepare user data
      const userData = {
        username: result.user.email.split("@")[0],
        name: result.user.displayName,
        email: result.user.email,
        password: result.user.uid,
        avatar: result.user.photoURL,
      };

      // Send user data to the server for authentication
      const response = await axios.post(`${apiUrl}/api/users/google-auth`, userData);

      // Set token in cookies
      Cookies.set("token", response.data.token, { expires: 7 });

      // Set logged in state
      setIsLoggedIn(true);

      // Show success toast
      toast.success(response.data.message, {
        autoClose: 3000,
        closeOnClick: true,
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      // Show error toast
      toast.error(error.response.data.message, { autoClose: 3000 });
    }
  };

  // Render button
  return (
    <FilledBtn
      value="Continue with Google"
      action={handleGoogleSignIn}
      styles={{ margin: "20px auto", fontSize: "16px" }}
      imgSrc="https://img.icons8.com/ios-filled/50/FFFFFF/google-logo.png"
    />
  );
};

export default GoogleSignInButton;
