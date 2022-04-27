import React, { useContext, useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import Fade from "react-reveal/Fade";
import { Redirect, Link } from "react-router-dom";

// components
import Loading from "../components/Loading";

// Routes
import {
  ADMIN_DASHBOARD,
  CREATE_ACCOUNT,
  MY_ACCOUNT,
  SIGN_IN,
} from "../routes";

// context
import { AuthContext } from "../context/AuthContext";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// images
import parallaxCapital from "../images/Masthead2-dark.jpg";

// style
import "../styles/Homepage.scss";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser, currentAdmin, authLoading, currentSenator } =
    useContext(AuthContext);

  useEffect(() => {
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading]);

  return loading ? (
    <Loading />
  ) : currentUser ? (
    <Redirect to={MY_ACCOUNT} />
  ) : currentAdmin || currentSenator ? (
    <Redirect to={ADMIN_DASHBOARD} />
  ) : (
    <>
      <Parallax
        blur={{ min: -5, max: 10 }}
        bgImage={parallaxCapital}
        bgImageAlt={"homepage-capital-building"}
        strength={500}
      >
        <Fade>
          <Container style={{ height: "1000px" }}>
            <Row className="h-100 align-items-center">
              <Col>
                <div className="text-center p-text-header">
                  Welcome,{" "}
                  <span className="attention">Prospective Senate Pages!</span>
                </div>

                <div className="text-center p-text-sub">
                  We're <span className="attention">excited</span> to have you!
                </div>

                <div className="text-center p-text-sub pb-3">
                  <h3>
                    Please log in, create an account, or click above to learn
                    more about us.
                  </h3>
                </div>

                <Row>
                  <Col lg={6} sm={12}>
                    <Link
                      to={SIGN_IN}
                      className="btn btn-lg btn-block home-buttons"
                    >
                      Sign In
                    </Link>
                  </Col>
                  <Col lg={6} sm={12}>
                    <Link
                      to={CREATE_ACCOUNT}
                      className="btn btn-lg btn-block home-buttons"
                    >
                      Create Account
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Fade>
      </Parallax>
    </>
  );
};

export default Homepage;
