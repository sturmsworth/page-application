import React from "react";
import { Parallax } from "react-parallax";
import Fade from "react-reveal/Fade";
import { isMobile } from "react-device-detect";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// css
import "../styles/CustomParallax.scss";

const CustomParallax = ({
  pImage,
  pTextHeader,
  pTextSub,
  pTextSubTwo,
  pAlt,
}) => {
  return (
    <Parallax
      blur={{ min: -5, max: 10 }}
      bgImage={pImage}
      bgImageAlt={pAlt}
      strength={500}
    >
      <Fade>
        <Container style={{ height: "100vh" }}>
          <Row className="h-100 align-items-center">
            <Col>
              {pTextHeader ? (
                <div className="text-center p-text-header">
                  <h1>{pTextHeader}</h1>
                </div>
              ) : null}
              {pTextSub ? (
                <div className="text-center p-text-sub">
                  <h3>{pTextSub}</h3>
                </div>
              ) : null}
              {pTextSubTwo ? (
                <div className="text-center p-text-sub">
                  <h3>{pTextSubTwo}</h3>
                </div>
              ) : null}
            </Col>
          </Row>
        </Container>
      </Fade>
    </Parallax>
  );
};

export default CustomParallax;
