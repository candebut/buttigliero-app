import React from "react";
import Button from "./Button";

const buttonProps = {
  label: "Label text",
  variant: "primary",
  onClick: () => console.log("hello!"),
};

describe("<Button />", () => {
  it("renders", () => {
    cy.mount(
      <Button
        label={buttonProps.label}
        variant={buttonProps.variant}
        onClick={buttonProps.onClick}
      />
    );
  });
});
