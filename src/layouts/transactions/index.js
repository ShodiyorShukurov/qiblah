import React, { useRef } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import useTransaction from "hooks/UseTransaction";
import TransactionData from "layouts/transactions/data/TransactionsData";


function Transactions() {
  const { isLoading, data, error,  setNext, next,} = useTransaction();
  const { columns, updatedRows } = TransactionData(data);

  if (isLoading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  if (error) {
    return <DashboardLayout>{error.message}</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Transactions table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={updatedRows} />
            </SoftBox>
          </Card>
        </SoftBox>

        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftBox>
            {next > 1 && (
              <SoftButton variant="text" color="dark" onClick={() => setNext(next - 1)}>
                Previous
              </SoftButton>
            )}
            {data && data.length >= 50 && !isLoading && (
              <SoftButton variant="text" color="dark" onClick={() => setNext(next + 1)}>
                Next
              </SoftButton>
            )}
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Transactions;
