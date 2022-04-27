import React from "react";

import { endorsementsFormURL, extrasFormURL } from "../utils/constants";

import "../styles/FormDownloads.scss";

const FormDownloads = () => {
  return (
    <div className="form-downloads py-5 mt-5">
      <div className="h3 text-center">Form Downloads</div>
      <div className="">
        <div className="px-5">
          Below you will find a list of required forms. These should be
          completed and saved in a PDF format with a size no larger than 5MB
          before being uploaded as part of Step 5.
        </div>
        <ul className="px-5 pt-3">
          <li className="px-3">
            <a
              href={endorsementsFormURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              School Endorsement Form
            </a>
          </li>
          <li className="px-3">
            <a href={extrasFormURL} target="_blank" rel="noopener noreferrer">
              Applicant Extracurricular Activities
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FormDownloads;
