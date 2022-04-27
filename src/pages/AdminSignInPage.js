import React, { useContext } from "react";

// context
import { AuthContext } from "../context/AuthContext";

// components
import CustomContainer from "../components/CustomContainer";
import CustomButton from "../components/CustomButton";

// bootstrap
import { Row, Col } from "react-bootstrap";

// react-router
import { Redirect } from "react-router-dom";

// routes
import { HOME } from "../routes";

const AdminSignIn = () => {
  const { currentAdmin, currentSenator, adminSignIn, adminError } =
    useContext(AuthContext);

  return currentAdmin || currentSenator ? (
    <Redirect to={HOME} />
  ) : (
    <CustomContainer>
      <Col>
        <Row>
          <Col className="pb-5">
            Senate Page Program Administrators, please click below to sign in
            with your authorized Senate of Virginia Account. Be sure to select
            the right account before proceeding.
          </Col>
        </Row>
        <Row>
          <Col>
            <CustomButton
              buttonType="custom-google-btn"
              handleClick={adminSignIn}
            />
          </Col>
        </Row>
        {adminError ? (
          <Row className="py-5">
            <Col>
              <div className="text-danger">{adminError}</div>
            </Col>
          </Row>
        ) : null}
      </Col>
    </CustomContainer>
  );
};

export default AdminSignIn;
