import React from "react";
import { isMobile } from "react-device-detect";

// styles
import "../styles/CustomInput.scss";

const CustomPasswordInput = ({
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
      <input
        type="password"
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
      <input
        type="password"
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

export default CustomPasswordInput;
