import React, { useContext, useState, useEffect } from "react";
import { Button, Modal, Row, Col, Alert, Image } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";
import SmallLoading from "./SmallLoading";

import "../styles/AdminTermsModal.scss";
import AdminCustomDropzone from "./AdminCustomDropzone";

const AdminGuardianModal = () => {
  const {
    showAttachmentsModal,
    setShowAttachmentsModal,
    currentEmail,
    getSingleUserAttachmentInfo,
    modalAttachmentData,
    setModalAttachmentData,
    updateUserAttachmentInfo,
  } = useContext(TableDataContext);

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState(false);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setmodalAttachmentData((prev) => {
  //       return {
  //         ...prev,
  //         guardianInfo: {
  //           ...modalAttachmentData.guardianInfo,
  //           [name]: value,
  //         },
  //       };
  //     });
  //   };

  const handleClose = () => {
    if (editing) {
      setAlert(true);
    } else {
      setShowAttachmentsModal(false);
    }
  };

  const handleSave = async () => {
    if (editing) {
      await updateUserAttachmentInfo(modalAttachmentData);
      setEditing(false);
    }
  };

  //   const markAsComplete = async () => {
  //     await updateUserMetaData("terms");
  //   };

  const forceCloseOnAlert = () => {
    setShowAttachmentsModal(false);
    setAlert(false);
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(!editing);
  };

  useEffect(() => {
    if (currentEmail && showAttachmentsModal) {
      (async () => {
        const doc = await getSingleUserAttachmentInfo();
        setModalAttachmentData(doc.data());
        setLoading(false);
      })();
    }
    // eslint-disable-next-line
  }, [showAttachmentsModal, currentEmail]);

  return (
    <Modal
      show={showAttachmentsModal}
      onHide={handleClose}
      className="admin-modals"
    >
      <Modal.Header closeButton>
        <Modal.Title>Attachments Info - Account: {currentEmail}</Modal.Title>
      </Modal.Header>

      {loading ? (
        <SmallLoading />
      ) : editing ? (
        // edited display
        <Modal.Body>
          {/* alert */}
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
          <Row className="text-center">
            <Col>
              <h3 className="cinzel py-3">Applicant Photo</h3>

              <AdminCustomDropzone attachmentType="photo" />
            </Col>
          </Row>

          <Row className="text-center">
            <Col>
              <h3 className="cinzel py-3">School Endorsement</h3>

              <AdminCustomDropzone attachmentType="endorsements" />
            </Col>
          </Row>

          <Row className="text-center">
            <Col>
              <h3 className="cinzel py-3">Extracurricular Activities</h3>

              <AdminCustomDropzone attachmentType="extras" />
            </Col>
          </Row>

          <Row className="text-center">
            <Col>
              <h3 className="cinzel py-3">Short Answer</h3>

              <AdminCustomDropzone attachmentType="shortAnswer" />
            </Col>
          </Row>

          <Row className="text-center">
            <Col>
              <h3 className="cinzel py-3">Essay</h3>

              <AdminCustomDropzone attachmentType="essay" />
            </Col>
          </Row>

          <Row className="text-center">
            <Col>
              <h3 className="cinzel py-3">Letter(s) of Recommendation</h3>

              <AdminCustomDropzone attachmentType="recs" />
            </Col>
          </Row>
        </Modal.Body>
      ) : (
        // unedited display
        <Modal.Body>
          <Row>
            <Col>
              {modalAttachmentData.photo !== null ? (
                <div className="text-center">
                  <div>
                    <a
                      href={modalAttachmentData.photo[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={modalAttachmentData.photo[0].url}
                        width={150}
                        className="preview-image"
                      />
                    </a>
                  </div>
                  <div>
                    <a
                      href={modalAttachmentData.photo[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      Photo
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center">No Photo Uploaded</div>
              )}
            </Col>

            <Col>
              {modalAttachmentData.essay !== null ? (
                <div className="text-center">
                  <div
                    style={{ height: 185 }}
                    className="justify-content-center"
                  >
                    <a
                      href={modalAttachmentData.essay[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      <span>
                        <i className="far fa-file-pdf fa-10x" />
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={modalAttachmentData.essay[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      Essay
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center">No Essay Uploaded</div>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              {modalAttachmentData.shortAnswer !== null ? (
                <div className="text-center">
                  <div
                    style={{ height: 185 }}
                    className="justify-content-center"
                  >
                    <a
                      href={modalAttachmentData.shortAnswer[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      <span>
                        <i className="far fa-file-pdf fa-10x" />
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={modalAttachmentData.shortAnswer[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      Short Answer
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center">No Short Answer Uploaded</div>
              )}
            </Col>

            <Col>
              {modalAttachmentData.extras !== null ? (
                <div className="text-center">
                  <div
                    style={{ height: 185 }}
                    className="justify-content-center"
                  >
                    <a
                      href={modalAttachmentData.extras[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      <span>
                        <i className="far fa-file-pdf fa-10x" />
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={modalAttachmentData.extras[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      Extracurriculars
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center">No extracurriculars Uploaded</div>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              {modalAttachmentData.recs !== null ? (
                <div className="text-center">
                  <div
                    style={{ height: 185 }}
                    className="justify-content-center"
                  >
                    <span>
                      <i className="far fa-file-pdf fa-10x" />
                    </span>
                  </div>
                  {modalAttachmentData.recs.map((e, i) => {
                    return (
                      <div>
                        <a
                          href={e.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="styled-link"
                        >
                          {" "}
                          {`Recommendation ${i + 1} - ${e.name.substring(
                            0,
                            10
                          )}`}
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center">No Recommendations Uploaded</div>
              )}
            </Col>

            <Col>
              {modalAttachmentData.endorsements !== null ? (
                <div className="text-center">
                  <div
                    style={{ height: 185 }}
                    className="justify-content-center"
                  >
                    <a
                      href={modalAttachmentData.endorsements[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      <span>
                        <i className="far fa-file-pdf fa-10x" />
                      </span>
                    </a>
                  </div>
                  <div>
                    <a
                      href={modalAttachmentData.endorsements[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="styled-link"
                    >
                      Endorsements
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-center">No endorsements uploaded</div>
              )}
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
