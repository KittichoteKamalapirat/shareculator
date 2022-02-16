import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { XCenter } from "../components/layouts/XCenter";

interface GuideProps {}

export const Guide: React.FC<GuideProps> = ({}) => {
  return (
    <div className="p-2">
      <h1 className="text-4xl ">User Guide</h1>

      <p>
        It's very similar to when you use MICROSOFT EXCEL to calculate expense
      </p>
      <p>Here are the steps to follow</p>
      <div className="relative md:w-1/2  m-8">
        <div className="border-r-2 border-gray-200 border-dotted absolute h-full top-0 z-0"></div>
        <ul className="list-none m-0 p-0">
          <li className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-indigo-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"></div>
              <div className="flex-1 ml-4 font-medium">
                1. Add all member names of as COLUMNS
              </div>
            </div>
            <div className="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores
              doloribus nemo possimus commodi totam consectetur temporibus odit
              velit illo repellendus provident vitae.
            </div>
          </li>
          <li className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-indigo-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"></div>
              <div className="flex-1 ml-4 font-medium">
                2. Add all the expense as ROWS
              </div>
            </div>
            <div className="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores
              doloribus nemo possimus commodi totam consectetur temporibus odit
              velit illo repellendus provident vitae.
            </div>
          </li>
          <li className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-indigo-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"></div>
              <div className="flex-1 ml-4 font-medium">
                3. If you want to split equally among members, just click the
                button "Divide", other wise, add the number
              </div>
            </div>
            <div className="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores
              doloribus nemo possimus commodi totam consectetur temporibus odit
              velit illo repellendus provident vitae.
            </div>
          </li>
          <li className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-indigo-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"></div>
              <div className="flex-1 ml-4 font-medium">4. See the summary</div>
            </div>
            <div className="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores
              doloribus nemo possimus commodi totam consectetur temporibus odit
              velit illo repellendus provident vitae.
            </div>
          </li>
          <li className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-indigo-600 rounded-full h-4 w-4 border-gray-200 border-2 z-10"></div>
              <div className="flex-1 ml-4 font-medium">
                May 2017 - Learn PHP
              </div>
            </div>
            <div className="ml-12">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Dignissimos tenetur, suscipit atque et nulla dolores unde maiores
              doloribus nemo possimus commodi totam consectetur temporibus odit
              velit illo repellendus provident vitae.
            </div>
          </li>
        </ul>
      </div>

      <Link to="/">
        <XCenter>
          <Button variant="solid">Get Started</Button>
        </XCenter>
      </Link>
    </div>
  );
};
