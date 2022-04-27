import React from "react";

// react-bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const CustomContainer = ({ children }) => {
  return (
    <Container className="d-flex justify-content-center vh-100">
      <Row className="pt-5 mt-5 w-100 align-content-center text-center">
        {children}
      </Row>
    </Container>
  );
};

export default CustomContainer;
