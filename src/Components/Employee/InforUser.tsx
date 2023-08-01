import React, { useEffect, useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import "./employee.css";
import { TabsProps, Upload, message } from "antd";
import { Tabs } from "antd";
import Overview from "./Overview";
import Additional from "./Additional";
import Family from "./Family";
import Properties from "./Properties";
import Signature from "./Signature";
import request from "../../Services/User/getAccount";
import { AiOutlineSave } from "react-icons/ai";
import { Header } from "antd/es/layout/layout";
import { TiArrowBackOutline } from "react-icons/ti";
import { UserInfo } from "./Interface";
import axios from "axios";
import ImgCrop from "antd-img-crop";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const InforUser = () => {
  const [dataOverview, setDataOverview] = useState<Record<string, string>>({});
  const [dataName, setDataName] = useState("");
  const [dataSignature, setDataSignature] = useState<Record<string, string>>(
    {}
  );
  const [dataFamily, setDataFamily] = useState<Record<string, string>>({});
  const [dataAdditional, setDataAdditional] = useState<Record<string, string>>(
    {}
  );
  const [dataAvatar, setDataAvatar] = useState("");
  const [signaturePath, setSignaturePath] = useState("");
  const [dataEmployee, setDataEmployee] = useState<UserInfo>();
  const [avatar, setAvatar] = useState<Blob | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);

  const id = localStorage.getItem("id");

  useEffect(() => {
    const getUserInfor = async () => {
      const endpoint = "/Personal/EmployeeInfo?Id=" + id;
      request.get(endpoint).then((res) => {
        setDataName(
          res.data.userInfo.FirstName + " " + res.data.userInfo.LastName
        );

        setDataEmployee(res.data.userInfo);
        if (res.data.avt) {
          setDataAvatar(res.data.avt);
        }
        if (res.data.sig) {
          setSignaturePath(res.data.sig);
        }
        // console.log(res.data.userInfo.Avatar);

        setDataSignature(res.data.userInfo.Signature);
        if (res.data.userInfo.Additional) {
          const sanitizedAdditionalData: Record<string, string> = {};
          Object.entries(res.data.userInfo.Additional).forEach(
            ([key, value]) => {
              if (typeof value === "string") {
                sanitizedAdditionalData[key] = value;
              } else {
                sanitizedAdditionalData[key] = "";
              }
            }
          );
          setDataAdditional(sanitizedAdditionalData);
        }
        if (res.data.userInfo.Overview) {
          const sanitizedOverviewData: Record<string, string> = {};
          Object.entries(res.data.userInfo.Overview).forEach(([key, value]) => {
            if (typeof value === "string") {
              sanitizedOverviewData[key] = value;
            } else if (typeof value === "number") {
              sanitizedOverviewData[key] = String(value);
            } else {
              sanitizedOverviewData[key] = "";
            }
          });
          setDataOverview(sanitizedOverviewData);
        }
        if (res.data.userInfo.Family) {
          const sanitizedFamilyData: Record<string, string> = {};
          Object.entries(res.data.userInfo.Family).forEach(([key, value]) => {
            if (typeof value === "string") {
              sanitizedFamilyData[key] = value;
            } else {
              sanitizedFamilyData[key] = "";
            }
          });
          setDataFamily(sanitizedFamilyData);
        }
      });
    };

    getUserInfor();
  }, [id]);

  console.log(dataSignature);

  const newDataOverview = {
    "First name": dataEmployee?.FirstName,
    "Last name": dataEmployee?.LastName,
    Login: dataEmployee?.Email,
    Email: dataEmployee?.Email,
    "Job Title": dataEmployee?.JobTitle,
  };
  const mergedObject = { ...newDataOverview, ...dataOverview };

  // const newDataSignature = {
  //   'imgpath': dataSignature
  // }
  const mergedObjectSignature = { ...dataSignature, signaturePath };
  // console.log(mergedObjectSignature);
  const [editable, setEditable] = useState(false);

  const dataEditUserInfo = {
    overview: {
      EmployeeType: dataOverview["EmployeeType"],
      Rank: dataOverview["Rank"],
    },
    additional: {
      Nation: dataAdditional["Nation"],
      IDCardNumber: dataAdditional["IDCardNumber"],
      DateOfIDCard: dataAdditional["DateOfIDCard"],
      PlaceOfIDCard: dataAdditional["PlaceOfIDCard"],
      HealthInsurance: dataAdditional["HealthInsurance"],
      StartingDate: dataAdditional["StartingDate"],
      Note: dataAdditional["Note"],
      AcademicLevel: dataAdditional["AcademicLevel"],
      SpecializedQualification: dataAdditional["SpecializedQualification"],
      BusinessPhone: dataAdditional["BusinessPhone"],
      HomePhone: dataAdditional["HomePhone"],
      PersonalEmail: dataAdditional["PersonalEmail"],
      BankName: dataAdditional["BankName"],
      BranchNumber: dataAdditional["BranchNumber"],
      BankBranchName: dataAdditional["BankBranchName"],
      BankAccountNumber: dataAdditional["BankAccountNumber"],
      BankAccountName: dataAdditional["BankAccountName"],
      Street: dataAdditional["Street"],
      BuildingOrFlatNumber: dataAdditional["BuildingOrFlatNumber"],
      City: dataAdditional["City"],
      ProvinceOrState: dataAdditional["ProvinceOrState"],
      PostalCode: dataAdditional["PostalCode"],
      Country: dataAdditional["Country"],
    },
    family: {
      MartialStatus: dataFamily["MartialStatus"],
      ContactName: dataFamily["ContactName"],
      Phone: dataFamily["Phone"],
      Relationship: dataFamily["Relationship"],
      Street: dataFamily["Street"],
      BuildingOrFlatNumber: dataFamily["BuildingOrFlatNumber"],
      City: dataFamily["City"],
      ProvinceOrState: dataFamily["ProvinceOrState"],
      PostalCode: dataFamily["PostalCode"],
      Country: dataFamily["Country"],
    },
    signature: {
      QRcode: dataSignature["QRcode"],
      ImageSignature: dataSignature["ImagePath"],
    },
    Avatar: dataAvatar,
  };

  // console.log(dataEditUserInfo.Avatar);
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Overview`,
      children: (
        <Overview
          data={mergedObject}
          isEditable={editable}
          setData={setDataOverview}
        />
      ),
    },
    {
      key: "2",
      label: `Additional`,
      children: (
        <Additional
          data={dataAdditional}
          setData={setDataAdditional}
          isEditable={editable}
        />
      ),
    },
    {
      key: "3",
      label: `Family`,
      children: (
        <Family
          data={dataFamily}
          setData={setDataFamily}
          isEditable={editable}
        />
      ),
    },
    {
      key: "4",
      label: `Properties`,
      children: <Properties />,
    },
    {
      key: "5",
      label: `Signature`,
      children: (
        <Signature
          data={mergedObjectSignature}
          setData={setDataSignature}
          isEditable={editable}
        />
      ),
    },
  ];
  const handleClickEdit = () => {
    setEditable(true);
  };

  const handleAvatarChange = (info: any) => {
    setLoading(false);
    setAvatar(info.file.originFileObj);
    setFileList([info.file.originFileObj]);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const token = localStorage.getItem("authToken");

  const handleClickSave = async () => {
    setEditable(false);

    const formData = new FormData();

    // Thêm các thuộc tính và giá trị từ object data vào FormData
    formData.append("overview[Rank]", dataEditUserInfo.overview.Rank);
    formData.append(
      "overview[EmployeeType]",
      dataEditUserInfo.overview.EmployeeType
    );
    formData.append(
      "additional.BuildingOrFlatNumber",
      dataEditUserInfo.additional.BuildingOrFlatNumber
    );
    formData.append("additional.Phone", dataEditUserInfo.additional.HomePhone);
    formData.append(
      "additional.BusinessPhone",
      dataEditUserInfo.additional.BusinessPhone
    );
    formData.append(
      "additional.HomePhone",
      dataEditUserInfo.additional.HomePhone
    );
    formData.append("additional.Street", dataEditUserInfo.additional.Street);
    formData.append(
      "additional.SpecializedQualification",
      dataEditUserInfo.additional.SpecializedQualification
    );
    formData.append(
      "additional.BankName",
      dataEditUserInfo.additional.BankName
    );
    formData.append(
      "additional.PlaceOfIDCard",
      dataEditUserInfo.additional.PlaceOfIDCard
    );
    formData.append("additional.Nation", dataEditUserInfo.additional.Nation);
    formData.append("additional.Country", dataEditUserInfo.additional.Country);
    formData.append(
      "additional.BankBranchName",
      dataEditUserInfo.additional.BankBranchName
    );
    formData.append(
      "additional.BranchNumber",
      dataEditUserInfo.additional.BranchNumber
    );
    formData.append("additional.City", dataEditUserInfo.additional.City);
    formData.append(
      "additional.BankAccountNumber",
      dataEditUserInfo.additional.BankAccountNumber
    );
    formData.append(
      "additional.BankAccountName",
      dataEditUserInfo.additional.BankAccountName
    );
    formData.append(
      "additional.StartingDate",
      dataEditUserInfo.additional.StartingDate
    );
    formData.append(
      "additional.PersonalEmail",
      dataEditUserInfo.additional.PersonalEmail
    );
    formData.append(
      "additional.AcademicLevel",
      dataEditUserInfo.additional.AcademicLevel
    );
    formData.append(
      "additional.ProvinceOrState",
      dataEditUserInfo.additional.ProvinceOrState
    );
    formData.append(
      "additional.DateOfIDCard",
      dataEditUserInfo.additional.DateOfIDCard
    );
    formData.append(
      "additional.HealthInsurance",
      dataEditUserInfo.additional.HealthInsurance
    );
    formData.append("additional.Note", dataEditUserInfo.additional.Note);
    formData.append(
      "additional.IDCardNumber",
      dataEditUserInfo.additional.IDCardNumber
    );
    formData.append(
      "additional.PostalCode",
      dataEditUserInfo.additional.PostalCode
    );
    formData.append("family.ContactName", dataEditUserInfo.family.ContactName);
    formData.append(
      "family.Relationship",
      dataEditUserInfo.family.Relationship
    );
    formData.append(
      "family.MartialStatus",
      dataEditUserInfo.family.MartialStatus
    );
    formData.append(
      "family.PostalCodeFamily",
      dataEditUserInfo.family.PostalCode
    );
    formData.append(
      "family.BuildingOrFlatNumberFamily",
      dataEditUserInfo.family.BuildingOrFlatNumber
    );
    formData.append("family.PhoneFamily", dataEditUserInfo.family.Phone);
    formData.append("family.StreetFamily", dataEditUserInfo.family.Street);
    formData.append("family.CountryFamily", dataEditUserInfo.family.Country);
    formData.append(
      "family.ProvinceOrStateFamily",
      dataEditUserInfo.family.ProvinceOrState
    );
    formData.append("family.relationships", "");
    formData.append("family.CityFamily", dataEditUserInfo.family.City);
    formData.append("signature.QRcode", dataEditUserInfo.signature.QRcode);
    formData.append(
      "signature.ImageSignature",
      dataEditUserInfo.signature.ImageSignature
    );
    formData.append("Avatar", fileList[0]);

    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const API_URL = "http://localhost:5005/api/";
    const url = `${API_URL}Personal/EditInfoEmployee?Id=${id}`;
    axios
      .put(url, formData, { headers })
      .then((response) => {
        // Handle the response if needed
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error("Error updating data:", error);
      });
  };

  return (
    <div>
      <Header
        className="header-employee"
        style={{
          display: "flex",
          backgroundColor: "#F5F6FA",
          marginTop: "64px",
          alignItems: "center",
        }}>
        <div style={{ paddingLeft: "50px" }} onClick={handleClickSave}>
          {editable && <AiOutlineSave />}
        </div>
        <div className="return-employee">
          <a href="/setting" className="text-header">
            <TiArrowBackOutline />
            Return
          </a>
        </div>
      </Header>
      <div className="employee-avatar-name-edit">
        <h2 className="name-employee">
          <span>
            {!editable ? (
              <img className="avatar-employee" src={dataAvatar}></img>
            ) : (
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleAvatarChange}>
                  {dataAvatar ? (
                    !avatar ? (
                      <img
                        className="avatar-employee"
                        src={dataAvatar}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <img
                        className="avatar-employee"
                        src={URL.createObjectURL(avatar)}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    )
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </ImgCrop>
            )}
            {/* <Avatar data={dataAvatar} setData={setDataAvatar} /> */}

            {/* <Avatar data={dataAvatar} setData={setDataAvatar} /> */}
          </span>
          {dataName}
        </h2>
        <div onClick={handleClickEdit} className="edit-employee">
          {!editable && <TbUserEdit />}
        </div>
      </div>
      <Tabs
        style={{ padding: "16px" }}
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
      />
    </div>
  );
};

export default InforUser;
