import axios from "axios";
import { useState } from "react";

import { Col, Row } from "antd";

// import CardContent from "./CardContent";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import CardContent from "./Card";
import { TopFooter, BottomFooter } from "./Footer";
import "./ApiCall.css";
import AppHeader from "./Header";
import { MdApproval, MdPayment } from "react-icons/md";
import {
  AiOutlineGift,
  AiOutlineFundProjectionScreen,
  AiOutlineWallet,
  AiFillSetting,
  AiOutlineLogout,
  AiFillCar,
  AiFillTags,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { HiOutlineUserGroup, HiOutlineRefresh } from "react-icons/hi";

import { IoHelpBuoy } from "react-icons/io5";

import {
  BsFolder,
  BsBox,
  BsFillUmbrellaFill,
  BsFillSendFill,
} from "react-icons/bs";

import { BiGitPullRequest, BiCollapse } from "react-icons/bi";
import { FaEarthAmericas } from "react-icons/fa6";
import { TfiTimer } from "react-icons/tfi";
import { FaPersonDress, FaFileContract } from "react-icons/fa6";
import { RiComputerLine } from "react-icons/ri";
import { Link, Route, Routes } from "react-router-dom";

const ApiCall = () => {
  const [data, setData] = useState([]);
  const url =
    "https://tasken.io/api/api/landingpage/tenant/8dc6957b-4869-4877-a511-6563f990d59e/landing-pages";
  const payload = "vi-Vn";

  const accessToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiIyZmI3NTIxNy1lMmY0LTQ1NWEtOGYyZC0xMDVmMWNkNGM0NTUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84ZGM2OTU3Yi00ODY5LTQ4NzctYTUxMS02NTYzZjk5MGQ1OWUvIiwiaWF0IjoxNjg3OTI0MDk3LCJuYmYiOjE2ODc5MjQwOTcsImV4cCI6MTY4NzkyNzk5NywiYW1yIjpbInB3ZCJdLCJjYyI6IkNtRGNiRzA2bGxLTVJWZ05LSzF2NmlEQUdIVXVRZDFqVEx4QWNpNGRiaGVjbzkvakhtdSt6WDhTRUx2c2F3eW1oS0dOMDBMYmVYR3dZUm9IZ24vN3A0VUl5RC85Y0RacG5GWVZhcEZQdVlTcDlBVEdTaS9SeC9iMDJad0lrV05XdGRnU0IyOHpOalV1ZG00YUVnb1FwUnVzMWxHdHVFQ2M0eGJVS0RoNll5SVNDaEFoOFBLd1lEMUdScXRiVFkxb2ZpMEFNZ0pCVXpnQlFna0pnSDk3b2ZCeTIwaEtDUW1BZjJoVnJsN2NTQT09IiwiZmFtaWx5X25hbWUiOiJOZ3V5ZW4gTWluaCIsImdpdmVuX25hbWUiOiJCYW5nIiwiaXBhZGRyIjoiNTguMTg3LjEzOC4yMDAiLCJuYW1lIjoiTmd1eeG7hW4gTWluaCBC4bqxbmciLCJub25jZSI6IjlkOTI5OTNhLWMxYWQtNDViNi1iMzNkLTg0MGYwZTBjYmQ4MyIsIm9pZCI6Ijg3ZmEyNjM4LWVlZmUtNDJkYS1iYWVjLTcwZmJiNmE1ZmQyMyIsInJoIjoiMC5BVk1BZTVYR2pXbElkMGlsRVdWai1aRFZuaGRTdHlfMDRscEZqeTBRWHh6VXhGVlRBQWsuIiwic3ViIjoiVFFBU000djYyLXA5Q0k1U3FDTVJtLWdSaE0yaGlGTlpYOVhBSl9GaDVvTSIsInRpZCI6IjhkYzY5NTdiLTQ4NjktNDg3Ny1hNTExLTY1NjNmOTkwZDU5ZSIsInVuaXF1ZV9uYW1lIjoiYmFuZ25tQG8zNjUudm4iLCJ1cG4iOiJiYW5nbm1AbzM2NS52biIsInV0aSI6IklmRHlzR0E5UmthclcwMk5hSDR0QUEiLCJ2ZXIiOiIxLjAifQ.db9itx6ydSsud9RWHFi80R6mRFx0gqKZPlkj-P4vU-BfQOT_N8ywEa7oPnr3gkNrVkqvRumg2Th3VIo0smxTl3WY1cND06d2Aa2drTQVJSzN8kOsSWGhFHfwy-RyAcUfdWsn7Nyb9IBuyMnjPYekMpQUD43Yivp5kdBeLThiw80q8xEcHSVkeh3OJO5qTvduO7Ci0q-mH5tcwlTeUAk8ojPoRD_BzifXaC_nBf1ezhcECe_Nazi-pBrRyatm1dM9MHU9mGOrbyN5tAjwVYffru8sQ3Sbjp3ezdwwGoZpxfbj0zh9BpJ1wB6FWv5br1bHU-TB-_2t9H0Zp-GqwUIwig"; // Replace 'your-access-token' with your actual access token

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  // console.log(iconname);

  axios
    .post(url, payload, config)
    .then((response) => {
      //   console.log("Response:", response.status);
      setData(response.data);
      // console.log(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  const icons = [
    <BiGitPullRequest />,
    <AiOutlineFundProjectionScreen />,
    <BsFolder />,
    <FaEarthAmericas />,
    <IoHelpBuoy />,
    <IoHelpBuoy />,
    <AiOutlineWallet />,
    <AiOutlineWallet />,
    <BiCollapse />,
    <AiFillSetting />,
    <AiFillSetting />,
    <TfiTimer />,
    <HiOutlineUserGroup />,
    <HiOutlineUserGroup />,
    <FaPersonDress />,
    <BsBox />,
    <RiComputerLine />,
    <AiOutlineLogout />,
    <AiFillCar />,
    <GrDocumentText />,
    <AiOutlineGift />,
    <FaFileContract />,
    <AiFillTags />,
    <AiOutlineGift />,
    <AiFillTags />,
    <AiFillTags />,
    <HiOutlineRefresh />,
    <BsFillUmbrellaFill />,
    <AiFillTags />,
    <MdPayment />,
    <MdApproval />,
    <MdApproval />,
    <HiOutlineRefresh />,
    <MdApproval />,
    <HiOutlineRefresh />,
    <AiOutlineShoppingCart />,
    <BsFillSendFill />,
    <BiGitPullRequest />,
    // Add the rest of the icons here (total of 46)
  ];
  const iconname = data.map((item) =>
    item.type === "buttonContent" ? item.icon : ""
  );
  const icon = iconname.filter((icon) => icon !== "");
  const mergedObject = {};
  icon.forEach((name, index) => {
    mergedObject[name] = icons[index];
  });
  const { Footer } = Layout;

  // #337ab7
  // console.log(mergedObject['ion-md-stats']);
  // console.log(icon);

  return (
    <div className="All">
      <AppHeader />
      <Content className="content">
        <Row gutter={[16, 16]} className="justify-center">
          {data.map((dt) =>
            dt.type === "buttonContent" ? (
              <Col
                className="content-col"
                key={dt.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                xl={4}>
                {dt.id !== 404 ? (
                  <CardContent
                    id={dt.id}
                    className={dt.icon}
                    icon={mergedObject[dt.icon]}
                    decription={dt.decription}
                    title={dt.title}
                  />
                ) : (
                  <Link to="/request/payment">
                    <CardContent
                      id={dt.id}
                      className={dt.icon}
                      icon={mergedObject[dt.icon]}
                      decription={dt.decription}
                      title={dt.title}
                    />
                  </Link>
                )}
              </Col>
            ) : (
              ""
            )
          )}
        </Row>
      </Content>
      <Footer className="footer">
        <Row gutter={[16, 16]} className="justify-center">
          {data.map((dt) =>
            dt.type === "topFooter" ? (
              <Col className="topfooter-col" key={dt.id}>
                <TopFooter decription={dt.decription} title={dt.title} />
              </Col>
            ) : (
              ""
            )
          )}
        </Row>
        <Row className="bottomfooter-row">
          {data.map((dt) =>
            dt.type === "bottomFooter" ? (
              <Col
                className="bottomfooter-col"
                key={dt.id}
                xs={24}
                sm={12}
                md={8}>
                <BottomFooter decription={dt.decription} title={dt.title} />
              </Col>
            ) : (
              ""
            )
          )}
        </Row>
      </Footer>
    </div>
  );
};

export default ApiCall;
