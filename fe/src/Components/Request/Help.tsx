import React from "react";
import { Dropdown, Menu } from "antd";
import { BsQuestionLg } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

import "./request.css";
import { Link } from "react-router-dom";


const HelpRequest: React.FC = () => {
  interface MenuItem {
    key: string;
    label: string;
    icon?: JSX.Element;
    type?: 'divider' | 'group';
    children?: MenuItem[];
  }
  
  const items: MenuItem[] = [
    {
      key: '1',
      label: 'Help',
      icon: <IoCloseSharp />,
    },
    {
      key: '2',
      label: 'Opus Helpdesk',
      type: 'group',
      children: [
        {
          key: '1-1',
          label: 'Introduction',
        },
        {
          key: '1-2',
          label: 'Feedbacks & Suggest idea',
        },
        {
          key: '1-3',
          label: 'Open ticket',
        },
        {
          key: '1-4',
          label: 'Help',
        },
      ],
    },
  ];
  const generateMenuItems = (items: MenuItem[]): JSX.Element[] => {
    return items.map((item) => {
      if (item.type === 'divider') {
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
          <Link to={`/system/${item.label}`}>{item.label}</Link>
        </Menu.Item>
      );
    });
  };

  const menu = (
    <Menu style={{ height: '500px', width: '300px', marginTop: '12px', right: '-20px' }}>
      {generateMenuItems(items)}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
    <div onClick={(e) => e.preventDefault()}>
      <BsQuestionLg />
    </div>
  </Dropdown>
  );
};

export default HelpRequest;
