import { createContext, useState } from "react";
import { axiosInstance } from "../Utils/Axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Loader, Rss } from "lucide-react";
export const AuthContext = createContext();
export const useAuth = () => {
  const [authUser, setAuthUser] = useState();
  const [isSigningUp, setIsSigningUp] = useState(null);
  const [isLogingIn, setIssLogingIn] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(null);
  const [isVerifingEmail, setIsVerifingEmail] = useState(false);
  const checkingAuth = async () => {
    setIsCheckingAuth(true);
    try {
      const res = await axiosInstance.get("/user", {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      setAuthUser(res.data);  
    } catch (error) {
      console.error("Error fetching user:", error);
      setAuthUser(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };
  
  
  const Register = async (data) => {
    setIsSigningUp(true);
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  const Login = async (data) => {
    setIssLogingIn(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);
      Cookies.set("access_token", res.data.access_token);
      if (res.data.is_verified === true) {
        toast.success("Logged in successfully");
        setAuthUser(res.data.user)
      } else {
        const resendToast = toast(
          () => (
            <span className="font-medium">
              Your Email Is Not Verified
              {isVerifingEmail ? (
                <Loader className="animate-spin" />
              ) : (
                <button onClick={() => VerifyEmail(resendToast)} className="link link-primary">
                  Resend Email Verification ?
                </button>
              )}
            </span>
          ),
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIssLogingIn(false);
    }
  };
  const VerifyEmail = async (resendToast) => {
    toast.dismiss(resendToast); 
    setIsVerifingEmail(true);
    const toastId = toast.loading("Sending Email Verification...", {
      autoClose: false, 
    });
    try {
      const res = await axiosInstance.post(
        "/auth/send-email-verification",
        {},
        {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      toast.success("Verification email sent!", { id: toastId });
      return res

    } catch (error) {
      toast.error(error.response.message, { id: toastId });

    } finally {
      setIsVerifingEmail(false);
    }
  };
  const Logout = async()=> {
    try {
        const res = await axiosInstance.post(
          "/auth/logout",
          {},
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          }
        );
        toast.success("Logged Out Successfully")
        setAuthUser(null)
        return res
      } catch (error) {
        toast.error(error.response.message)
      } 
  }

  return {
    authUser,
    isSigningUp,
    isLogingIn,
    isCheckingAuth,
    checkingAuth,
    Register,
    Login,
    Logout
  };
};

export default function AuthProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
