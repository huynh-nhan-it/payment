import React, {useState } from "react";
import { AppDispatch } from "./Store";
import TableRequest from "./TableRequest";
import AttachmentRequest from "./AttachmentRequest";
import ApproverRequest from "./ApproverRequest";
import useFormData from "./useData";
import { useDispatch } from "react-redux";
import { submitForm } from "./SubmitAPI";
import { Button, Layout , theme } from "antd";
import { useNavigate } from "react-router-dom";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import HeaderRequest from "../Request/HeaderRequest";
import NavbarRequest from "../Request/NavbarRequest";
import Search from "antd/es/input/Search";
import { Col, Row } from "antd";
import { TiArrowBackOutline } from "react-icons/ti";
import { BsFillSendFill } from "react-icons/bs";
import { MdDrafts } from "react-icons/md";
import * as showError from "./showError";
import NewForm from "./NewForm";
import Swal from 'sweetalert2';

const App: React.FC = () => {
  const formData = useFormData();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const id = localStorage.getItem('id');
  let isSubmit: boolean = false;
  const handleFormSubmit = (typeSave: any, id: any) => {

    //Gọi action submitForm
    if (formData.form.purpose === '') {
      showError.PurposeError();
    }
    else if (formData.form.department === '') {
      showError.DepartmentError();
    }
    else if (formData.form.paymentFor === '') {
      showError.PaymentForError();
    }
    else if (formData.form.supplier === '') {
      showError.SupplierError();
    }
    else if (formData.form.currency === '') {
      showError.CurrencyError();
    }
    else if (formData.form.poPrNumber === 0) {
      showError.PoPrError();
    }
    else if ((formData.form.exchangeRate || formData.form.poPrNumber) < 0) {
      showError.NumberError();
    }
    else if (formData.approve.ListApproveAPI.length === 0) {
      showError.ApproverError();
    }
    else {
      dispatch(submitForm(formData, typeSave, id));
      Swal.fire({
        title: 'Congratulations!',
        html: 'Submit Request Successfully',
        icon: 'success', 
        confirmButtonText: 'OK'
      })
      console.log(formData, typeSave);
      navigate("/request/payment");
    }
  };

  const handleFormSubmitDraft = (typeSave: any, id: any) => {
    dispatch(submitForm(formData, typeSave, id));
    setTimeout(() => { navigate("/request/payment"); }, 2000);
  }

  return (

    <div>
      <Layout>
        <HeaderRequest />
        <Content style={{ zIndex: 1 }}>
          <Layout>
            <Sider
              className="sider-request"
              width={226}
              style={{
                background: colorBgContainer,
                padding: "64px 0",
                position: "fixed",
                zIndex: 2,
                height: "100%",
                borderRight: "solid #ccc 0.1px",
              }}
              collapsedWidth="0"
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <Search
                placeholder="input search text"
                // onSearch={onSearch}
                style={{
                  width: "100%",
                }}
              />
              <NavbarRequest />
            </Sider>
            <Content
              style={{ paddingLeft: collapsed ? "0" : "226px" }}
              className="content-request"
            >
              <Header
                style={{
                  minWidth: "100%",
                  background: "#ccc",
                  position: "fixed",
                  zIndex: 1,
                  top: "64px",
                  backgroundColor: "#F5F6FA",
                }}
              >
                <Row gutter={24} style={{ paddingLeft: "1.5%" }}>
                  <Col>
                    {" "}
                    <Button href="/request/payment" className="text-header">
                      {" "}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TiArrowBackOutline style={{ marginRight: "5px" }} />{" "}
                        Return
                      </div>
                    </Button>
                  </Col>
                  <Col>
                    <Button href="#" className="text-header">
                      {" "}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <MdDrafts
                          style={{ marginRight: "5px" }}
                          onClick={() => {
                            isSubmit = true;
                            handleFormSubmitDraft("save-draft", id);
                            Swal.fire({
                              title: 'Congratulations!',
                              html: 'Save-Draft Successfully',
                              icon: 'success', 
                              confirmButtonText: 'OK'
                            })
                          }}
                        />{" "}
                        Save Draft{" "}
                      </div>
                    </Button>
                  </Col>
                  <Col>
                    <Button href="#" className="text-header">
                      {" "}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <BsFillSendFill
                          style={{ marginRight: "5px" }}
                          onClick={() => {
                            isSubmit = true;
                            handleFormSubmit("create-request", id);
                          }}
                        />{" "}
                        Submit{" "}
                      </div>
                    </Button>
                  </Col>
                </Row>
              </Header>
              <div style={{ paddingTop: "100px" }}></div>
              <NewForm isSubmit={isSubmit} />
              <TableRequest />
              <AttachmentRequest />
              <ApproverRequest />
            </Content>
          </Layout>
        </Content>
      </Layout>
    </div>
  );
}


export default App;
