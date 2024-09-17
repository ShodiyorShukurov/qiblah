import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import AuthorsTable from "layouts/tables/data/authorsTableData";
import useNews from "hooks/UseNews";
import NewsModal from "./components/modal";

function News() {
  const {
    isLoading,
    data,
    error,
    handleClickOpen,
    open,
    handleClose,
    setOpen,
    selectItem,
    setSelectedItem,
    handleEdit,
    allUsers,
    setNext,
    next,
    handleEditStatus,
  } = useNews();
  const { columns, updatedRows } = AuthorsTable({ handleEdit, handleEditStatus });

  if (isLoading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  if (error) {
    return <DashboardLayout>{error}</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">News table</SoftTypography>
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
          <SoftBox mr={1}>
            {next > 1 ? (
              <SoftButton variant="text" color="dark" onClick={() => setNext(next - 1)}>
                Previous
              </SoftButton>
            ) : (
              <SoftButton variant="text" color="dark" disabled>
                Previous
              </SoftButton>
            )}
            {data.length > 10 && isLoading ? (
              <SoftButton variant="text" color="dark" onClick={() => setNext(next + 1)}>
                next
              </SoftButton>
            ) : (
              <SoftButton variant="text" color="dark" disabled>
                next
              </SoftButton>
            )}
          </SoftBox>
          <SoftBox>
            <SoftButton variant="gradient" color="dark" onClick={handleClickOpen}>
              <Icon sx={{ fontWeight: "bold" }}>add</Icon>&nbsp;Add
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <NewsModal
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
        selectItem={selectItem}
        setSelectedItem={setSelectedItem}
        allUsers={allUsers}
      />
      <Footer />
    </DashboardLayout>
  );
}

export default News;
