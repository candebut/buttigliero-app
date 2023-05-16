import React from "react";
// import "../../styles/scss/_button.scss";

export interface ButtonProps {
  label: string;
  variant: string;
  onClick?: React.MouseEventHandler;
}

const Button = ({ label, variant = "primary", onClick }: ButtonProps) => {
  //   const onClick = () => {
  //     if (onClick) {
  //       onClick();
  //     }
  //   };
  return (
    <div className="button-wrapper">
      <button onClick={onClick} className={`button-component__${variant}`}>
        {label}
      </button>
    </div>
  );
};

export default Button;
