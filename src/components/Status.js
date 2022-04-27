import React, { useContext } from "react";

// context
import { MetaDataContext } from "../context/MetaDataContext";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// styles
import "../styles/Status.scss";

const Status = () => {
  const { metaData } = useContext(MetaDataContext);
  const { applicationStatus } = metaData;
  return (
    <Row className="text-center my-5">
      <Col lg={{ span: 8, offset: 2 }} className="status py-5 px-3">
        <div className="h3">Application Status</div>
        <div>{applicationStatus}</div>
      </Col>
    </Row>
  );
};

export default Status;
