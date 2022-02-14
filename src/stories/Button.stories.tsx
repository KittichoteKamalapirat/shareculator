import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../components/atoms/Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    children: {
      defaultValue: "Button Text",
    },
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

export const Solid = Template.bind({});
Solid.args = {
  variant: "solid", //also default
  children: "Solid",
  // label: "Button",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "outlined",
  children: "Outlined",
  // label: "Button",
};

export const BottomLine = Template.bind({});
BottomLine.args = {
  variant: "bottom-line",
  children: "Bottom Line",
  // label: "Button",
};

export const Naked = Template.bind({});
Naked.args = {
  variant: "naked",
  children: "Naked",
  // label: "Button",
};
