import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FooterRow } from "./FooterRow";
import { JoinLeft } from "@mui/icons-material";

//default export

export default {
  title: "Atoms/FooterRow",
  component: FooterRow,
};

export const Default = () => (
  <FooterRow
    inputArray={[
      {
        item: "เหน่ ",
        amount: 30,
        paidBy: "Shane",
        isEquallySplit: false,
        isInvalid: false,
        detail: [
          { name: "Shane", amount: 10 },
          { name: "Joe", amount: 10 },
          { name: "Ant", amount: 10 },
        ],
      },
    ]}
    byMembers={
      new Map([
        ["Shane", 10],
        ["Joe", 10],
        ["Ant", 10],
      ])
    }
    memberArray={["Shane", "Joe", "Ant"]}
    clearTable={() => console.log("clear")}
  ></FooterRow>
);

// named export

// Default.storyName = "Default Footer";
