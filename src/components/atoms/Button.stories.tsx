import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "./Button";
import { XCenter } from "../layouts/XCenter";

//default export
export default {
  title: "Atoms/Button",
  component: Button,
  // decorators: [(story) => <XCenter> {story()}</XCenter>], //local decorator
  argTypes: {
    children: {
      defaultValue: "Button Text",
    },
    backgroundColor: { control: "color" },
    onClick: { action: "clicked" },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>{args.children}</Button>
);

//named export -> each button in the story
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
