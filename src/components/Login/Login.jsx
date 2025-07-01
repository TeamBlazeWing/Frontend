import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!email) tempErrors.email = "Email is required";
    if (!password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlefogetpassword = () => {
    navigate("/forgetpassword");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();

      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
  
      if (response.ok) {
        // Assuming the server sends a token or success status
        alert("Signup successful! Redirecting to dashboard...");
        setTimeout(() => navigate("/dashboard"), 1000);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", email);
      } else {
        // Handle login failure (e.g., wrong email/password)
        setErrors({ general: data.message || "Invalid email or password" });
      }
    } catch (error) {
      setErrors({ general: "Invalid eamil or password" });
      console.error("Login error:", error);
    }
  };

  const handleSignupNavigate = () => {
    navigate("/signup");
  };

  return (
    <section className="bg-gray-50 dark:bg-black h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-black dark:border-gray-700">
          <div className="p-8 space-y-6 md:space-y-8 sm:p-10">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
            <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="text"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input
                  type="password"
                  name="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="flex items-center justify-between">
                <a onClick={handlefogetpassword} className="text-sm font-light text-gray-500 dark:text-gray-400 cursor-pointer">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? <a onClick={handleSignupNavigate} className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer">Sign up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;