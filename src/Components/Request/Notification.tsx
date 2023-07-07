import React, { useState } from "react";
import { Space, Dropdown, Menu } from "antd";
import { BsQuestionLg } from "react-icons/bs";
import { IoCloseSharp, IoNotifications } from "react-icons/io5";

import type { MenuProps } from "antd";
import "./request.css";

const Notification: React.FC = () => {
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
      label: `Notifications`,
      icon: <IoCloseSharp />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: `Payment Request`,
      type: "group",
      children: [
        {
          key: "1-1",
          label: `Introduction`,
        },
      ],
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        style: {
          height: "500px",
          width: "300px",
          marginTop: "12px",
          right: "-200px",
        },
      }}
      className="dropdown-help"
      trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <IoNotifications />{" "}
        </Space>
      </a>
    </Dropdown>
  );
};

export default Notification;
