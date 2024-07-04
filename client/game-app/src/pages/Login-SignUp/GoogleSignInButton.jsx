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

const GoogleSignInButton = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        username: result.user.email.split("@")[0],
        name: result.user.displayName,
        email: result.user.email,
        password: result.user.uid,
        avatar: result.user.photoURL,
      };
      const response = await axios.post(`${apiUrl}/api/users/google-auth`, userData);
      Cookies.set("token", response.data.token, { expires: 7 });
      setIsLoggedIn(true);
      toast.success(response.data.message, {
        autoClose: 3000,
        closeOnClick: true,
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 3000 });
    }
  };

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
