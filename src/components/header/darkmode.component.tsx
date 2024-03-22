"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false); // to prevent flash of unstyled content
  const { systemTheme, theme, setTheme } = useTheme(); // import {useTheme} from "next-themes";

  useEffect(() => {
    setMounted(true);
  }, []); // to prevent flash of unstlyed content - after the page is rendered, set mounted to true

  const currentTheme = theme === "system" ? systemTheme : theme; // if theme is set to system, the currentTheme is systemTheme, else currentTheme is theme

  // if (!mounted) {
  //   return null;
  // }

  return (
    <>
      {/* if mounted is true and currentTheme is dark, then show MdLightMode icon, else show BsFillMoonFill icon */}
      {mounted && currentTheme === "dark" ? (
        <button
          type="button"
          className="flex-shrink-0 p-1 bg-white rounded-full hover:text-gray500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setTheme("light")}
        >
          <span className="sr-only">Set Theme</span>
          <SunIcon className="w-6 h-6" />
        </button>
      ) : (
        <button
          type="button"
          className="flex-shrink-0 p-1 bg-white rounded-full hover:text-gray500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setTheme("dark")}
        >
          <span className="sr-only">Set Theme</span>
          <MoonIcon className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default DarkModeButton;
