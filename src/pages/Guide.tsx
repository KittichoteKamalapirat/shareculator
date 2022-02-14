import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/atoms/Button";
import { XCenter } from "../components/layouts/XCenter";

interface GuideProps {}

export const Guide: React.FC<GuideProps> = ({}) => {
  return (
    <React.Fragment>
      <h1>Guide</h1>

      <p>
        It's very similar to when you use MICROSOFT EXCEL to calculate expense
      </p>

      <p>Here are the steps to follow</p>

      <ol>
        <li>1. Add all member names of as COLUMNS</li>
        <li>2. Add all the expense as ROWS</li>
        <li>
          3. If you want to split equally among members, just click the button
          "Divide", other wise, add the number
        </li>
        <li>4. See the summary</li>
      </ol>

      <Link to="/">
        <XCenter>
          <Button variant="solid">Get Started</Button>
        </XCenter>
      </Link>
    </React.Fragment>
  );
};
