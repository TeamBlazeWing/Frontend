import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);

  const navigate = useNavigate();

  const calculatePasswordStrength = (pwd) => {
    const hasLower = /[a-z]/.test(pwd);
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[!@#$%^&*]/.test(pwd);
    const length = pwd.length >= 8;

    if (hasLower && hasUpper && hasSpecial && length) return "Strong";
    if ((hasLower || hasUpper) && length) return "Medium";
    if (length) return "Weak";
    if (pwd.length === 0) return null;
  };

  useEffect(() => {
    const newErrors = {};

    if (name && name.length < 8) {
      newErrors.name = "Name must be at least 8 characters";
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
    }

    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password) {
      if (
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[!@#$%^&*]/.test(password)
      ) {
        newErrors.password =
          "Must include lowercase, uppercase, and special character";
      }
    }

    if (confirmPassword && confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords must match";
    }

    setErrors(newErrors);
    setPasswordStrength(calculatePasswordStrength(password));
  }, [name, phoneNumber, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobileNumber: phoneNumber,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      alert("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setErrors({ general: error.message || "Signup failed" });
      console.error("Signup failed", error);
    }
  };

  const isFormInvalid =
    Object.keys(errors).length > 0 ||
    !name ||
    !phoneNumber ||
    !email ||
    !password ||
    !confirmPassword;

  return (
    <section className="bg-gray-50 dark:bg-black h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-lg xl:p-0 dark:bg-black dark:border-gray-700">
          <div className="p-8 space-y-6 md:space-y-8 sm:p-10">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Signup to start your journey
            </h1>
            {errors.general && (
              <p className="text-red-500 text-center">{errors.general}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter 10-digit phone number"
                  maxLength="10"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter password"
                    disabled={!isNameValid}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                <p>Password Strength: {passwordStrength}</p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Confirm password"
                    disabled={!isNameValid}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-500"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full text-white ${
                  isFormInvalid ? "bg-red-600" : "bg-blue-600 hover:bg-blue-700"
                } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:${
                  isFormInvalid
                    ? "bg-red-600"
                    : "bg-blue-600 dark:hover:bg-blue-700"
                } dark:focus:ring-blue-800`}
                disabled={isFormInvalid}
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
