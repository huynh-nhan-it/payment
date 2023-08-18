import { Card, Layout, theme } from "antd";
import React, { useEffect, useState } from "react";
import { MdOutlineGroups } from "react-icons/md";
import "./setting.css";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import HeaderRequest from "../Request/HeaderRequest";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import NavbarSetting from "./components/System/Structure-Organization/Navbar/NavbarSetting";
import AppFooter from "../Request/component/Footer/footer";

const Setting = () => {
  const handleClickCard = () => { };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize(); // Kiểm tra trạng thái ban đầu
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <Layout>
        <HeaderRequest />
        <Content>
          <Layout>
            <Sider
              className="sider-request"
              style={{
                background: colorBgContainer,
                padding: "64px 0",
                position: "fixed",
                height: "100%",
                borderRight: "solid #ccc 0.1px",
              }}
              width={226}
              collapsedWidth="0"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}>
              <NavbarSetting />
            </Sider>
            <Content
              style={{ paddingLeft: collapsed ? "0" : "226px" }}
              className="content-request">
              <div className="padding-top-64">
                <h2 style={{ padding: " 10px 45px" }} className="display-flex">
                  System
                </h2>
                <div className="display-flex">
                  <Link to="/setting/system/department">
                    <Card
                      className="setting-card-content margin-20"
                      onClick={handleClickCard}>
                      <p>Organization Structure</p>
                      <div className="color-black fontsize-60">
                        <MdOutlineGroups />
                      </div>
                    </Card>
                  </Link>
                  <Link to="/setting/system/employee">
                    <Card className="setting-card-content margin-20">
                      <p style={{ height: 44 }}>Personnel</p>
                      <div className="color-black fontsize-60">
                        <BsFillPersonFill />
                      </div>
                    </Card>
                  </Link>
                </div>
              </div>
            </Content>
          </Layout>
        </Content>
        <div style={{width:"100%", position:"absolute", top:"unset", bottom:0}}>
          <AppFooter />
        </div>
      </Layout>
    </div>
  );
};

export default Setting;
