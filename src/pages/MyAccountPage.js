import React, { useContext, useState, useEffect } from "react";

// firebase
import firebase from "firebase";

// moment
import moment from "moment";

// context
import { AuthContext } from "../context/AuthContext";
import { MetaDataContext } from "../context/MetaDataContext";
import { FormContext } from "../context/FormContext";
import { AttachmentsContext } from "../context/AttachmentsContext";

// constants
import { dueDate, formsOverview } from "../utils/constants";

// bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components
import Status from "../components/Status";
import YouLookNewHere from "../components/YouLookNewHere";
import ProgressTracker from "../components/ProgressTracker";
import FormDownloads from "../components/FormDownloads";
import MyAccountFormCards from "../components/MyAccountFormCards";
import CustomButton from "../components/CustomButton";
import Loading from "../components/Loading";

// styles
import "../styles/MyAccountPage.scss";

const MyAccountPage = () => {
  const [loading, setLoading] = useState(true);
  const {
    currentUser,
    getUserDocument,
    createUserDocument,
    updateUserDocument,
  } = useContext(AuthContext);
  const {
    metaData,
    setMetaData,
    createMetaDataDocument,
    getMetaDataDocument,
    updateMetaDataDocument,
    percentage,
  } = useContext(MetaDataContext);
  const { setFormData, createFormDocument, getFormDocument } =
    useContext(FormContext);
  const {
    createAttachmentsDocument,
    getAttachmentsDocument,
    setAttachmentsData,
  } = useContext(AttachmentsContext);

  const displayYear = new Date().getFullYear() + 1;

  const submitApplication = () => {
    setMetaData((p) => {
      return {
        ...p,
        completed: !metaData.completed,
        completedAt: !metaData.completed ? new Date() : null,
        applicationStatus: !metaData.completed
          ? "Thank you. Your application is now complete. If you do not receive a confirmation e-mail within five business days, please contact us. The review process for admission to the Senate Page Program typically takes one and a half months to complete. All applicants will be notified, typically by mid-December."
          : "You've begun your application! Feel free to take a break at any time, you'll be able to resume right where you left off the next time you log in.",
      };
    });
  };

  useEffect(() => {
    const lastLogin = new Date();
    if (currentUser) {
      (async () => {
        const userDoc = await getUserDocument(currentUser);

        if (userDoc.exists) {
          await updateUserDocument(currentUser, { lastLogin });
        } else {
          await createUserDocument(currentUser);
        }

        const metaDoc = await getMetaDataDocument(currentUser);

        if (metaDoc.exists) {
          await setMetaData(metaDoc.data());
        } else {
          await createMetaDataDocument(currentUser);
          const doc = await getMetaDataDocument(currentUser);

          if (doc.exists) {
            setMetaData(doc.data());
          }
        }

        const formDoc = await getFormDocument(currentUser);

        if (formDoc.exists) {
          setFormData(formDoc.data());
        } else {
          await createFormDocument(currentUser);
          const doc = await getFormDocument(currentUser);

          if (doc.exists) {
            setFormData(doc.data());
          }
        }

        const attachmentsDoc = await getAttachmentsDocument(currentUser);

        if (attachmentsDoc.exists) {
          setAttachmentsData(attachmentsDoc.data());
        } else {
          await createAttachmentsDocument(currentUser);
          const doc = await getAttachmentsDocument(currentUser);

          if (doc.exists) {
            setAttachmentsData(doc.data());
          }
        }
        setLoading(false);
      })();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    updateMetaDataDocument(currentUser, metaData);

    //eslint-disable-next-line
  }, [metaData]);

  return loading ? (
    <Loading />
  ) : (
    <Container className="pt-5">
      <Row className="pt-5">
        <Col className="text-center pt-5">
          <div className="h3 cinzel">{`Welcome, ${currentUser.displayName}`}</div>
          <div>{`Thank you for your interest in the ${displayYear} Senate Page Program`}</div>
          <div>{`Applications must be submitted by ${dueDate}`}</div>
        </Col>
      </Row>
      <Status />

      {metaData.completed ? (
        <Row className="text-center">
          <Col lg={{ span: 8, offset: 2 }}>
            <div className="text-secondary">
              Submission Date:{" "}
              {
                /* checks to see if timestamp is a regular Date object, or an instance of firebase Timestamp */
                metaData.completedAt instanceof firebase.firestore.Timestamp
                  ? moment(metaData.completedAt.toDate()).format(
                      `MMMM Do YYYY, h:mm:ss a`
                    )
                  : moment(metaData.completedAt).format(
                      `MMMM Do YYYY, h:mm:ss a`
                    )
              }
            </div>
          </Col>
        </Row>
      ) : null}

      {percentage < 100 ? (
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <CustomButton
              buttonType="custom-button btn btn-lg btn-block"
              name={"Mark Application as Complete"}
              disabled={true}
            />
          </Col>
        </Row>
      ) : null}

      {percentage === 100 && !metaData.completed ? (
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <CustomButton
              buttonType="custom-button btn btn-lg btn-block"
              name={"Mark Application as Complete"}
              handleClick={submitApplication}
            />
          </Col>
        </Row>
      ) : null}

      {percentage === 100 && metaData.completed ? (
        <Row>
          <Col lg={{ span: 8, offset: 2 }}>
            <CustomButton
              buttonType="custom-button btn btn-lg btn-block"
              name={"Application Completed"}
              disabled={true}
            />
          </Col>
        </Row>
      ) : null}

      <Row>
        <Col md={12} lg={6}>
          <YouLookNewHere />
          <ProgressTracker />
          <FormDownloads />
        </Col>
        <Col md={12} lg={6}>
          {formsOverview.map((form) => (
            <MyAccountFormCards
              formName={form.formName}
              formDescription={form.formDescription}
              key={form.formName}
              link={form.link}
              storeName={form.storeName}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccountPage;
