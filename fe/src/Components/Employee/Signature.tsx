import { Col, Input, Row, Select, Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import QRCode from "react-qr-code";
// import Select from "react-select";

// Chúng ta cần định nghĩa một danh sách các font chữ hỗ trợ
const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "fantasy", label: "fantasy" }, // Added "Better Land" font
  { value: "Calmina", label: "Calmina" },
  // Thêm các font chữ khác vào đây nếu muốn
];

const onChange = (key: string) => {
  console.log(key);
};

interface MyObject {
  [key: string]: any;
}
interface SignatureProps {
  data: MyObject;
  isEditable?: boolean;
  setData: React.Dispatch<React.SetStateAction<MyObject>>;
}

const Signature: React.FC<SignatureProps> = ({ data, setData, isEditable }) => {
  const formItems = Object.entries(data).map(([key, value]) => ({
    label: key,
    value: value,
  }));
  const handleInputChange = (value: string, label: string) => {
    const updatedData: MyObject = { ...data };
    // setInputText(value);

    updatedData[label] = value;
    updatedData["ImagePath"] = null;
    setData(updatedData);
  };
  console.log(data);
  const [selectedFont, setSelectedFont] = useState<any>(fontOptions[0]); // Lựa chọn font chữ mặc định
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleFontChange = (selectedOption: any) => {
    setSelectedFont(selectedOption);
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    label: string
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
    const updatedData: MyObject = { ...data };
    console.log(updatedData);
    updatedData[label] = file;
    updatedData["QRcode"] = "";
    console.log(file);
    setData(updatedData);
  };
  const dateTime = new Date(data.dateTime);

  // Lấy thông tin ngày, tháng, năm, giờ và phút từ đối tượng Date
  const day = dateTime.getDate(); // Ngày (1-31)
  const month = dateTime.getMonth() + 1; // Tháng (0-11), cộng thêm 1 vì tháng bắt đầu từ 0
  const year = dateTime.getFullYear(); // Năm (đầy đủ bốn chữ số)
  const hours = dateTime.getHours(); // Giờ (0-23)
  const minutes = dateTime.getMinutes(); // Phút (0-59)

  // Định dạng chuỗi ngày giờ mới theo yêu cầu "dd/MM/yyyy HH:mm"
  const formattedDateTime = `${day}/${month}/${year} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Type Signature`,
      children: [
        <>
          <Row>
            <Col span={12}>
              <div>
                <label>Confirm Your Name</label>
                {formItems.map(
                  (item) =>
                    item.label === "QRcode" && (
                      <Input
                        type="text"
                        id="inputText"
                        value={data.QRcode}
                        onChange={(e) =>
                          handleInputChange(e.target.value, item.label)
                        }
                      />
                    )
                )}
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label>Signature Style</label>
                <Select
                  key={selectedFont}
                  style={{ width: "100%" }}
                  id="fontSelect"
                  options={fontOptions}
                  value={selectedFont}
                  onChange={handleFontChange}
                />
              </div>
            </Col>
          </Row>
          {data.QRcode && (
            <Row style={{ paddingTop: 20 }}>
              <Col span={12} offset={6}>
                <div
                  style={{
                    width: "400px",
                    height: "200px",
                    background: "#fff",
                    display: "flex",
                  }}>
                  <div style={{ padding: "10px" }}>
                    <QRCode
                      style={{ width: "100px", height: "100px" }}
                      value={data.QRcode}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      fontFamily: selectedFont,
                    }}>
                    <p>{data.email}</p>
                    <p>{formattedDateTime}</p>
                    <h1
                      style={{
                        fontFamily: selectedFont,
                        fontSize: 24,
                      }}>
                      {data.QRcode}
                    </h1>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </>,
      ],
    },
    {
      key: "2",
      label: `Upload Your Own`,
      children: [
        <>
          <Row style={{ paddingTop: 20 }}>
            <Col span={12} offset={6}>
              <div>
                {formItems.map(
                  (item) =>
                    item.label === "ImagePath" && (
                      <Input
                        style={{ width: "400px" }}
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        // onChange={handleImageUpload}
                        onChange={(e) => handleImageUpload(e, item.label)}
                      />
                    )
                )}
              </div>
            </Col>
          </Row>
          {data?.ImagePath && (
            <Row style={{ paddingTop: 20 }}>
              <Col span={12} offset={6}>
                <div
                  style={{
                    height: "200px",
                    background: "#fff",
                    display: "flex",
                  }}>
                  <div style={{ padding: "10px" }}>
                    <QRCode
                      style={{ width: "100px", height: "100px" }}
                      value={data?.signaturePath}
                    />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <p>{data.email}</p>
                    <p>{formattedDateTime}</p>
                    <img
                      src={
                        selectedImage
                          ? (selectedImage as string)
                          : (data.signaturePath as string)
                      }
                      alt="Uploaded"
                      style={{ width: "200px" }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </>,
      ],
    },
  ];
  console.log(data.signaturePath);
  return (
    <div>
      {isEditable ? (
        <Tabs
          // key={items.keys}
          style={{ padding: "16px" }}
          defaultActiveKey="1"
          items={items}
        // onChange={onChange}
        />
      ) : (
        <div>
          {data.QRcode && (
            <Row style={{ paddingTop: 20 }}>
              <Col span={12} offset={6}>
                <div
                  style={{
                    width: "400px",
                    height: "200px",
                    background: "#fff",
                    display: "flex",
                  }}>
                  <div style={{ padding: "10px" }}>
                    <QRCode
                      style={{ width: "100px", height: "100px" }}
                      value={data.QRcode}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      fontFamily: selectedFont,
                    }}>
                    <p>{data.email}</p>
                    <p>{formattedDateTime}</p>
                    <h1
                      style={{
                        fontFamily: selectedFont,
                        fontSize: 24,
                      }}>
                      {data.QRcode}
                    </h1>
                  </div>
                </div>
              </Col>
            </Row>
          )}

          {data?.ImagePath && (
            <Row style={{ paddingTop: 20 }}>
              <Col span={12} offset={6}>
                <div
                  style={{
                    width: "400px",
                    height: "200px",
                    background: "#fff",
                    display: "flex",
                  }}>
                  <div style={{ padding: "10px" }}>
                    <QRCode
                      style={{ width: "100px", height: "100px" }}
                      value={data?.signaturePath}
                    />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <p>{data.email}</p>
                    <p>{formattedDateTime}</p>
                    <img
                      src={
                        selectedImage
                          ? (selectedImage as string)
                          : (data.signaturePath as string)}
                      alt="Uploaded"
                      style={{ width: "200px" }}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </div>
      )}
    </div>
  );
};

export default Signature;
