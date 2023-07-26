// import React, { useState } from "react";
// import { Space, Dropdown, Menu } from "antd";
// import { BsQuestionLg } from "react-icons/bs";
// import { IoCloseSharp, IoPersonCircleOutline } from "react-icons/io5";
// import { Link } from 'react-router-dom';
// import type { MenuProps } from "antd";
// import "./request.css";

// const Person: React.FC = () => {
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   const handleFormSubmit = (values: any) => {
//     console.log("Form values:", values);
//     // Perform desired actions with form values
//     setIsFormVisible(false); // Hide the form after submission
//   };
// const items: MenuProps["items"] = [
//   {
//     key: "1",
//     label: `My Account`,
//     icon: <IoCloseSharp />,
//   },
//   {
//     type: "divider",
//   },

//   {
//     key: "2",
//     label: `Bang Nguyen Minh`,
//     icon: <IoPersonCircleOutline />,
//   },
//   {
//     key: "3",
//     label: `bangnm@o365.vn`,
//   },
//   {
//     type: "divider",
//   },
//   {
//     key: "4",
//     label: `My Profile`,
//     icon: <IoPersonCircleOutline />,
//   },
// ];

//   const menu = (
//     <Menu items={items}>
//       {/* <Menu.Item key="profile">
//         <Link to="/system/employee">Profile</Link>
//       </Menu.Item> */}
//       {/* Các menu item khác */}
//     </Menu>
//   );
//   return (
//     <Dropdown
//     overlay={menu}
//     //   menu={{
//     //     items,
//     //     style: {
//     //       height: "500px",
//     //       width: "300px",
//     //       marginTop: "12px",
//     //       right: "-70px",
//     //     },
//     //   }}
//       className="dropdown-help"
//       trigger={["click"]}>
//       <a onClick={(e) => e.preventDefault()}>
//         <Space>
//           <IoPersonCircleOutline />
//         </Space>
//       </a>
//     </Dropdown>
//   );
// };

// export default Person;
import React, { useState } from "react";
import { Dropdown, Menu, MenuProps } from "antd";
import { BsQuestionLg } from "react-icons/bs";
import { IoCloseSharp, IoPersonCircleOutline } from "react-icons/io5";

import "./request.css";
import { Link } from "react-router-dom";

const Person: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  interface MenuItem {
    key: string;
    label: string;
    icon?: JSX.Element;
    type?: "divider" | "group";
    children?: MenuItem[];
    name?: string;
  }

  const items: MenuItem[] = [
    {
      key: "1",
      label: "My account",
      type: "group",
      icon: <IoCloseSharp />,
      children: [],
    },
    {
      key: "2",
      label: "Bang Nguyen Minh",
      type: "group",
      children: [
        {
          key: "1-1",
          label: "My Profile",
          name: "employee",
        },
        {
          key: "1-2",
          label: "My Account",
          name: "employee",
        },
        {
          key: "1-3",
          label: "Sign out",
          name: "signout",
        },
      ],
    },
  ];
  const generateMenuItems = (items: MenuItem[]): JSX.Element[] => {
    return items.map((item) => {
      if (item.type === "divider") {
        return <Menu.Divider key={item.key} />;
      }
      if (item.children) {
        return (
          <Menu.ItemGroup key={item.key} title={item.label}>
            {generateMenuItems(item.children)}
          </Menu.ItemGroup>
        );
      }
      return (
        <Menu.Item key={item.key}>
          <Link to={`/setting/system/${item.name}`}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };

  const menu = (
    <Menu
      style={{
        height: "500px",
        width: "300px",
        marginTop: "12px",
        right: "-20px",
      }}>
      {generateMenuItems(items)}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <IoPersonCircleOutline />
      </a>
    </Dropdown>
  );
};

export default Person;
