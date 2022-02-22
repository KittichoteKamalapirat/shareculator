import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { XCenter } from "../components/layouts/XCenter";

interface GuideProps {}

export const Guide: React.FC<GuideProps> = ({}) => {
  return (
    <div className="p-2">
      <h1 className="text-4xl ">User Guide</h1>

      <p className="mt-5">
        It's very similar to when you use MICROSOFT EXCEL to calculate expenses.
        But BETTER.
      </p>
      <p>Here are the steps to follow.</p>
      <div className="relative md:w-1/2  m-8">
        <div className="border-r-2 border-gray-200 border-dotted absolute h-full top-0 z-0"></div>
        <ul className="list-none m-0 p-0">
          <li className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-blue-600 rounded-full h-4 w-4 border-gray-200 border-2 z-1"></div>
              <div className="flex-1 ml-4 font-medium">
                1. Add all member names in the Top section
              </div>
            </div>
            <div className="ml-12">
              For example, if there are 3 people, namely Jack, John, and Jane in
              the entire group. Type Jack, John, Jane. If there are more or
              less, you can add and delete a column as you wish.
            </div>
          </li>
          <li className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-blue-600 rounded-full h-4 w-4 border-gray-200 border-2 z-1"></div>
              <div className="flex-1 ml-4 font-medium">
                2. Add all the expenses as ROWS in the table.
              </div>
            </div>
            <div className="ml-12">
              You can add item(what you spent for), amount (how much you spent),
              paid by (who paid for it), who to include. It will be equally
              split by default. However, you can also edit the number below each
              name.
            </div>
          </li>
          <li className="mb-2">
            <div className="flex items-center mb-1">
              <div className="bg-blue-600 rounded-full h-4 w-4 border-gray-200 border-2 z-1"></div>
              <div className="flex-1 ml-4 font-medium">
                3. See the summary and pay back to your friends!
              </div>
            </div>
            <div className="ml-12">
              The summary is calculated to minimize the number of transactions.
              Follow the instruction and let's not keep your friends waiting.
              They might be waiting but don't want to remind you! But if you're
              sure that they already forgot, maybe you don't need to wake a
              sleeping tiger.
            </div>
          </li>
        </ul>
        <Link to="/">
          <XCenter>
            <Button variant="outlined">Get Started</Button>
          </XCenter>
        </Link>
      </div>
    </div>
  );
};
