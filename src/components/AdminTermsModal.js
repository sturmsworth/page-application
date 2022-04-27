import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Alert, Form } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";
import SmallLoading from "./SmallLoading";

import "../styles/AdminTermsModal.scss";

const AdminTermsModal = () => {
  const {
    showTermsModal,
    setShowTermsModal,
    currentEmail,
    getSingleUserFormInfo,
    modalData,
    setModalData,
    updateUserFormInfo,
    // updateUserMetaData,
  } = useContext(TableDataContext);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => {
      return {
        ...prev,
        termsInfo: {
          ...modalData.termsInfo,
          [name]: value,
        },
      };
    });
  };

  const handleClose = () => {
    if (editing) {
      setAlert(true);
    } else {
      setShowTermsModal(false);
    }
  };

  const handleSave = async () => {
    if (editing) {
      await updateUserFormInfo(modalData);
      setEditing(false);
    }
  };

  //   const markAsComplete = async () => {
  //     await updateUserMetaData("terms");
  //   };

  const forceCloseOnAlert = () => {
    setShowTermsModal(false);
    setAlert(false);
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (currentEmail && showTermsModal) {
      (async () => {
        const doc = await getSingleUserFormInfo();
        setModalData(doc.data());
        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [showTermsModal, currentEmail]);

  return (
    <Modal show={showTermsModal} onHide={handleClose} className="admin-modals">
      <Modal.Header closeButton>
        <Modal.Title>Terms - Account: {currentEmail}</Modal.Title>
      </Modal.Header>

      {loading ? (
        <SmallLoading />
      ) : editing ? (
        <Modal.Body>
          {alert ? (
            <Alert variant="danger" className="mt-3">
              <Alert.Heading>
                Are You Sure You would Like to Close This Window?
              </Alert.Heading>
              <p>
                We've detected you have unsaved changes. Are you sure you want
                to close this window without saving?
              </p>
              <Row>
                <Col>
                  <Button variant="primary" onClick={forceCloseOnAlert}>
                    Yes
                  </Button>{" "}
                  <Button variant="secondary" onClick={() => setAlert(false)}>
                    No
                  </Button>
                </Col>
              </Row>
            </Alert>
          ) : null}
          <Form>
            <Form.Label className="my-1 mr-2" htmlFor="applicant-terms">
              Applicant Terms
            </Form.Label>
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              id="applicantTerms"
              custom
              onChange={handleChange}
              name="applicantTerms"
              value={modalData.termsInfo.applicantTerms}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Control>

            <Form.Label className="my-1 mr-2" htmlFor="guardian-terms">
              Guardian Terms
            </Form.Label>
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              id="guardianTerms"
              custom
              onChange={handleChange}
              name="guardianTerms"
              value={modalData.termsInfo.guardianTerms}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </Form.Control>
          </Form>
        </Modal.Body>
      ) : (
        <Modal.Body>
          <Row>
            <Col>
              <b>Applicant Terms:</b>{" "}
              {modalData.termsInfo.applicantTerms ? "Accepted" : "Not Accepted"}
            </Col>
          </Row>
          <Row>
            <Col>
              <b>Guardian Terms:</b>{" "}
              {modalData.termsInfo.guardianTerms ? "Accepted" : "Not Accepted"}
            </Col>
          </Row>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button
          variant="success"
          size="sm"
          onClick={editing ? handleSave : handleEditing}
        >
          {editing ? "Save" : "Edit"}
        </Button>

        {/* <Button
          variant={editing ? "light" : "info"}
          size="sm"
          onClick={markAsComplete}
          disabled={editing ? true : false}
        >
          Mark as Complete
        </Button> */}

        <Button variant="primary" size="sm" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdminTermsModal;
