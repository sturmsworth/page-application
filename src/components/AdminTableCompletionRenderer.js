import React, { useContext } from "react";

import { Button, OverlayTrigger, Popover, Row, Col } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";

const AdminTableCompletionRenderer = ({ row }) => {
  const { setCurrentEmail } = useContext(TableDataContext);
  return (
    <div {...row.getToggleRowExpandedProps()}>
      <div
        onClick={() => {
          setCurrentEmail(row.original.email);
        }}
      >
        <span
          className={
            row.original.completed === "Complete"
              ? "text-success"
              : "text-danger"
          }
        >
          {`${row.original.completed}`}
          {/* Overlay Trigger and everything inside it controls the tooltip layout */}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 0 }}
            overlay={
              <Popover id="applicant-status-quick-look">
                <Popover.Title>Applicant Quick View</Popover.Title>
                <Popover.Content>
                  <Row className="py-2 my-2">
                    <Col>
                      <div>
                        <b>Terms:</b>
                      </div>
                      <div>
                        {row.original.terms
                          ? row.original.terms
                          : "Not Yet Started"}
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2 my-2">
                    <Col>
                      <div>
                        <b>Applicant Info:</b>
                      </div>
                      <div>
                        {row.original.applicantInfo
                          ? row.original.applicantInfo
                          : "Not Yet Started"}
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2 my-2">
                    <Col>
                      <div>
                        <b>Guardian Info:</b>
                      </div>
                      <div>
                        {row.original.guardianInfo
                          ? row.original.guardianInfo
                          : "Not Yet Started"}
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2 my-2">
                    <Col>
                      <div>
                        <b>Misc Info:</b>
                      </div>
                      <div>
                        {row.original.miscInfo
                          ? row.original.miscInfo
                          : "Not Yet Started"}
                      </div>
                    </Col>
                  </Row>

                  <Row className="py-2 my-2">
                    <Col>
                      <div>
                        <b>Attachments:</b>
                      </div>
                      <div>
                        {row.original.attachments
                          ? row.original.attachments
                          : "Not Yet Started"}
                      </div>
                    </Col>
                  </Row>
                </Popover.Content>
              </Popover>
            }
          >
            <Button size="sm" className="custom-link mx-3">
              More{" "}
              <i
                className={
                  row.isExpanded ? "fas fa-caret-down" : "fas fa-caret-right"
                }
              />
            </Button>
          </OverlayTrigger>
        </span>
      </div>
    </div>
  );
};

export default AdminTableCompletionRenderer;
