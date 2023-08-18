import React from "react";
import { Space, Dropdown } from "antd";
import { IoCloseSharp, IoNotifications } from "react-icons/io5";

import type { MenuProps } from "antd";
import "./request.css";

const Notification: React.FC = () => {
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
        style: {marginTop:"12px"},
        className:"dropdown-help",
      }}
      trigger={["click"]}>
      <div onClick={(e) => e.preventDefault()}>
        <Space>
          <IoNotifications />{" "}
        </Space>
      </div>
    </Dropdown>
  );
};

export default Notification;
