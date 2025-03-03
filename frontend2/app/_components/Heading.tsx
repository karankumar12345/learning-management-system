/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
// import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";

type Props = {
  activeItem: number;
  setActiveItem: (item: number) => void;
};

const Header = ({ activeItem, setActiveItem }: Props) => {
  const [openSidebar, setOpenSidebar] = useState(false);
//   const [logoutUser] = useLogoutUserMutation();
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const user = useSelector((state: any) => state.auth);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  const isActive = (item: number) => activeItem === item;

  const handleLinkClick = (item: number) => {
    setActiveItem(item);
    setOpenSidebar(false);
  };

  const handleLogout = async () => {
    
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  if (!mounted) return null;

  return (
    <header className="w-full bg-gray-800 dark:bg-gray-900 text-white p-4 flex items-center justify-between">
      {/* Logo Section */}
      <div className="text-xl font-bold">LLEARNING</div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6 items-center">
  {["Home", "About", "Services", "Contact"].map((item, index) => (
    <a
      key={index}
      href={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
      onClick={() => handleLinkClick(index + 1)}
      className={`px-3 py-2 rounded-md ${
        isActive(index + 1) ? "bg-blue-500" : "hover:bg-gray-700"
      } transition-colors duration-300`}
    >
      {item}
    </a>
  ))}



        {/* User Section */}
        {session ? (
          <div className="relative">
            <Avatar
              className="h-8 w-8 cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2">
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  View Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-200 dark:hover:bg-gray-700 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a
            href="/sign-in"
            className="px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-400 transition-colors duration-300"
          >
            Login
          </a>
        )}

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors duration-300"
        >
          {theme === "light" ||
          (theme === "system" && systemTheme === "light") ? (
            <MoonIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <SunIcon className="h-6 w-6 text-yellow-300" />
          )}
        </button>
      </nav>

      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="md:hidden text-2xl"
      >
        ☰
      </button>

      {/* Mobile Sidebar */}
      {openSidebar && (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 dark:bg-gray-800 text-white p-6 z-50 overflow-auto">
          <button
            onClick={() => setOpenSidebar(false)}
            className="text-2xl mb-4"
          >
            ×
          </button>
          <nav className="flex flex-col space-y-4">
            {["Home", "About", "Services", "Contact","Profile"].map((item, index) => (
              <a
                key={index}
                href={`/${item.toLowerCase()}`}
                onClick={() => handleLinkClick(index + 1)}
                className={`px-3 py-2 rounded-md ${
                  isActive(index + 1) ? "bg-blue-500" : "hover:bg-gray-700"
                } transition-colors duration-300`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;