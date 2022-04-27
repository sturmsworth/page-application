import React from "react";

import { Col, Row } from "react-bootstrap";

import CustomContainer from "../components/CustomContainer";

import "../styles/ContactUsPage.scss";

const ContactUs = () => {
  return (
    <CustomContainer>
      <Col>
        <Row className="text-center">
          <Col>
            <p className="contact-title">CONTACT</p>
          </Col>
        </Row>

        <Row className="text-center">
          <Col className="">
            <div className="contact-wheel-one float-right">
              <div className="about-icon">
                <a href="mailto:pageinfo@senate.virginia.gov?subject=General Questions">
                  <i className="far fa-envelope fa-7x" />
                </a>
              </div>
            </div>
          </Col>

          <Col>
            <div className="contact-wheel-one">
              <div className="about-icon">
                <a href="tel:+18046987470">
                  <i className="fas fa-phone fa-7x" />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <p className="contact-subtitle mt-3 pt-3">
              PROBLEMS WITH OUR APPLICATION?
            </p>
            <p>
              Please forward any questions, comments, or concerns to{" "}
              <a href="mailto:pageinfo@senate.virginia.gov?subject=Page Application">
                pageinfo@senate.virginia.gov
              </a>
            </p>
            <p>
              We can be reached Moday - Friday 8:30 AM - 5:00 PM via telephone
              at <a href="tel:+18046987470">(804) 698-7410</a>
            </p>
          </Col>
        </Row>
      </Col>
    </CustomContainer>
  );
};

export default ContactUs;
