import React, { useContext, useState } from "react";
import { CSVLink } from "react-csv";

// components
import CustomContainer from "../components/CustomContainerForForms";
import AdminTable from "../components/AdminTable";
import AdminChooseYear from "../components/AdminChooseYear";
import AdminFilterSettings from "../components/AdminFilterSettings";
import AdminTermsModal from "../components/AdminTermsModal";
import AdminApplicantModal from "../components/AdminApplicantModal";
import AdminGuardianModal from "../components/AdminGuardianModal";
import AdminAttachmentsModal from "../components/AdminAttachmentsModal";
import AdminMiscModal from "../components/AdminMiscModal";
import CustomButton from "../components/CustomButton";

// bootstrap
import { Col, Row } from "react-bootstrap";

// table columns
import { adminColumns } from "../utils/TableConstants";

// context
import { TableDataContext } from "../context/TableDataContext";

const AdminDashboardPage = () => {
  const { tableMetaData, tableLoading, year, getCSVData, csvData } =
    useContext(TableDataContext);
  const [showCompletedChecked, setShowCompletedChecked] = useState(false);

  return (
    <CustomContainer>
      <Col>
        <Row className="pt-3 mt-3">
          <Col>
            <span className="h3 cinzel">{`${year} Applicant Data`}</span>
          </Col>
        </Row>

        <Row>
          <Col>
            <AdminChooseYear />
          </Col>
        </Row>
        <Row className="pt-2 mt-2">
          <Col>
            <AdminFilterSettings
              showCompletedChecked={showCompletedChecked}
              setShowCompletedChecked={setShowCompletedChecked}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {tableLoading ? (
              <div>Loading...</div>
            ) : (
              <AdminTable columns={adminColumns} data={tableMetaData} />
            )}
          </Col>
        </Row>

        <Row className="pt-5">
          <Col>
            <div>
              Click Generate CSV to create a spreadsheet of completed
              applicants. Once the CSV is generated a download button will
              appear. Click that to download the data and open it in excel.
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <CustomButton name="Generate CSV" handleClick={getCSVData} />
          </Col>
        </Row>

        {csvData ? (
          <Row>
            <Col>
              <CSVLink
                data={csvData}
                headers={[
                  {
                    label: "Prefix",
                    key: "prefix",
                  },
                  {
                    label: "First Name",
                    key: "fName",
                  },
                  {
                    label: "Middle Name",
                    key: "mName",
                  },
                  {
                    label: "Last Name",
                    key: "lName",
                  },
                  {
                    label: "Preferred Name",
                    key: "nickname",
                  },
                  {
                    label: "Address One",
                    key: "addressOne",
                  },
                  {
                    label: "Address Two",
                    key: "addressTwo",
                  },
                  {
                    label: "City",
                    key: "city",
                  },
                  {
                    label: "State",
                    key: "state",
                  },
                  {
                    label: "Zip Code",
                    key: "zip",
                  },
                ]}
                filename={`Completed-Pages-${year}`}
                className="btn custom-button"
              >
                Download CSV
              </CSVLink>
            </Col>
          </Row>
        ) : null}
      </Col>

      <AdminTermsModal />
      <AdminApplicantModal />
      <AdminGuardianModal />
      <AdminMiscModal />
      <AdminAttachmentsModal />
    </CustomContainer>
  );
};

export default AdminDashboardPage;
