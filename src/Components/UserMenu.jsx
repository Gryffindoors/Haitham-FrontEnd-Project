import React, { useContext, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../Context/AuthContext";
import ProfileImg from "../Constants/ProfileImg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export default function UserMenu() {
  const { user, signup, login, logout } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between Sign Up and Sign In
  const [selectedProfile, setSelectedProfile] = useState("v1");
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAuthModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Set default profile image on modal open
  useEffect(() => {
    if (showAuthModal && isSignUp) {
      setSelectedProfile("v1"); // Default to v1
    }
  }, [showAuthModal, isSignUp]);

  // ✅ API-based Sign Up Formik
  const signUpFormik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]{3,12}$/, "Username must be 3-12 letters or numbers")
        .required("Username is required"),
      password: Yup.string()
        .matches(/^\d+$/, "Password must contain only numbers")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        const { success, message } = await signup({
          username: values.username,
          profileImage: ProfileImg[selectedProfile], // Send selected profile image
        });

        if (!success) {
          setFieldError("username", message); // Show API error if signup fails
          return;
        }

        setShowAuthModal(false); // Close modal on success
      } catch (error) {
        setFieldError("username", "Signup failed. Please try again.");
      }
    },
  });

  // ✅ API-based Sign In Formik
  const signInFormik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(/^[a-zA-Z0-9]{3,12}$/, "Invalid username format")
        .required("Username is required"),
      password: Yup.string()
        .matches(/^\d+$/, "Password must contain only numbers")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        const { success, message } = await login({
          email: `${values.username}@mail.com`, // Convert username to email
          password: values.password,
        });

        if (!success) {
          setFieldError("password", message); // Show API error
          return;
        }

        setShowAuthModal(false); // Close modal on success
      } catch (error) {
        setFieldError("password", "Login failed. Please try again.");
      }
    },
  });

  return (
    <Menu as="div" className="relative">
      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="sr-only">Open user menu</span>
        <img
          alt="Profile"
          src={user ? user.customer_prefrences : ProfileImg.v1}
          className="size-8 rounded-full"
          loading="lazy"
        />
      </MenuButton>

      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 dark:bg-gray-800">
        {user ? (
          <>
            <MenuItem>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-white">
                {user ? `${user.first_name} ${user.last_name}` : "Your Profile"}
              </a>
            </MenuItem>
            <MenuItem>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-red-400"
              >
                Sign Out
              </button>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem>
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setShowAuthModal(true);
                }}
                className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign In
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setShowAuthModal(true);
                }}
                className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign Up
              </button>
            </MenuItem>
          </>
        )}
      </MenuItems>

      {/* Sign Up / Sign In Modal */}
      {showAuthModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/50">
          <div ref={modalRef} className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h2>
            <form onSubmit={isSignUp ? signUpFormik.handleSubmit : signInFormik.handleSubmit}>
              <input
                {...(isSignUp ? signUpFormik.getFieldProps("username") : signInFormik.getFieldProps("username"))}
                placeholder="Enter username"
                className="block w-full mb-2 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              />
              <p className="text-red-500 text-sm mb-2">
                {isSignUp
                  ? signUpFormik.touched.username && signUpFormik.errors.username
                  : signInFormik.touched.username && signInFormik.errors.username}
              </p>

              <input
                {...(isSignUp ? signUpFormik.getFieldProps("password") : signInFormik.getFieldProps("password"))}
                type="password"
                placeholder="Enter password"
                className="block w-full mb-2 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
              />
              <p className="text-red-500 text-sm mb-2">
                {isSignUp
                  ? signUpFormik.touched.password && signUpFormik.errors.password
                  : signInFormik.touched.password && signInFormik.errors.password}
              </p>

              {/* Profile Image Selection (Only for Sign Up) */}
              {isSignUp && (
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {Object.keys(ProfileImg).map((key) => (
                    <img
                      key={key}
                      src={ProfileImg[key]}
                      alt={`Profile ${key}`}
                      className={`size-10 rounded-full cursor-pointer ${selectedProfile === key ? "ring-2 ring-blue-500" : ""
                        }`}
                      onClick={() => setSelectedProfile(key)}
                    />
                  ))}
                </div>
              )}

              <button type="submit" className="w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                {isSignUp ? "Create Account" : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      )}
    </Menu>
  );
}
