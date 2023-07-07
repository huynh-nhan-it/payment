import React, { useState } from "react";
import { Space, Dropdown, Menu } from "antd";
import { BsQuestionLg } from "react-icons/bs";
import { IoCloseSharp, IoPersonCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import type { MenuProps } from "antd";
import "./request.css";

const Person: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleFormSubmit = (values: any) => {
    console.log("Form values:", values);
    // Perform desired actions with form values
    setIsFormVisible(false); // Hide the form after submission
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: `My Account`,
      icon: <IoCloseSharp />,
    },
    {
      type: "divider",
    },

    {
      key: "2",
      label: `Bang Nguyen Minh`,
      icon: <IoPersonCircleOutline />,
    },
    {
      key: "3",
      label: `bangnm@o365.vn`,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: `My Profile`,
      icon: <IoPersonCircleOutline />,
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/system/employee">Profile</Link>
      </Menu.Item>
      {/* Các menu item khác */}
    </Menu>
  );
  return (
    <Dropdown
    overlay={menu}
    //   menu={{
    //     items,
    //     style: {
    //       height: "500px",
    //       width: "300px",
    //       marginTop: "12px",
    //       right: "-70px",
    //     },
    //   }}
      className="dropdown-help"
      trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <IoPersonCircleOutline />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Person;
