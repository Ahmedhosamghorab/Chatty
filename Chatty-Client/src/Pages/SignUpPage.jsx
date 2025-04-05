import { Loader, MessageSquare } from "lucide-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Hooks/useAuth";
import toast from "react-hot-toast";
function SignUpPage() {
  const { isSigningUp , Register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    } else if (!validateEmail(formData.email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    } else if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    Register(formData)
    .then(() => {
      setFormData({ name: "", email: "", password: "" });
    })
    .catch((error) => {
      toast.error("Failed to create account.");
      console.error(error);
    });  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side */}
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-[100%]">
          <div className="p-5 bg-primary/25 rounded-2xl transition-colors backdrop-blur-3xl">
          <MessageSquare className="text-primary"/>
          </div>
          <div className="flex flex-col justify-center items-center group mb-1.5">
            <h1 className="text-2xl">Create Account</h1>
            <p className="text-base-content/60">Lorem ipsum dolor sit amet.</p>
          </div>
          <form className="flex flex-col w-[50%]" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-[100%] focus:outline-none"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="text"
                name="email"
                className="input input-bordered w-[100%] focus:outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-[100%] focus:outline-none"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSigningUp}
            >
              {isSigningUp ? <Loader className="animate-spin" /> : "Create Account"}
            </button>
          </form>
          <div className="text-center mt-3">
            <p className="text-base-content/60">
              Already Have Account? <Link className="link link-primary" to={"/login"}>Signin</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex justify-center items-center mx-2.5">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-semibold">Join Us</h1>
          <p className="text-lg text-base-content/60 mt-3 text-center">
            Join us to connect with your friends and experience the best chat
            app out there. Stay connected, stay engaged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
