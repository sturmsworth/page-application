import React from "react";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// styles
import "../styles/CustomCards.scss";

const CustomCards = ({ title }) => {
  return (
    <Row className="text-center my-5">
      <Col lg={{ span: 8, offset: 2 }} className="status py-5 px-3">
        <div className="h3">Application Status</div>
        <div>
          Status dialoge will go here. Changes dependant on user progress
        </div>
      </Col>
    </Row>
  );
};

export default CustomCards;
