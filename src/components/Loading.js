import React from "react";

// components
import CustomContainer from "./CustomContainer";

// bootstrap
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <CustomContainer>
      <Col>
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="secondary" />
      </Col>
    </CustomContainer>
  );
};

export default Loading;
