import "../src/index.css";
import { addDecorator } from "@storybook/react";
import { XCenter } from "../src/components/layouts/XCenter";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
};

// addDecorator((story) => <XCenter>{story()}</XCenter>); //global decorator v5

export const decorators = [(Story) => <XCenter> {Story()}</XCenter>];
