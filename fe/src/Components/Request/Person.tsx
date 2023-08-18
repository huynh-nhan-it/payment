import React, { useEffect, useState } from "react";
import { Dropdown, Menu } from "antd";
import { IoCloseSharp, IoPersonCircleOutline } from "react-icons/io5";
import "./request.css";
import { Link } from "react-router-dom";
import request from "../../Services/User/getAccount";

const Person: React.FC = () => {
  const [dataName, setDataName] = useState('')
  const [avatar, setDataAvatar] = useState()
  const id = localStorage.getItem('id')
  useEffect(() => {
    const getUserInfor = async () => {
      const endpoint = "/Personal/EmployeeInfo?Id=" + id;
      await request.get(endpoint).then((res) => {
        setDataName(res.data.userInfo.FirstName + ' ' + res.data.userInfo.LastName);
        if (res.data.avt) {
          setDataAvatar(res.data.avt);
        }
      });
    };

    getUserInfor();
  }, [id]);
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
      label: dataName,
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

          {item.name === 'signout' ? <Link to={`/setting/system/${item.name}`} onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = '/login'
          }}>{item.label}</Link>
            :
            <Link to={`/setting/system/${item.name}`}>{item.label}</Link>
          }
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
      <div onClick={(e) => e.preventDefault()}>
        <div className="avatar-header">
          {!avatar ?
            <IoPersonCircleOutline /> :
            <img
              style={{ width: "22px" }}
              className="avatar-employee"
              src={avatar}
              alt="avatar"
            />
          }
        </div>
      </div>
    </Dropdown>
  );
};

export default Person;
