import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import React from "react";
import { Link } from "react-router-dom";
import { XCenter } from "./XCenter";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <footer className="bg-slate-800 text-center lg:text-left pt-8">
      <div className="mx-auto max-w-lg">
        <div className="container py-4">
          {/* link text section */}
          <XCenter>
            <div className="mb-6 text-white">
              <h5 className="uppercase font-bold mb-2.5 ">Navigate</h5>

              <ul className="list-none mb-0 flex justify-between flex-col md:flex-row  w-96 ">
                <li>
                  <a
                    href="https://storybook.shareculator.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Storybook
                  </a>
                </li>
                <li>
                  <Link to="/guide">User Guide</Link>
                </li>
                <li>
                  <a
                    href="mailto: kittichoteshane@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </XCenter>

          {/* sns icon */}
          <div className="flex justify-center mb-2  ">
            <a
              href="mailto: kittichoteshane@gmail.com"
              type="button"
              target="_blank"
              rel="noreferrer"
              className=" text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
            >
              <GoogleIcon />
            </a>

            <a
              href="http://kittishane.com/"
              type="button"
              target="_blank"
              rel="noreferrer"
              className=" text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
            >
              <LanguageIcon />
            </a>

            <a
              href="https://www.linkedin.com/in/kittichote-kamalapirat-076aaa120/"
              target="_blank"
              rel="noreferrer"
              type="button"
              className=" text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
            >
              <LinkedInIcon />
            </a>

            <a
              href="https://github.com/KittichoteKamalapirat"
              target="_blank"
              rel="noreferrer"
              type="button"
              className=" text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
      <div className="text-white text-center p-4 bg-slate-700">
        © 2021 Copyright: <a href="https://shareculator.com/">Shareculator</a>
      </div>
    </footer>
  );
};
