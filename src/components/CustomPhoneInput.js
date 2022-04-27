import React from "react";
import { isMobile } from "react-device-detect";
import NumberFormat from "react-number-format";

// styles
import "../styles/CustomInput.scss";

const CustomPhoneInput = ({
  name,
  type,
  value,
  placeholder,
  classType,
  required,
  errors,
  dropValues,
  handleChange,
  ...otherProps
}) => {
  return isMobile ? (
    <div className="pt-3 px-5">
      <NumberFormat
        format="(###)###-####"
        mask="_"
        name={name}
        value={value}
        placeholder={`${placeholder}${required === true ? " *" : ""}`}
        className={
          classType ? `${classType} custom-input-mobile` : "custom-input-mobile"
        }
        onChange={handleChange}
      />
      {errors ? <div className="text-danger">{errors}</div> : null}
    </div>
  ) : (
    <div className="pt-3 px-5">
      <NumberFormat
        format="(###)###-####"
        mask="_"
        name={name}
        value={value}
        placeholder={`${placeholder}${required === true ? " *" : ""}`}
        className={classType ? `${classType} custom-input` : "custom-input"}
        onChange={handleChange}
      />
      {errors ? <div className="text-danger">{errors}</div> : null}
    </div>
  );
};

export default CustomPhoneInput;
