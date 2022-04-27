import React from "react";

// bootstrap
import { Container, Row, Col } from "react-bootstrap";

import "../styles/AboutUsPage.scss";

const AboutUsPage = () => {
  return (
    <Container fluid className="py-5 mb-5">
      <Row className="text-center mt-5 pt-5">
        <Col xs={12}>
          <span className="titles">About Us</span>
        </Col>
      </Row>
      <div id="about" className="mx-5">
        <div className="d-flex align-items-center justify-content-center mt-5 pt-3">
          <div className="left-one" />
          <div className="right-one">
            <div className="content">
              <div className="titles">Who We Are</div>
              <p>
                <span>The Senate Page Program is</span> structured similar to a
                college preparatory program with components centered on
                developing future leaders. Students who receive admission to the
                program carry on the tradition of page service in the
                legislature while fulfilling requirements in a professional
                development track comprised of speakers, site visits and
                classroom-like instruction.
              </p>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center mt-5 pt-3">
          <div className="left-two">
            <div className="content text-right">
              <div className="titles">Our Mission</div>
              <p>
                The mission of our program is to facilitate a structured
                environment in which young Virginians embrace responsibility and
                accountability, develop professional characteristics through
                strict standards of conduct and engage in the legislative
                process through work, observation and discussion.
              </p>
            </div>
          </div>
          <div className="right-two" />
        </div>

        <div className="d-flex align-items-center justify-content-center my-5 py-3">
          <div className="left-three" />
          <div className="right-three">
            <div className="content">
              <div className="titles">Your Future</div>
              <p>
                Graduates from the Senate Page Program are well-positioned for
                consideration into high school and college leadership programs;
                in particular, those facilitated by the Sorenson Institute of
                Political Leadership at UVA, programs administered through the
                American Legion, and the U.S. Senate Page Program.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Container id="about-bottom" className="p-5">
        <Row className="about-bottom-text">
          <Col>
            <p>
              <span className="cinzel">The Senate Page Program</span> is
              structured similar to a college preparatory program with
              components centered on developing future leaders. Students who
              receive admission to the program carry on the tradition of page
              service in the legislature while fulfilling requirements in a
              professional development track comprised of speakers, site visits
              and classroom-like instruction.
            </p>
          </Col>
        </Row>

        <Row className="about-bottom-text">
          <Col>
            <p className="cinzel">
              The Program is Structured Around Three Primary Components:
            </p>
          </Col>
        </Row>

        <Row className="about-bottom-text">
          <Col>
            <ul>
              <li>
                <b className="cinzel">The Responsible Young Professional:</b>{" "}
                Each Senate Page will be tasked with various job assignments
                such as staffing committee meetings (in a backup clerk
                capacity), answering telephone calls, providing basic concierge
                services and speaking to the public or visiting delegations
                about their experience and role in the legislative process.
                Assignments are delegated to the Senate Page class using a team
                approach with an emphasis on exceptional standards of service.
              </li>
              <li>
                <b className="cinzel">The Evolving Leader:</b> The class will
                engage in team building scenarios designed to enhance leadership
                and decision-making skills. Our professional development track
                centers on topics relevant to young adults today. In addition to
                meeting elected officials, we immerse the class in sessions
                pertaining to etiquette, money management, cyber security,
                current events, and life after the Senate Page Program. Weekly
                reading and journaling is also required.
              </li>
              <li>
                <b className="cinzel">The Civic-Minded Young Adult:</b> Senate
                Page service extends beyond the confines of Capitol Square. Each
                class is required to complete a community service project as a
                team. The Senate Page Program partners with a local non-profit
                group that serves approximately three-dozen counties across the
                Commonwealth.
              </li>
            </ul>
          </Col>
        </Row>

        <Row className="about-bottom-text">
          <Col>
            <p>
              The education acquired through these components serves as
              preparation for the program capstone. The capstone is a mock
              legislative session, a one-hour debate in which the class will
              demonstrate what they learned about the legislative process.
              Senate Pages switch roles with legislators to openly debates
              topics on which they voted in mock committee. Legislators serve
              the mock floor session in a Senate Page-like capacity.
            </p>
          </Col>
        </Row>

        <Row className="about-bottom-text">
          <Col>
            <p>
              For additional information, or if you have any questions, please
              call toll-free at <a href="tel:+18888926948">(888) 892-6948</a> or{" "}
              <a href="tel:+18046987410">(804) 698-7410</a>, or you can e-mail
              us at:{" "}
              <a href="mailto:pageinfo@senate.virginia.gov?subject=Page Application">
                pageinfo@senate.virginia.gov
              </a>
              .
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AboutUsPage;
