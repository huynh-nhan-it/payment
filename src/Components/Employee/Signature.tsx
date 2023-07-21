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
const Signature: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedFont, setSelectedFont] = useState<any>(fontOptions[0]); // Lựa chọn font chữ mặc định
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleFontChange = (selectedOption: any) => {
    setSelectedFont(selectedOption);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setSelectedImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(selectedFont);
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
                <Input
                  type="text"
                  id="inputText"
                  value={inputText}
                  onChange={handleInputChange}
                />
              </div>
            </Col>
            <Col span={12}>
              <div>
                <label>Signature Style</label>
                <Select
                  style={{ width: "100%" }}
                  id="fontSelect"
                  options={fontOptions}
                  value={selectedFont}
                  onChange={handleFontChange}
                />
              </div>
            </Col>
          </Row>
          {inputText && (
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
                      value={inputText}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "1rem",
                      fontFamily: selectedFont,
                    }}>
                    <h1
                      style={{
                        fontFamily: selectedFont,
                        fontSize: 35,
                      }}>
                      {inputText}
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
                <Input
                style={{width:"400px"}}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleImageUpload}
                />
              </div>
            </Col>
          </Row>
          {/* <div style={{ marginTop: "2rem" }}>
            <QRCode value={inputText} />
          </div> */}

          {selectedImage && (
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
                      value={inputText}
                    />
                  </div>
                  <div style={{ marginTop: "1rem" }}>
                    <img
                      src={selectedImage as string}
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
  return (
    <div>
      <Tabs
        style={{ padding: "16px" }}
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
};

export default Signature;
