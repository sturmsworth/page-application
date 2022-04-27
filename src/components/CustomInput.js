import React from "react";
import { isMobile } from "react-device-detect";

// styles
import "../styles/CustomInput.scss";

const CustomInput = ({
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
    type === "select" ? (
      <div className="pt-3 px-5">
        <select
          name={name}
          value={value}
          placeholder={`${placeholder}${required === true ? " *" : ""}`}
          className={
            classType
              ? `${classType} custom-input-mobile`
              : "custom-input-mobile"
          }
          onChange={handleChange}
        >
          {dropValues
            ? dropValues.map((value, i) => {
                if (i === 0) {
                  return (
                    <option value="" key={value} disabled defaultValue hidden>
                      {`${value} ${required === true ? " *" : ""}`}
                    </option>
                  );
                } else {
                  return (
                    <option value={value} key={value}>
                      {value}
                    </option>
                  );
                }
              })
            : null}
        </select>
        {errors ? <div className="text-danger">{errors}</div> : null}
      </div>
    ) : (
      <div className="pt-3 px-5">
        <input
          name={name}
          value={value}
          placeholder={`${placeholder}${required === true ? " *" : ""}`}
          className={
            classType
              ? `${classType} custom-input-mobile`
              : "custom-input-mobile"
          }
          onChange={handleChange}
        />
        {errors ? <div className="text-danger">{errors}</div> : null}
      </div>
    )
  ) : type === "select" ? (
    <div className="pt-3 px-5">
      <select
        name={name}
        value={value}
        placeholder={`${placeholder}${required === true ? " *" : ""}`}
        onChange={handleChange}
        className={classType ? `${classType} custom-input` : "custom-input"}
      >
        {dropValues
          ? dropValues.map((value, i) => {
              if (i === 0) {
                return (
                  <option
                    value={value}
                    key={value}
                    defaultValue
                    className="default-drop-value"
                  >
                    {`${value} ${required === true ? " *" : ""}`}
                  </option>
                );
              } else {
                return (
                  <option value={value} key={value}>
                    {value}
                  </option>
                );
              }
            })
          : null}
      </select>
      {errors ? <div className="text-danger">{errors}</div> : null}
    </div>
  ) : (
    <div className="pt-3 px-5">
      <input
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

export default CustomInput;
