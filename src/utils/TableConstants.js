import AdminTableCompletionRenderer from "../components/AdminTableCompletionRenderer";

export const adminColumns = [
  {
    Header: "Applicant Information",
    columns: [
      {
        Header: "Name",
        accessor: "displayName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
    ],
  },
  {
    Header: "Application Status",
    columns: [
      {
        Header: "Completion Status",
        id: "Expanded Status",
        accessor: "completed",
        Cell: (row) => AdminTableCompletionRenderer(row),
      },
      {
        Header: "District",
        accessor: "district",
      },
      {
        Header: "Senator",
        accessor: "senator",
      },
    ],
  },
];
