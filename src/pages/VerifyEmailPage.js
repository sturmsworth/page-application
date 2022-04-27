import React, { useContext } from "react";

import { Redirect } from "react-router";

import { AuthContext } from "../context/AuthContext";

import { HOME } from "../routes";

import { Col } from "react-bootstrap";

import CustomContainer from "../components/CustomContainer";
import CustomButton from "../components/CustomButton";

const VerifyEmailPage = () => {
  const { currentUser, signOut } = useContext(AuthContext);

  return currentUser ? (
    <CustomContainer>
      <Col>
        <div className="h1 text-center cinzel py-3">
          Hello, {currentUser.displayName}
        </div>
        <div>
          <p>
            We have created your account, but you have not yet verified your
            email address. You must complete this step before continuing.{" "}
          </p>
          <p>
            A verification email should have been sent to you from SPP Admin. If
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
          <CustomButton
            className="btn btn-lg custom-button"
            name="Sign Out"
            handleClick={signOut}
          />
        </div>
      </Col>
    </CustomContainer>
  ) : (
    <Redirect to={HOME} />
  );
};

export default VerifyEmailPage;
