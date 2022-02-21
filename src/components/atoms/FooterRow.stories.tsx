import React from "react";
import { FooterRow } from "./FooterRow";

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
        paidByIndex: 0,
        splitAmong: [true, true, true],
        isEquallySplit: false,

        isInvalid: false,
        detail: [10, 10, 10],
      },
    ]}
    recalculate={() => console.log("recalculate")}
    byMembers={[10, 10, 10]}
    memberArray={["Shane", "Joe", "Ant"]}
  ></FooterRow>
);

// named export

// Default.storyName = "Default Footer";
