import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface DesktopProps {}

export const Desktop: React.FC<DesktopProps> = ({}) => {
  return (
    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul className="flex items-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li>
          <Link to="/guide">
            <Button variant="outlined">How to use</Button>
          </Link>
        </li>
        <li>
          <a
            href="mailto: kittichoteshane@gmail.com"
            type="button"
            target="_blank"
            rel="noreferrer"
            className="block px-32 border-slate-300   text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
};
