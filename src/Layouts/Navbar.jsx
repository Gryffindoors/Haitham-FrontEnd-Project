// @ts-nocheck
import React, { useContext } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router";
import ProfileImg from "../Constants/ProfileImg";
import images from "../Constants/Images";
import { ThemeContext } from "../Context/ThemeContext";
import { navigation } from "../Constants/PagesLinks";
import UserMenu from "../Components/UserMenu";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Disclosure as="nav" className="bg-[#F9F9F7] z-50 w-full dark:bg-gray-800 sticky top-0">
      <div className="mx-auto px-2 sm:px-6 lg:px-24">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button & Icons */}
          <div className="flex items-center">
            {/* Mobile Menu Toggle */}
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-inset sm:hidden">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="size-6 group-data-open:hidden" />
              <XMarkIcon className="size-6 hidden group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Desktop Navbar */}
          <div className="hidden sm:flex w-full items-center justify-between px-3">
            {/* Logo */}
            <div className="flex shrink-0 items-center">
              <img loading="lazy" alt="Healthy Foods Logo" src={images.CoLogo} className="h-10 w-auto" />
              <h4 className="company-name flex md:text-xl ms-3 text-sm items-center dark:text-[#F9F9F7] text-gray-900">Fork & Leaf</h4>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 hidden sm:flex justify-center sm:ml-6">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-[#F9F9F7] dark:bg-[#F9F9F7] dark:text-gray-800"
                          : "text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-[#F9F9F7] dark:hover:bg-gray-600 dark:hover:text-gray-100",
                        "rounded-md px-3 py-2 font-medium"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Icons & Profile (Desktop Only) */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Cart Icon */}
              <button className="p-2 text-gray-800 dark:text-gray-300">
                <ShoppingCartIcon className="size-6" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-800 dark:text-[#F9F9F7] hover:text-blue-800 dark:hover:text-white"
              >
                {theme === "light" ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
              </button>

              {/* Profile Dropdown */}
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-gray-100"
            >
              {item.name}
            </DisclosureButton>
          ))}

          {/* Mobile Icons (Cart, Theme Toggle, Profile) */}
          <div className="border-t border-gray-200 pt-3 px-2">
            {/* Cart */}
            <button className="w-full flex items-center justify-start space-x-3 p-2 rounded-md text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white">
              <ShoppingCartIcon className="size-6" />
              <span>Cart</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-start space-x-3 p-2 rounded-md text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {theme === "light" ? <SunIcon className="size-6" /> : <MoonIcon className="size-6" />}
              <span>Dark / Light</span>
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="w-full">
              <MenuButton className="w-full flex items-center justify-start space-x-3 p-2 rounded-md text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white">
                <img loading="lazy" alt="Profile" src={ProfileImg.v1} className="size-6 rounded-full" />
                <span>Profile</span>
              </MenuButton>
              <MenuItems className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                {["Your Profile", "Sign out"].map((text) => (
                  <MenuItem key={text}>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-100">
                      {text}
                    </a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
