import React, { useContext, useState } from "react";

// dropzone
import Dropzone from "react-dropzone";

// bootstrap
import { Row, Col, Spinner } from "react-bootstrap";

// context
import { AttachmentsContext } from "../context/AttachmentsContext";
import { AuthContext } from "../context/AuthContext";

// components
import AttachmentsPreview from "./AttachmentsPreview";

// styles
import "../styles/CustomDropzone.scss";

const CustomDropzone = ({ attachmentType }) => {
  const { currentUser } = useContext(AuthContext);
  const {
    attachmentsData,
    setAttachmentsData,
    uploadFileAndGetURL,
    uploadRecsGetURLAndReturnDataArray,
  } = useContext(AttachmentsContext);

  const [dropError, setDropError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDrop = async (acceptedFiles) => {
    setLoading(true);
    if (acceptedFiles.length >= 1) {
      setDropError(null);

      if (attachmentType === "recs") {
        if (acceptedFiles.length > 2) {
          return;
        }

        try {
          await uploadRecsGetURLAndReturnDataArray(
            currentUser,
            acceptedFiles,
            setAttachmentsData
          );
          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          const url = await uploadFileAndGetURL(
            currentUser,
            attachmentType,
            acceptedFiles[0]
          );

          setAttachmentsData((p) => {
            return {
              ...p,
              [attachmentType]: acceptedFiles.map((file) => {
                return {
                  lastModified: file.lastModified,
                  name: file.name,
                  path: file.path,
                  size: file.size,
                  type: file.type,
                  webkitRelativePath: file.webkitRelativePath,
                  url,
                };
              }),
            };
          });

          setLoading(false);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  return (
    <div>
      <Dropzone
        onDrop={handleDrop}
        accept={attachmentType === "photo" ? "image/*" : "application/PDF"}
        minSize={1024}
        maxSize={attachmentType === "photo" ? 6000000 : 5000000}
        maxFiles={attachmentType === "recs" ? 2 : 1}
        disabled={attachmentsData[attachmentType] ? true : false}
        onDropRejected={() => {
          setDropError(
            "Your file was rejected. Please make sure it meets all the requirements outlined in the instructions above and is of the correct file type."
          );
          setLoading(false);
        }}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject,
        }) => {
          const additionalClass = isDragAccept
            ? "accept"
            : isDragReject
            ? "reject"
            : "";

          const previewClass = attachmentsData[attachmentType]
            ? "preview-document"
            : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass} ${previewClass}`,
              })}
            >
              {/* {loading ?? <Loading />} */}
              {loading ? (
                <Row className="text-center py-3 my-3">
                  <Col>
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="secondary" />
                  </Col>
                </Row>
              ) : attachmentsData[attachmentType] ? (
                <AttachmentsPreview attachmentType={attachmentType} />
              ) : (
                <div>
                  <input {...getInputProps()} />
                  <span>{isDragActive ? "📂" : "📁"}</span>
                  {dropError ? (
                    <p style={{ color: "#d83b01" }}>{dropError}</p>
                  ) : (
                    <p>Drag and drop files, or click to open file select.</p>
                  )}
                </div>
              )}
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};

export default CustomDropzone;
