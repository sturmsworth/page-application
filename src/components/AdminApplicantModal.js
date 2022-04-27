import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Alert, Form } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";
import SmallLoading from "./SmallLoading";

import { statesArray } from "../utils/constants";

import "../styles/AdminTermsModal.scss";

const AdminApplicantModal = () => {
  const {
    showApplicantInfoModal,
    setShowApplicantInfoModal,
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
        applicantInfo: {
          ...modalData.applicantInfo,
          [name]: value,
        },
      };
    });
  };

  const handleClose = () => {
    if (editing) {
      setAlert(true);
    } else {
      setShowApplicantInfoModal(false);
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
    setShowApplicantInfoModal(false);
    setAlert(false);
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (currentEmail && showApplicantInfoModal) {
      (async () => {
        const doc = await getSingleUserFormInfo();
        setModalData(doc.data());
        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [showApplicantInfoModal, currentEmail]);

  return (
    <Modal
      show={showApplicantInfoModal}
      onHide={handleClose}
      className="admin-modals"
    >
      <Modal.Header closeButton>
        <Modal.Title>Applicant Info - Account: {currentEmail}</Modal.Title>
      </Modal.Header>

      {loading ? (
        <SmallLoading />
      ) : editing ? (
        // edited display
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
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-prefix">
                Prefix
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="prefix"
                onChange={handleChange}
                name="prefix"
                value={modalData.applicantInfo.prefix}
              >
                <option value={`Prefix`}>Prefix</option>
                <option value={`Mr.`}>Mr.</option>
                <option value={`Ms.`}>Ms.</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-first">
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                id="fName"
                onChange={handleChange}
                name="fName"
                value={modalData.applicantInfo.fName}
                placeholder="First Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-middle">
                Middle Name
              </Form.Label>
              <Form.Control
                type="text"
                id="mName"
                onChange={handleChange}
                name="mName"
                value={modalData.applicantInfo.mName}
                placeholder="Middle Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-last">
                Last Name
              </Form.Label>
              <Form.Control
                id="lName"
                onChange={handleChange}
                name="lName"
                value={modalData.applicantInfo.lName}
                placeholder="Last Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="applicant-preferred-name"
              >
                Preferred Name
              </Form.Label>
              <Form.Control
                id="nickname"
                onChange={handleChange}
                name="nickname"
                value={modalData.applicantInfo.nickname}
                placeholder="Preferred Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-dob">
                Date of Birth
              </Form.Label>
              <Form.Control
                id="dob"
                onChange={handleChange}
                name="dob"
                value={modalData.applicantInfo.dob}
                placeholder="Date of Birth"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-address-one">
                Address One
              </Form.Label>
              <Form.Control
                id="addressOne"
                onChange={handleChange}
                name="addressOne"
                value={modalData.applicantInfo.addressOne}
                placeholder="Address One"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-address-two">
                Address Two
              </Form.Label>
              <Form.Control
                id="addressTwo"
                onChange={handleChange}
                name="addressTwo"
                value={modalData.applicantInfo.addressTwo}
                placeholder="Address Two"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-city">
                City
              </Form.Label>
              <Form.Control
                id="city"
                onChange={handleChange}
                name="city"
                value={modalData.applicantInfo.city}
                placeholder="City"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-state">
                State
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="state"
                onChange={handleChange}
                name="state"
                value={modalData.applicantInfo.state}
              >
                {statesArray.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-phone">
                Phone Number
              </Form.Label>
              <Form.Control
                id="phone"
                onChange={handleChange}
                name="phone"
                value={modalData.applicantInfo.phone}
                placeholder="Phone"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-email">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                onChange={handleChange}
                name="email"
                value={modalData.applicantInfo.email}
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="applicant-house-apply">
                House Applicant
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="hApply"
                onChange={handleChange}
                name="hApply"
                value={modalData.applicantInfo.hApply}
              >
                <option value={`Choose One`}>Choose One</option>
                <option value={`Yes`}>Yes</option>
                <option value={`No`}>No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="applicant-house-service"
              >
                House Service
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="hService"
                onChange={handleChange}
                name="hService"
                value={modalData.applicantInfo.hService}
              >
                <option value={`Choose One`}>Choose One</option>
                <option value={`Yes`}>Yes</option>
                <option value={`No`}>No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="applicant-house-service-year"
              >
                House Service Date
              </Form.Label>
              <Form.Control
                id="hServiceDate"
                onChange={handleChange}
                name="hServiceDate"
                value={modalData.applicantInfo.hServiceDate}
                placeholder="House Service Date"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      ) : (
        // unedited display
        <Modal.Body>
          <Row>
            <Col>
              <b>Prefix:</b> {modalData.applicantInfo.prefix}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>First Name:</b> {modalData.applicantInfo.fName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Middle Name:</b> {modalData.applicantInfo.mName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Last Name:</b> {modalData.applicantInfo.lName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Preferred Name:</b> {modalData.applicantInfo.nickname}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>DOB:</b> {modalData.applicantInfo.dob}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Address One:</b> {modalData.applicantInfo.addressOne}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Address Two:</b> {modalData.applicantInfo.addressTwo}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>City:</b> {modalData.applicantInfo.city}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>State:</b> {modalData.applicantInfo.state}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Phone Number:</b> {modalData.applicantInfo.phone}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Email:</b> {modalData.applicantInfo.email}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>House Applicant:</b> {modalData.applicantInfo.hApply}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>House Service:</b> {modalData.applicantInfo.hServed}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>House Service Date:</b> {modalData.applicantInfo.hServiceDate}
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

export default AdminApplicantModal;
