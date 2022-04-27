import React from "react";

// components

// bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";

const Loading = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="secondary" />
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
