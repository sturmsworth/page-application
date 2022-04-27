import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Alert, Form } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";
import SmallLoading from "./SmallLoading";

import { statesArray } from "../utils/constants";

import "../styles/AdminTermsModal.scss";

const AdminGuardianModal = () => {
  const {
    showGuardianInfoModal,
    setShowGuardianInfoModal,
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
        guardianInfo: {
          ...modalData.guardianInfo,
          [name]: value,
        },
      };
    });
  };

  const handleChangeSecondary = (e) => {
    const { name, value } = e.target;
    setModalData((prev) => {
      return {
        ...prev,
        secondaryGuardianInfo: {
          ...modalData.guardianInfo,
          [name]: value,
        },
      };
    });
  };

  const handleClose = () => {
    if (editing) {
      setAlert(true);
    } else {
      setShowGuardianInfoModal(false);
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
    setShowGuardianInfoModal(false);
    setAlert(false);
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (currentEmail && showGuardianInfoModal) {
      (async () => {
        const doc = await getSingleUserFormInfo();
        setModalData(doc.data());
        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [showGuardianInfoModal, currentEmail]);

  return (
    <Modal
      show={showGuardianInfoModal}
      onHide={handleClose}
      className="admin-modals"
    >
      <Modal.Header closeButton>
        <Modal.Title>Guardian Info - Account: {currentEmail}</Modal.Title>
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
              <h5>Guardian One</h5>
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-prefix">
                Prefix
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="prefix"
                onChange={handleChange}
                name="prefix"
                value={modalData.guardianInfo.prefix}
              >
                <option value={`Prefix`}>Prefix</option>
                <option value={`Mr.`}>Mr.</option>
                <option value={`Ms.`}>Ms.</option>
                <option value={`Mrs.`}>Mrs.</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-first">
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                id="fName"
                onChange={handleChange}
                name="fName"
                value={modalData.guardianInfo.fName}
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-middle">
                Middle Name
              </Form.Label>
              <Form.Control
                type="text"
                id="mName"
                onChange={handleChange}
                name="mName"
                value={modalData.guardianInfo.mName}
                placeholder="Middle Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-last">
                Last Name
              </Form.Label>
              <Form.Control
                id="lName"
                onChange={handleChange}
                name="lName"
                value={modalData.guardianInfo.lName}
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-address-one">
                Address One
              </Form.Label>
              <Form.Control
                id="addressOne"
                onChange={handleChange}
                name="addressOne"
                value={modalData.guardianInfo.addressOne}
                placeholder="Address One"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-address-two">
                Address Two
              </Form.Label>
              <Form.Control
                id="addressTwo"
                onChange={handleChange}
                name="addressTwo"
                value={modalData.guardianInfo.addressTwo}
                placeholder="Address Two"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-city">
                City
              </Form.Label>
              <Form.Control
                id="city"
                onChange={handleChange}
                name="city"
                value={modalData.guardianInfo.city}
                placeholder="City"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-state">
                State
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="state"
                onChange={handleChange}
                name="state"
                value={modalData.guardianInfo.state}
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
              <Form.Label className="my-1 mr-2" htmlFor="guardian-phone">
                Phone Number
              </Form.Label>
              <Form.Control
                id="phone"
                onChange={handleChange}
                name="phone"
                value={modalData.guardianInfo.phone}
                placeholder="Phone"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-phone-type">
                Phone Type
              </Form.Label>
              <Form.Control
                id="phoneType"
                onChange={handleChange}
                name="phoneType"
                value={modalData.guardianInfo.phoneType}
                placeholder="Phone Type"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-phone-two">
                Phone Two Number
              </Form.Label>
              <Form.Control
                id="phoneTwo"
                onChange={handleChange}
                name="phoneTwo"
                value={modalData.guardianInfo.phoneTwo}
                placeholder="Phone Two"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="guardian-phone-type-two"
              >
                Phone Two Type
              </Form.Label>
              <Form.Control
                id="phoneTwoType"
                onChange={handleChange}
                name="phoneTwoType"
                value={modalData.guardianInfo.phoneTwoType}
                placeholder="Phone Two Type"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-email">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                onChange={handleChange}
                name="email"
                value={modalData.guardianInfo.email}
                placeholder="Email"
              />
            </Form.Group>

            {/* GUARDIAN TWO */}
            <Form.Group>
              <h5>Guardian Two</h5>
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-prefix-two">
                Prefix
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="prefixTwo"
                onChange={handleChangeSecondary}
                name="prefix"
                value={modalData.secondaryGuardianInfo.prefix}
              >
                <option value={`Prefix`}>Prefix</option>
                <option value={`Mr.`}>Mr.</option>
                <option value={`Ms.`}>Ms.</option>
                <option value={`Mrs.`}>Mrs.</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-first-two">
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                id="fNameTwo"
                onChange={handleChangeSecondary}
                name="fName"
                value={modalData.secondaryGuardianInfo.fName}
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-middle-two">
                Middle Name
              </Form.Label>
              <Form.Control
                type="text"
                id="mName"
                onChange={handleChangeSecondary}
                name="mName"
                value={modalData.secondaryGuardianInfo.mName}
                placeholder="Middle Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-last-two">
                Last Name
              </Form.Label>
              <Form.Control
                id="lName"
                onChange={handleChangeSecondary}
                name="lName"
                value={modalData.secondaryGuardianInfo.lName}
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="guardian-address-one-two"
              >
                Address One
              </Form.Label>
              <Form.Control
                id="addressOne"
                onChange={handleChangeSecondary}
                name="addressOne"
                value={modalData.secondaryGuardianInfo.addressOne}
                placeholder="Address One"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="guardian-address-two-two"
              >
                Address Two
              </Form.Label>
              <Form.Control
                id="addressTwo"
                onChange={handleChangeSecondary}
                name="addressTwo"
                value={modalData.secondaryGuardianInfo.addressTwo}
                placeholder="Address Two"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-city-two">
                City
              </Form.Label>
              <Form.Control
                id="city"
                onChange={handleChangeSecondary}
                name="city"
                value={modalData.secondaryGuardianInfo.city}
                placeholder="City"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-state-two">
                State
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="state"
                onChange={handleChangeSecondary}
                name="state"
                value={modalData.secondaryGuardianInfo.state}
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
              <Form.Label className="my-1 mr-2" htmlFor="guardian-phone-two">
                Phone Number
              </Form.Label>
              <Form.Control
                id="phone"
                onChange={handleChangeSecondary}
                name="phone"
                value={modalData.secondaryGuardianInfo.phone}
                placeholder="Phone"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="guardian-phone-type-two"
              >
                Phone Type
              </Form.Label>
              <Form.Control
                id="phoneType"
                onChange={handleChangeSecondary}
                name="phoneType"
                value={modalData.secondaryGuardianInfo.phoneType}
                placeholder="Phone Type"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="guardian-phone-two-two"
              >
                Phone Two Number
              </Form.Label>
              <Form.Control
                id="phoneTwo"
                onChange={handleChangeSecondary}
                name="phoneTwo"
                value={modalData.secondaryGuardianInfo.phoneTwo}
                placeholder="Phone Two"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="guardian-phone-type-two-two"
              >
                Phone Two Type
              </Form.Label>
              <Form.Control
                id="phoneTwoType"
                onChange={handleChangeSecondary}
                name="phoneTwoType"
                value={modalData.secondaryGuardianInfo.phoneTwoType}
                placeholder="Phone Two Type"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="guardian-email-two">
                Email
              </Form.Label>
              <Form.Control
                id="email"
                onChange={handleChangeSecondary}
                name="email"
                value={modalData.secondaryGuardianInfo.email}
                placeholder="Email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      ) : (
        // unedited display
        <Modal.Body>
          <Row>
            <Col>
              <h5>Guardian One</h5>
            </Col>

            <Col>
              <h5>Guardian Two</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>Prefix:</b> {modalData.guardianInfo.prefix}
            </Col>
            <Col>
              <b>Prefix:</b> {modalData.secondaryGuardianInfo.prefix}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>First Name:</b> {modalData.guardianInfo.fName}
            </Col>
            <Col>
              <b>First Name:</b> {modalData.secondaryGuardianInfo.fName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Middle Name:</b> {modalData.guardianInfo.mName}
            </Col>
            <Col>
              <b>Middle Name:</b> {modalData.secondaryGuardianInfo.mName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Last Name:</b> {modalData.guardianInfo.lName}
            </Col>
            <Col>
              <b>Last Name:</b> {modalData.secondaryGuardianInfo.lName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Address One:</b> {modalData.guardianInfo.addressOne}
            </Col>
            <Col>
              <b>Address One:</b> {modalData.secondaryGuardianInfo.addressOne}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Address Two:</b> {modalData.guardianInfo.addressTwo}
            </Col>
            <Col>
              <b>Address Two:</b> {modalData.secondaryGuardianInfo.addressTwo}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>City:</b> {modalData.guardianInfo.city}
            </Col>
            <Col>
              <b>City:</b> {modalData.secondaryGuardianInfo.city}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>State:</b> {modalData.guardianInfo.state}
            </Col>
            <Col>
              <b>State:</b> {modalData.secondaryGuardianInfo.state}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Phone Number:</b> {modalData.guardianInfo.phone}
            </Col>
            <Col>
              <b>Phone Number:</b> {modalData.secondaryGuardianInfo.phone}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Phone Number:</b> {modalData.guardianInfo.phoneType}
            </Col>
            <Col>
              <b>Phone Number:</b> {modalData.secondaryGuardianInfo.phoneType}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Email:</b> {modalData.guardianInfo.email}
            </Col>
            <Col>
              <b>Email:</b> {modalData.secondaryGuardianInfo.email}
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

export default AdminGuardianModal;
