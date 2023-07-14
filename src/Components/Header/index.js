import React from "react";
import axios from "axios";
import { useState } from "react";
import { Layout } from "antd";
import UserOutlined from "@ant-design/icons";
import "./Header.css";
import MenuHeader from "./MenuHeader";
const { Header } = Layout;
const AppHeader = ({ title, decription }) => {
  // const [data, setData] = useState([]);
  // // https://tasken.io/api/api/landingpage/tenant/8dc6957b-4869-4877-a511-6563f990d59e?v=1688011765685
  // const url =
  //   "https://tasken.io/api/api/landingpage/tenant/8dc6957b-4869-4877-a511-6563f990d59e?v=1688011765685";
  // const payload = "v: 1688011765685";

  // const accessToken =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIyZmI3NTIxNy1lMmY0LTQ1NWEtOGYyZC0xMDVmMWNkNGM0NTUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84ZGM2OTU3Yi00ODY5LTQ4NzctYTUxMS02NTYzZjk5MGQ1OWUvIiwiaWF0IjoxNjg4MDEwNDc3LCJuYmYiOjE2ODgwMTA0NzcsImV4cCI6MTY4ODAxNDM3NywiYW1yIjpbInB3ZCJdLCJmYW1pbHlfbmFtZSI6Ik5ndXllbiBNaW5oIiwiZ2l2ZW5fbmFtZSI6IkJhbmciLCJpcGFkZHIiOiI1OC4xODcuMTM4LjIwMCIsIm5hbWUiOiJOZ3V54buFbiBNaW5oIELhurFuZyIsIm5vbmNlIjoiZmRiNGJjMWEtMWQyMC00OTcxLWI3ODYtZDNlNmFlYTIzNDY5Iiwib2lkIjoiODdmYTI2MzgtZWVmZS00MmRhLWJhZWMtNzBmYmI2YTVmZDIzIiwicmgiOiIwLkFWTUFlNVhHaldsSWQwaWxFV1ZqLVpEVm5oZFN0eV8wNGxwRmp5MFFYeHpVeEZWVEFBay4iLCJzdWIiOiJUUUFTTTR2NjItcDlDSTVTcUNNUm0tZ1JoTTJoaUZOWlg5WEFKX0ZoNW9NIiwidGlkIjoiOGRjNjk1N2ItNDg2OS00ODc3LWE1MTEtNjU2M2Y5OTBkNTllIiwidW5pcXVlX25hbWUiOiJiYW5nbm1AbzM2NS52biIsInVwbiI6ImJhbmdubUBvMzY1LnZuIiwidXRpIjoiRmF4c19McHRtRWFscnNfU1ZINUVBQSIsInZlciI6IjEuMCJ9.HJLVx1HV1Os33mGuGFysDqDX52uip4ywRY1MbIQxwWy2V5rXpdntAryBkPPK8RFKhM3XZucp-dnYTVUVeKBoq-4Br6n2XEGnbbJ-XoKWb8nHFxLrSSXyAQkPVQsIrkeGWtAxB6iLl3xAmDIpR6rW4KN7M9ISdOF09hfEYaXvCTjqoFwZAUuTx_ATKIN7p57X6Sdf3FoL7oVaaWT-YLTCeIsjGZtUKYZLATx2HvE61MqfZgy0zL6DBQ-MnU7wcMoiLGgAgD5fxi5Hf2IS5b2HHZE1lGwdw3RUB_Gg3AefDvnAP1XKqTYW2ctmpA30XBTmu9KNElZDGhw0OuHDpos3zg"; // Replace 'your-access-token' with your actual access token

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     "Content-Type": "application/json",
  //   },
  // };

  // axios
  //   .get(url, payload, config)
  //   .then((response) => {
  //     // console.log("Response:", response);
  //     setData(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  return (
    <Header className="header">
      <div className="logo-name">
        <img
          alt="Logo1"
          className="logo"
          src="https://www.mulesoft.com/sites/default/files/2021-01/opus%20logo%20final.png"
        />
        <div className="header-name">Opus solution</div>
      </div>
      <div className="header-homepage">
        {" "}
        <UserOutlined /> Bang Nguyen Minh
      </div>
      <div className="header-homepage">Trang chủ</div>
    </Header>
  );
};

export default AppHeader;
