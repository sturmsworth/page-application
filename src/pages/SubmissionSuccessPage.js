import React from "react";

import { Link } from "react-router-dom";

import { HOME } from "../routes";

import { Col } from "react-bootstrap";
import CustomContainer from "../components/CustomContainer";

const SubmissionSuccessPage = () => {
  return (
    <CustomContainer>
      <Col>
        <div className="h1 text-center cinzel py-3">
          Your form has been received and marked as complete.
        </div>
        <div>
          <p>
            That's it! You're all done. Easy right? Click the button below to
            return to your account page and begin progress on your next step.
          </p>
          <Link className="btn btn-lg custom-button" to={HOME}>
            Return to My Account
          </Link>
        </div>
      </Col>
    </CustomContainer>
  );
};

export default SubmissionSuccessPage;
