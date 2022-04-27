import React, { useState, useContext, useEffect } from "react";

// moment
import moment from "moment";

// router
import { useHistory } from "react-router-dom";

// routes
import {
  APPLICANT_INFO,
  ATTACHMENTS,
  GUARDIAN_INFO,
  MISC_INFO,
  TERMS,
} from "../routes";

// context
import { AuthContext } from "../context/AuthContext";
import { MetaDataContext } from "../context/MetaDataContext";

// bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

// components
import CustomButton from "../components/CustomButton";

// styles
import "../styles/MyAccountFormCards.scss";

const MyAccountFormCards = ({ formName, formDescription, storeName, link }) => {
  const { currentUser } = useContext(AuthContext);
  const { metaData, setMetaData, updateMetaDataDocument } =
    useContext(MetaDataContext);
  const [loading, setLoading] = useState(false);
  const [sn, setSN] = useState(null);

  const { push } = useHistory();

  const handleClick = async () => {
    setLoading(true);
    setSN(storeName);
    setMetaData((prev) => {
      return {
        ...prev,
        [storeName]: "started",
        [`${storeName}LastTouched`]: new Date(),
        [`${storeName}Completed`]: false,
        applicationStatus:
          "You've begun your application! Feel free to take a break at any time, you'll be able to resume right where you left off the next time you log in.",
      };
    });
  };

  useEffect(() => {
    let isMounted = true;

    const doThis = async () => {
      await updateMetaDataDocument(currentUser, metaData);
    };

    doThis();

    if (isMounted) {
      if (sn === "terms") {
        setLoading(false);
        push(TERMS);
      } else if (sn === "applicantInfo") {
        setLoading(false);
        push(APPLICANT_INFO);
      } else if (sn === "guardianInfo") {
        setLoading(false);
        push(GUARDIAN_INFO);
      } else if (sn === "miscInfo") {
        setLoading(false);
        push(MISC_INFO);
      } else if (sn === "attachments") {
        setLoading(false);
        push(ATTACHMENTS);
      }
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line
  }, [sn, loading]);

  return (
    <Row className="text-center my-5">
      <Col className="status py-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="grow" variant="secondary" />
          </div>
        ) : (
          <div>
            <div className="h3">{formName}</div>
            <div>{formDescription}</div>
            {metaData[storeName] && metaData[`${storeName}Completed`] ? (
              <div className="pt-3 text-secondary">
                Completion Date:{" "}
                {moment(metaData[`${storeName}LastTouched`].toDate()).format(
                  `MMMM Do YYYY, h:mm:ss a`
                )}
              </div>
            ) : null}
            <CustomButton
              name={
                metaData[storeName] && !metaData.completed
                  ? "Edit"
                  : metaData.completed
                  ? "Locked for Review"
                  : "Get Started"
              }
              buttonType="btn"
              handleClick={() => handleClick()}
              disabled={metaData.completed}
            />
          </div>
        )}
      </Col>
    </Row>
  );
};

export default MyAccountFormCards;
