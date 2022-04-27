import React from "react";
import CustomButton from "./CustomButton";

const CustomAccordionToggle = ({
  children,
  handleClick,
  firstText,
  secondText,
  eventKey,
}) => {
  return (
    <CustomButton
      name={eventKey === "0" ? firstText : secondText}
      buttonType="btn"
      handleClick={handleClick}
    >
      {children}
    </CustomButton>
  );
};

export default CustomAccordionToggle;
