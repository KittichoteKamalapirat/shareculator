import React from "react";
import CalculateIcon from "@mui/icons-material/Calculate";
import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";
interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <nav className=" bg-blue-500 p-6 text-white">
      <div className="flex  items-center justify-between flex-wrap  mx-auto max-w-5xl">
        <Link to="/">
          <div className="flex items-center flex-shrink-0 mr-6 cursor-pointer">
            <CalculateIcon />
            <span className="font-semibold text-xl tracking-tight">
              Shareculator
            </span>
          </div>
        </Link>
        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded   hover:text-white hover:border-white">
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {/* <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4"
          >
            Docs
          </a> */}
          </div>
          <div>
            <Link to="/guide">
              <Button variant="outlined" color="white">
                See how to use
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
