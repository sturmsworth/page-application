import React from "react";
const FormHeader = ({
  title,
  instructions,
  additionalPoints,
  additionalPointsType,
  additionalPointsHeader,
}) => {
  return (
    <div>
      <h3 className="cinzel">{title}</h3>
      <div className="p-2">{instructions}</div>
      {additionalPointsHeader ? (
        <div className="p-2">{additionalPointsHeader}</div>
      ) : null}
      {additionalPoints ? (
        additionalPointsType === "ordered-list" ? (
          <ol>
            {additionalPoints.map((point) => {
              return <li>{point}</li>;
            })}
          </ol>
        ) : null
      ) : // add more types here before the null and delete the null
      null}
      <div className="text-secondary">
        <span className="text-danger">*</span> Indicates a required field.
      </div>
    </div>
  );
};

export default FormHeader;
