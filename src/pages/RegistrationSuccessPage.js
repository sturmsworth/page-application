import React from "react";

import { Link } from "react-router-dom";

import { HOME } from "../routes";

import { Col } from "react-bootstrap";
import CustomContainer from "../components/CustomContainer";

const RegistrationSuccessPage = () => {
  return (
    <CustomContainer>
      <Col>
        <div className="h1 text-center cinzel py-3">
          Thank you for Registering
        </div>
        <div>
          <p>
            You've just completed the first step towards completing your Senate
            Page application.
          </p>
          <p>
            A verification email will be sent to you shortly from SPP Admin. If
            none appears in your inbox please check your email spam filters and
            confirm the email address was correct.
          </p>
          <p>
            Please contact Senate Page Program administrators via email at{" "}
            <a href="mailto:pageinfo@senate.virginia.gov">
              pageinfo@senate.virginia.gov
            </a>{" "}
            if you need more assistance.
          </p>
          <Link className="btn btn-lg custom-button" to={HOME}>
            Return Home
          </Link>
        </div>
      </Col>
    </CustomContainer>
  );
};

export default RegistrationSuccessPage;
