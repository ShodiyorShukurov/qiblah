import React, { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import curved6 from "assets/images/curved-images/curved14.jpg";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const registers = async (evt) => {
    evt.preventDefault();
    // const api = createApiInstance();

    try {
      const response = await fetch("https://srvr.qiblah.app/api/v1/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_email: login,
          admin_password: password,
        }),
      });

      const data = await response.json();

      // Status kodini tekshirish
      if (!response.ok) {
        throw new Error(data.message || "Xatolik yuz berdi");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }

      // Kelgan ma'lumotni chop etish
    } catch (error) {
      console.error("Xatolik:", error.message);
    }
  };

  return (
    <BasicLayout image={curved6}>
      <Card>
        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Register with
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={(evt) => registers(evt)}>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Login"
                autoComplete="username"
                onChange={(evt) => setLogin(evt.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </SoftBox>

            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="dark" fullWidth type="submit">
                Login
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
