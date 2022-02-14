import React from "react";
import { Table } from "../components/Table";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  return (
    <React.Fragment>
      <Table />
    </React.Fragment>
  );
};
