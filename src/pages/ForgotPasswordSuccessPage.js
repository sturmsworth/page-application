import React from "react";

import { Link } from "react-router-dom";

import { HOME } from "../routes";

import { Col } from "react-bootstrap";
import CustomContainer from "../components/CustomContainer";

const ForgotPasswordSuccessPage = () => {
  return (
    <CustomContainer>
      <Col>
        <div className="h1 text-center cinzel py-3">
          Your Password Reset Request has Been Received
        </div>
        <div>
          <p>
            Please check your email for a verification link to reset your
            password. If you do not see one, please be sure to check your spam
            folders or try again. If the problems continue please contact a
            system admistrator.
          </p>
          <Link className="btn btn-lg custom-button" to={HOME}>
            Return Home
          </Link>
        </div>
      </Col>
    </CustomContainer>
  );
};

export default ForgotPasswordSuccessPage;
