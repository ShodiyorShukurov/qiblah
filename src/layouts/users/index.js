import React, { useRef } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import UsersData from "layouts/users/data/UsersData";
import useUsers from "hooks/UseUsers";

function Users() {
  const { isLoading, data, error, setUserRoute, setNext, next, setUser } = useUsers();
  const { columns, updatedRows } = UsersData(data);
  const searchNameRef = useRef(null);
  const searchPhoneRef = useRef(null);

  const handleSearch = (evt) => {
    evt.preventDefault();
    // Implement search functionality
  };

  const handleSortById = (value) => {
    // Implement sorting functionality
  };

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
            <form
              className="d-flex flex-column flex-md-row justify-content-between align-items-center p-3"
              onSubmit={handleSearch}
            >
              <input
                className="form-control mb-2 mb-md-0 me-md-2"
                type="number"
                placeholder="Id search"
                onChange={(evt) => handleSortById(evt.target.value)}
              />
              <input
                className="form-control mb-2 mb-md-0 me-md-2"
                type="text"
                placeholder="Username"
                ref={searchNameRef}
              />
              <input
                className="form-control mb-2 mb-md-0 me-md-2"
                type="tel"
                placeholder="Phone Number"
                ref={searchPhoneRef}
              />
              <select
                className="form-select mb-2 mb-md-0 me-md-2"
                onChange={(evt) => setUser(evt.target.value)}
              >
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
              <select
                className="form-select mb-2 mb-md-0 me-md-2"
                onChange={(evt) => setUserRoute(evt.target.value)}
              >
                <option value="users">All Users</option>
                <option value="users/premium">Premium Users</option>
              </select>
              <button className="btn btn-outline-primary">Submit</button>
            </form>

            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Users table</SoftTypography>
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

export default Users;
