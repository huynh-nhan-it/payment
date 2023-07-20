import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import Select from "react-select";

// Chúng ta cần định nghĩa một danh sách các font chữ hỗ trợ
const fontOptions = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Better Land', label: 'Better Land' }, // Added "Better Land" font
  { value: 'Calmina', label: 'Calmina' }, // Added "Calmina" font
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

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Type Signature`,
      children: [
        <>
          <div>
            <label>Nhập văn bản</label>
            <input
              type="text"
              id="inputText"
              value={inputText}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Chọn font chữ:</label>
            <Select
              id="fontSelect"
              options={fontOptions}
              value={selectedFont}
              onChange={handleFontChange}
            />
          </div>

          <div style={{ marginTop: "2rem" }}>
            <QRCode value={inputText} />
          </div>
          <div style={{ marginTop: "1rem", fontFamily: selectedFont.value }}>
            {inputText}
          </div>
        </>,
      ],
    },
    {
      key: "2",
      label: `Upload Your Own`,
      children: [
        <>
          <div>
            <label htmlFor="inputText">Tai anh len</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageUpload}
            />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <QRCode value={inputText} />
          </div>
          {selectedImage && (
            <div style={{ marginTop: "1rem" }}>
              <img
                src={selectedImage as string}
                alt="Uploaded"
                style={{ width: "300px" }}
              />
            </div>
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
      {/* <h2>QR Code Generator</h2>
      <div>
        <label htmlFor="inputText">Nhập văn bản hoặc tải lên ảnh:</label>
        <input
          type="text"
          id="inputText"
          value={inputText}
          onChange={handleInputChange}
        />
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleImageUpload}
        />
      </div> */}

      {/* <div style={{ marginTop: '1rem' }}>
        <label htmlFor="fontSelect">Chọn font chữ:</label>
        <Select
          id="fontSelect"
          options={fontOptions}
          value={selectedFont}
          onChange={handleFontChange}
        />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <QRCode value={inputText} />
      </div>
*/}

      {/* <div style={{ marginTop: '1rem', fontFamily: selectedFont.value }}>
        {inputText}
      </div> */}
    </div>
  );
};

export default Signature;

// import React, { useState } from "react";
// import QRCode from "react-qr-code";
// import Select from "react-select";
// import { Tabs } from "antd";

// // Chúng ta cần định nghĩa một danh sách các font chữ hỗ trợ
// const fontOptions = [
//   { value: "Arial", label: "Arial" },
//   { value: "Helvetica", label: "Helvetica" },
//   { value: "Times New Roman", label: "Times New Roman" },
//   // Thêm các font chữ khác vào đây nếu muốn
// ];

// const { TabPane } = Tabs;

// const Signature: React.FC = () => {
//   const [inputText, setInputText] = useState<string>("");
//   const [selectedFont, setSelectedFont] = useState<any>(fontOptions[0]); // Lựa chọn font chữ mặc định
//   const [selectedImage, setSelectedImage] = useState<
//     string | ArrayBuffer | null
//   >(null);

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputText(event.target.value);
//   };

//   const handleFontChange = (selectedOption: any) => {
//     setSelectedFont(selectedOption);
//   };

//   const handleImageUpload = (info: any) => {
//     const file = info.file;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const result = reader.result;
//       setSelectedImage(result);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div>
//       <h2>QR Code Generator</h2>
//       <Tabs>
//         <TabPane tab="Input String" key="input">
//           <div>
//             <label htmlFor="inputText">Nhập văn bản:</label>
//             <input
//               type="text"
//               id="inputText"
//               value={inputText}
//               onChange={handleInputChange}
//             />

//             <label htmlFor="fontSelect">Chọn font chữ:</label>
//             <Select
//               id="fontSelect"
//               options={fontOptions}
//               value={selectedFont}
//               onChange={handleFontChange}
//             />

//             {inputText && (
//               <div style={{ marginTop: "2rem" }}>
//                 <QRCode value={inputText} />
//               </div>
//             )}

//             <div style={{ marginTop: "1rem", fontFamily: selectedFont.value }}>
//               {inputText}
//             </div>
//           </div>
//         </TabPane>

//         <TabPane tab="Upload Image" key="upload">
//           <div>
//             <input
//               type="file"
//               accept=".jpg,.jpeg,.png"
//               onChange={handleImageUpload}
//             />

//             {selectedImage && (
//               <div style={{ marginTop: "1rem" }}>
//                 <img
//                   src={selectedImage as string}
//                   alt="Uploaded"
//                   style={{ width: "300px" }}
//                 />
//               </div>
//             )}

//             {/* <div style={{ marginTop: "2rem" }}>
//               <QRCode value={inputText} />
//             </div> */}

//             <div
//               style={{
//                 marginTop: "1rem",
//                 fontFamily: selectedFont.value,
//               }}></div>
//           </div>
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default Signature;
