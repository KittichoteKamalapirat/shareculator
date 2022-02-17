import React, { useState } from "react";
import CalculateIcon from "@mui/icons-material/Calculate";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { XYCenter } from "../XYCenter";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="bg-white  border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 max-w-6xl mx-auto">
      <div className="container flex flex-wrap justify-between items-center mx-auto ">
        <Link to="/">
          <div className="flex items-center flex-shrink-0 mr-6 cursor-pointer z-30 relative ">
            <CalculateIcon style={{ fill: "#3b82f6" }} fontSize="large" />
            <span className="font-semibold text-xl tracking-tight ">
              Shareculator
            </span>
          </div>
        </Link>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu-2"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <CloseIcon style={{ zIndex: 20 }} fontSize="large" />
          ) : (
            <MenuIcon />
          )}
        </button>
        <div
          className={` ${
            isOpen ? null : "hidden"
          }  w-full md:hidden justify-center h-screen top-0  left-0 z-10 absolute bg-blue-50 md:w-auto `}
          id="mobile-menu"
        >
          <XYCenter>
            <ul className="flex items-center flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              {/* <li>
              <a
                href="/about"
                className="block  pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li> */}
              <li>
                <a
                  href="mailto: kittichoteshane@gmail.com"
                  type="button"
                  target="_blank"
                  rel="noreferrer"
                  className="block px-32 py-5 border-b-2 border-slate-300 mb-10 bb-2  text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </li>
              <li>
                <Link to="/guide">
                  <Button variant="outlined" onClick={() => setIsOpen(false)}>
                    See how to use
                  </Button>
                </Link>
              </li>
            </ul>
          </XYCenter>
        </div>

        {/* desktop */}
      </div>
    </nav>
  );
};
