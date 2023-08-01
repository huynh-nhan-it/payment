import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import axios from 'axios';
import React, { useState } from 'react';

interface AvatarProps {
  data: string;
  isEditable?: boolean;
  setData: React.Dispatch<React.SetStateAction<string>>;
}
const Avatar: React.FC<AvatarProps> = ({data, setData, isEditable}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: data,
    },
  ]);

  // console.log(data);
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // setData()
    // console.log(newFileList[0]?.name);
    setData(newFileList[0]?.name)
  };


  const onPreview = async () => {
    let src = data
    // if (!src) {
    //   src = await new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file.originFileObj as RcFile);
    //     reader.onload = () => resolve(reader.result as string);
    //   });
    // }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
    console.log(src);
  };


  const uploadButton = (
    
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Function to handle the file selection from the Ant Design Upload component
  const handleFileChange = (file: File) => {
    if (file) {
      // You may want to check the file size and type here, based on your requirements.
      setAvatarFile(file);
    }
  };

  // Function to update the avatar using Axios PUT request
  const updateAvatar = async () => {
    try {
      if (!avatarFile) {
        message.error('Please select an avatar first.');
        return;
      }

      // Create a FormData object to send the file as multipart/form-data
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      // Make the PUT request to update the avatar
      // Replace 'your_server_endpoint' with the actual API endpoint that handles avatar updates.
      const response = await axios.put('', formData);

      // Handle the server's response here, if needed.
      console.log('Avatar update successful:', response.data);

      message.success('Avatar updated successfully!');
    } catch (error) {
      // Handle errors appropriately.
      message.error('Error updating avatar. Please try again later.');
    }
  };


  return (
    // <ImgCrop rotationSlider>
    //   <Upload
    //     action=""
    //     fileList={fileList}
    //     listType="picture-circle"
    //     defaultFileList={fileList}
    //     onChange={onChange}
    //     onPreview={onPreview}
    //   >
    //     {fileList.length === 0 && uploadButton}
    //   </Upload>
    // </ImgCrop>

    <div>

     <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={handleFileChange}
      >
        <Button icon={<UploadOutlined />}>Select Avatar</Button>
      </Upload>

      <Button type="primary" onClick={updateAvatar}>
        Update Avatar
      </Button>
    </div>
  );
};

export default Avatar;