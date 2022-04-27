import React, { useContext } from "react";

import { Form } from "react-bootstrap";

import { TableDataContext } from "../context/TableDataContext";
import { AuthContext } from "../context/AuthContext";

const AdminFilterSettings = () => {
  const {
    setShowAllChecked,
    showAllChecked,
    showCompletedChecked,
    setShowCompletedChecked,
    showDistrictsChecked,
    setShowDistrictsChecked,
  } = useContext(TableDataContext);

  const { currentSenator } = useContext(AuthContext);
  return (
    <Form>
      <div className="mb-3">
        <Form.Check
          inline
          label="Show All Applicants"
          name="all-info"
          type={"radio"}
          id={`show-all-radio`}
          value={showCompletedChecked}
          checked={showAllChecked ? true : false}
          onChange={() => {
            if (showDistrictsChecked) {
              setShowDistrictsChecked(false);
            }

            if (showCompletedChecked) {
              setShowCompletedChecked(false);
            }

            setShowAllChecked(!showAllChecked);
          }}
          className="mx-5"
        />

        <Form.Check
          inline
          label="Only Show Completed Applications"
          name="completed"
          type={"radio"}
          id={`show-only-completed-radio`}
          value={showCompletedChecked}
          checked={showCompletedChecked ? true : false}
          onChange={() => {
            if (showDistrictsChecked) {
              setShowDistrictsChecked(false);
            }

            if (setShowAllChecked) {
              setShowAllChecked(false);
            }

            setShowCompletedChecked(!showCompletedChecked);
          }}
          className="mr-5"
        />

        {!currentSenator ? (
          <Form.Check
            inline
            label="Only Show Applicants With Districts"
            name="districts"
            type={"radio"}
            id={`show-only-districts-radio`}
            value={showDistrictsChecked}
            checked={showDistrictsChecked ? true : false}
            onChange={() => {
              if (showCompletedChecked) {
                setShowCompletedChecked(false);
              }

              if (setShowAllChecked) {
                setShowAllChecked(false);
              }

              setShowDistrictsChecked(!showDistrictsChecked);
            }}
          />
        ) : null}
      </div>
    </Form>
  );
};

export default AdminFilterSettings;
