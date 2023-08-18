import React, { useEffect, useState } from "react";

import PaymentAll from "./component/Payment";
import { Layout, theme } from "antd";
import HeaderRequest from "./HeaderRequest";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Search from "antd/es/input/Search";
import NavbarRequest from "./NavbarRequest";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "./component/store/store"
import { applySearch } from "./component/actions/actions";
import './request.css'
import AppFooter from "./component/Footer/footer";

interface SearchProps extends ConnectedProps<typeof connector> { }

const Request: React.FC<SearchProps> = ({ applySearch }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [valueSearch, setValueSearch] = useState('')
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleSearch = (e: any) => {
    setValueSearch(e)
  }
  applySearch(valueSearch)

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
  // console.log(valueSearch);
  return (
    <div>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        <HeaderRequest />
        <Content
        style={{ flex: 1, overflow: 'auto' }}
        >
          <Layout>
            <Sider
              width={226}
              className="sider-request"
              style={{
                background: colorBgContainer,
                padding: "64px 0",
                position: "fixed",
                height: "100%",
                borderRight: "solid #ccc 0.1px",
              }}
              collapsedWidth="0"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}>
              <Search
                placeholder="input search text"
                onSearch={(e) => handleSearch(e)}
                style={{
                  width: "100%",
                }}
              />
              <NavbarRequest />
            </Sider>
            <Content
              style={{ paddingLeft: collapsed ? "0" : "226px" }}
              className="content-request">
              <PaymentAll />
            </Content>
          </Layout>
        </Content>
        <AppFooter/>
      </Layout>
    </div>
  );
};


// Hàm mapStateToProps để map state từ Redux store thành props của component
const mapStateToProps = (state: RootState) => {
  return {};
};

// Hàm mapDispatchToProps để map các action creators thành props của component
const mapDispatchToProps = {
  applySearch,
};

// Kết nối component với Redux store
const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Request);