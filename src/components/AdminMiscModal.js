import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Alert, Form } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";
import SmallLoading from "./SmallLoading";

import { districtArray } from "../utils/constants";

import "../styles/AdminTermsModal.scss";

const AdminMiscModal = () => {
  const {
    showMiscInfoModal,
    setShowMiscInfoModal,
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
        miscInfo: {
          ...modalData.miscInfo,
          [name]: value,
        },
      };
    });
  };

  const handleClose = () => {
    if (editing) {
      setAlert(true);
    } else {
      setShowMiscInfoModal(false);
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
    setShowMiscInfoModal(false);
    setAlert(false);
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (currentEmail && showMiscInfoModal) {
      (async () => {
        const doc = await getSingleUserFormInfo();
        setModalData(doc.data());
        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [showMiscInfoModal, currentEmail]);

  return (
    <Modal
      show={showMiscInfoModal}
      onHide={handleClose}
      className="admin-modals"
    >
      <Modal.Header closeButton>
        <Modal.Title>Misc. Info - Account: {currentEmail}</Modal.Title>
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
            {/* GUARDIAN TWO */}
            <Form.Group>
              <h5>Miscellaneous Info</h5>
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="misc-district">
                District
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="district"
                onChange={handleChange}
                name="District"
                value={modalData.miscInfo.district}
              >
                {districtArray.map((e, i) => {
                  return (
                    <option key={i} value={e}>
                      {e}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <h5>School Info</h5>
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="misc-school">
                School Name
              </Form.Label>
              <Form.Control
                id="school"
                onChange={handleChange}
                name="school"
                value={modalData.miscInfo.school}
                placeholder="School"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="misc-grade">
                Grade
              </Form.Label>
              <Form.Control
                type="text"
                id="grade"
                onChange={handleChange}
                name="grade"
                value={modalData.miscInfo.grade}
                placeholder="Grade"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="misc-gpa">
                GPA
              </Form.Label>
              <Form.Control
                type="text"
                id="gpa"
                onChange={handleChange}
                name="gpa"
                value={modalData.miscInfo.gpa}
                placeholder="GPA"
              />
            </Form.Group>

            <Form.Group>
              <h5>Legacy Information</h5>
            </Form.Group>

            <Form.Group>
              <Form.Label className="my-1 mr-2" htmlFor="misc-family-service">
                Has a member of your family served as a Senate Page/Messenger or
                a House Page?
              </Form.Label>
              <Form.Control
                type="text"
                as="select"
                id="familyService"
                onChange={handleChange}
                name="familyService"
                value={modalData.miscInfo.familyService}
              >
                <option value={"Yes"}>Yes</option>
                <option value={"No"}>No</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="family-service-one-name"
              >
                Family Service One Name
              </Form.Label>
              <Form.Control
                id="familyServiceOneName"
                onChange={handleChange}
                name="familyServiceOneName"
                value={modalData.miscInfo.familyServiceOneName}
                placeholder="Family Service One Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="family-service-one-branch"
              >
                Family Service One Branch
              </Form.Label>
              <Form.Control
                id="familyServiceOneBranch"
                onChange={handleChange}
                name="familyServiceOneBranch"
                value={modalData.miscInfo.familyServiceOneBranch}
                placeholder="Family Service One Branch"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="family-service-one-year"
              >
                Family Service One Year
              </Form.Label>
              <Form.Control
                id="familyServiceOneYear"
                onChange={handleChange}
                name="familyServiceOneYear"
                value={modalData.miscInfo.familyServiceOneYear}
                placeholder="Family Service One Year"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="family-service-one-relation"
              >
                Family Service One Relation
              </Form.Label>
              <Form.Control
                id="familyServiceOneRelation"
                onChange={handleChange}
                name="familyServiceOneRelation"
                value={modalData.miscInfo.familyServiceOneRelation}
                placeholder="Family Service One Relation"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="family-service-Two-name"
              >
                Family Service Two Name
              </Form.Label>
              <Form.Control
                id="familyServiceTwoName"
                onChange={handleChange}
                name="familyServiceTwoName"
                value={modalData.miscInfo.familyServiceTwoName}
                placeholder="Family Service Two Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="family-service-Two-branch"
              >
                Family Service Two Branch
              </Form.Label>
              <Form.Control
                id="familyServiceTwoBranch"
                onChange={handleChange}
                name="familyServiceTwoBranch"
                value={modalData.miscInfo.familyServiceTwoBranch}
                placeholder="Family Service Two Branch"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="family-service-Two-year"
              >
                Family Service Two Year
              </Form.Label>
              <Form.Control
                id="familyServiceTwoYear"
                onChange={handleChange}
                name="familyServiceTwoYear"
                value={modalData.miscInfo.familyServiceTwoYear}
                placeholder="Family Service Two Year"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label
                className="my-1 mr-2"
                htmlFor="family-service-Two-relation"
              >
                Family Service Two Relation
              </Form.Label>
              <Form.Control
                id="familyServiceTwoRelation"
                onChange={handleChange}
                name="familyServiceTwoRelation"
                value={modalData.miscInfo.familyServiceTwoRelation}
                placeholder="Family Service Two Relation"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      ) : (
        // unedited display
        <Modal.Body>
          <Row>
            <Col>
              <h5>Miscellaneous Info</h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <b>School:</b> {modalData.miscInfo.school}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Grade:</b> {modalData.miscInfo.grade}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>GPA:</b> {modalData.miscInfo.gpa}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>District:</b> {modalData.miscInfo.district}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Family Service History:</b> {modalData.miscInfo.familyService}
            </Col>
          </Row>

          <Row className="mt-3 pt-3 mb-1 pb-1">
            <Col>
              <h5>Family Service One:</h5>
            </Col>

            <Col>
              <h5>Family Service Two:</h5>
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Name:</b> {modalData.miscInfo.familyServiceOneName}
            </Col>

            <Col>
              <b>Name:</b> {modalData.miscInfo.familyServiceTwoName}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Branch:</b> {modalData.miscInfo.familyServiceOneBranch}
            </Col>

            <Col>
              <b>Branch:</b> {modalData.miscInfo.familyServiceTwoBranch}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Year of Service:</b> {modalData.miscInfo.familyServiceOneYear}
            </Col>

            <Col>
              <b>Year of Service:</b> {modalData.miscInfo.familyServiceTwoYear}
            </Col>
          </Row>

          <Row>
            <Col>
              <b>Relation:</b> {modalData.miscInfo.familyServiceTwoRelation}
            </Col>

            <Col>
              <b>Relation:</b> {modalData.miscInfo.familyServiceTwoRelation}
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

export default AdminMiscModal;
