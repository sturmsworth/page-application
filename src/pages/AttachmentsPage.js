import React, { useContext, useEffect, useState } from "react";

// context
import { AuthContext } from "../context/AuthContext";
import { AttachmentsContext } from "../context/AttachmentsContext";
import { MetaDataContext } from "../context/MetaDataContext";

// router
import { Redirect } from "react-router";

// routes
import { SUBMISSION_SUCCESS } from "../routes";

// constants
import {
  essayTopics,
  shortAnswerTopics,
  extrasFormURL,
  endorsementsFormURL,
} from "../utils/constants";

// bootstrap
import Col from "react-bootstrap/Col";

// components
import CustomContainerForForms from "../components/CustomContainerForForms";
import CustomDropzone from "../components/CustomDropzone";
import CustomButton from "../components/CustomButton";

const AttachmentsPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { metaData, updateMetaDataDocument, setMetaData } =
    useContext(MetaDataContext);
  const { updateAttachmentsDocument, attachmentsData } =
    useContext(AttachmentsContext);

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = () => {
    setMetaData((p) => {
      return {
        ...p,
        attachments: "completed",
        attachmentsLastTouched: new Date(),
        attachmentsCompleted: true,
      };
    });
  };

  useEffect(() => {
    let isMounted = true;

    const doThis = async () => {
      await updateAttachmentsDocument(currentUser, attachmentsData);
      await updateMetaDataDocument(currentUser, metaData);
    };

    doThis();

    if (isMounted && metaData.attachmentsCompleted) {
      setRedirect(true);
    }
    return () => {
      isMounted = false;
    };

    // eslint-disable-next-line
  }, [attachmentsData, metaData]);

  return redirect ? (
    <Redirect to={SUBMISSION_SUCCESS} />
  ) : (
    <CustomContainerForForms>
      <Col className="mt-5">
        <div>
          <h3 className="cinzel">Attachments</h3>
          <div className="p-2">
            Please read this carefully before submitting attachments:
          </div>
          <div className="p-2">
            Applicants will need to attach a total of (at least) five files in
            order to complete this portion of the application. Once all the
            required files have been detected, the system will allow you to mark
            this portion as complete.
          </div>
          <ul className="text-left">
            <li>
              <u>Applicant Photo</u> - headshot or recent photograph no more
              than 10MB in size.
            </li>
            <li>
              <u>School Endorsement Form</u> - The form can be downloaded{" "}
              <a
                href={endorsementsFormURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              . It is required. Filetype must be PDF no more than 5MB in size.
            </li>
            <li>
              <u>Applicant Extracurricular Activities</u> - The form can be
              downloaded{" "}
              <a href={extrasFormURL} target="_blank" rel="noopener noreferrer">
                here
              </a>
              . It is required. Filetype must be PDF no more than 5MB in size.
            </li>
            <li>
              <u>Applicant Essay</u> - Filetype must be PDF no more than 5MB in
              size. We <i>WILL NOT</i> accept Word Document or TXT formats.
              (Please refer to{" "}
              <a
                href="https://support.office.com/en-gb/article/save-or-convert-to-pdf-or-xps-d85416c5-7d77-4fd6-a216-6f4bf7c7c110?ui=en-US&rs=en-GB&ad=GB"
                target="_blank"
                rel="noopener noreferrer"
              >
                this guide
              </a>{" "}
              for assistance converting Word Documents to PDF)
            </li>
            <li>
              <u>Letters of Recommendation</u> - We now accept multiple files
              for this option. <i>No more than two letters will be accepted.</i>{" "}
              Each filetype must be PDF no more than 5MB in size.{" "}
            </li>
          </ul>
          <div className="pb-2">
            All attachments are automatically saved once uploaded. You can come
            back and view or delete them at any time.
          </div>
          <div className="text-secondary">
            <span className="text-danger">*</span> Indicates a required field.
          </div>
        </div>

        <div>
          <h3 className="cinzel py-3">
            Applicant Photo <span className="text-danger">*</span>
          </h3>
          <CustomDropzone attachmentType="photo" />

          <h3 className="cinzel py-3">
            School Endorsement <span className="text-danger">*</span>
          </h3>
          <CustomDropzone attachmentType="endorsements" />

          <h3 className="cinzel py-3">
            Extracurricular Activities <span className="text-danger">*</span>
          </h3>
          <CustomDropzone attachmentType="extras" />

          <h3 className="cinzel py-3">
            Short Answer Question <span className="text-danger">*</span>
          </h3>
          <div className="col-12">
            <p>Please complete the following short answer question:</p>
            <ul className="text-left">
              {shortAnswerTopics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
          <CustomDropzone attachmentType="shortAnswer" />

          <h3 className="cinzel pt-3 pb-2">
            Essay <span className="text-danger">*</span>
          </h3>
          <div className="col-12">
            <p>
              Choose{" "}
              <i>
                <u>one</u>
              </i>{" "}
              of the following options. Each essay must have a word count of
              300.
            </p>
            <ol className="text-left">
              {essayTopics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ol>
          </div>
          <CustomDropzone attachmentType="essay" />

          <h3 className="cinzel py-3">
            Letter(s) of Recommendation <span className="text-danger">*</span>
          </h3>
          <p>
            If your recommendations are two separate files, you must upload both
            at once.
          </p>
          <CustomDropzone attachmentType="recs" />
        </div>

        {attachmentsData.endorsements &&
        attachmentsData.essay &&
        attachmentsData.extras &&
        attachmentsData.photo &&
        attachmentsData.shortAnswer &&
        attachmentsData.recs ? (
          <CustomButton
            buttonType="btn custom-btn"
            name="Mark as Complete"
            handleClick={handleSubmit}
          />
        ) : (
          <CustomButton
            buttonType="btn custom-btn"
            name="Mark as Complete"
            handleClick={handleSubmit}
            disabled={true}
          />
        )}
      </Col>
    </CustomContainerForForms>
  );
};

export default AttachmentsPage;
