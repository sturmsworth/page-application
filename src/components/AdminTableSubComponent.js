import React, { useContext } from "react";
import moment from "moment";

import { Row, Col, Container, Card, Button } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";

import "../styles/AdminTableSubComponent.scss";

const AdminTableSubComponent = ({ row }) => {
  const {
    setShowTermsModal,
    setShowApplicantInfoModal,
    setShowGuardianInfoModal,
    setShowMiscInfoModal,
    setShowAttachmentsModal,
  } = useContext(TableDataContext);
  return (
    <Container>
      <Row>
        <Col>
          <Card className="py-3 my-3">
            <Card.Body>
              <Card.Title className="sub-component-header">
                Terms Acceptance
              </Card.Title>
              <Card.Text>
                {row.original.terms === "started"
                  ? `${
                      row.original.displayName
                    } has viewed the Terms. The user last accessed the form on ${moment(
                      row.original.termsLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : row.original.terms === "completed"
                  ? `The Terms have been accepted. ${
                      row.original.displayName
                    } last accessed the form on ${moment(
                      row.original.termsLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : `${row.original.displayName} has not yet started the Terms Acceptance Form`}
              </Card.Text>
              <Button variant="primary" onClick={() => setShowTermsModal(true)}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="py-3 my-3">
            <Card.Body>
              <Card.Title className="sub-component-header">
                Applicant Information
              </Card.Title>
              <Card.Text>
                {row.original.applicantInfo === "started"
                  ? `${
                      row.original.displayName
                    } has started the Applicant Information Form. The user last accessed the form on ${moment(
                      row.original.applicantInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : row.original.applicantInfo === "completed"
                  ? `The Applicant Information form has been completed. ${
                      row.original.displayName
                    } last accessed the form on ${moment(
                      row.original.applicantInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : `${row.original.displayName} has not yet started the Applicant Information Form`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowApplicantInfoModal(true)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="py-3 my-3">
            <Card.Body>
              <Card.Title className="sub-component-header">
                Guardian Information
              </Card.Title>
              <Card.Text>
                {row.original.guardianInfo === "started"
                  ? `${
                      row.original.displayName
                    } has started the Guardian Information Form. The user last accessed the form on ${moment(
                      row.original.guardianInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : row.original.guardianInfo === "completed"
                  ? `The Guardian Information form has been completed. ${
                      row.original.displayName
                    } last accessed the form on ${moment(
                      row.original.guardianInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : `${row.original.displayName} has not yet started the Guardian Information Form`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowGuardianInfoModal(true)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="py-3 my-3">
            <Card.Body>
              <Card.Title className="sub-component-header">
                Miscellaneous Information
              </Card.Title>
              <Card.Text>
                {row.original.miscInfo === "started"
                  ? `${
                      row.original.displayName
                    } has started the Miscellaneous Information Form. The user last accessed the form on ${moment(
                      row.original.miscInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : row.original.miscInfo === "completed"
                  ? `The Miscellaneous Information form has been completed. ${
                      row.original.displayName
                    } last accessed the form on ${moment(
                      row.original.miscInfoLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : `${row.original.displayName} has not yet started the Miscellaneous Information Form`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowMiscInfoModal(true)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="py-3 my-3">
            <Card.Body>
              <Card.Title className="sub-component-header">
                Attachments
              </Card.Title>
              <Card.Text>
                {row.original.attachments === "started"
                  ? `${
                      row.original.displayName
                    } has started uploading or has viewed the attachments. The user last accessed the form on ${moment(
                      row.original.attachmentsLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : row.original.attachments === "completed"
                  ? `All attachments have been submitted. ${
                      row.original.displayName
                    } last accessed the form on ${moment(
                      row.original.attachmentsLastTouched.toDate()
                    ).format(`MMMM Do YYYY, h:mm:ss a`)}`
                  : `${row.original.displayName} has not yet viewed/started the attachments section.`}
              </Card.Text>
              <Button
                variant="primary"
                onClick={() => setShowAttachmentsModal(true)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminTableSubComponent;
