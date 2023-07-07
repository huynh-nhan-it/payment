// import React, { useState } from 'react';
// import { Dropdown, Form, Input, Button } from 'antd';

// const DropdownFilter: React.FC = () => {
//   const [isFormVisible, setIsFormVisible] = useState(false);

//   const toggleFormVisibility = () => {
//     setIsFormVisible(!isFormVisible);
//   };

//   const handleFormSubmit = (values: any) => {
//     console.log('Form values:', values);
//     // Perform desired actions with form values
//     setIsFormVisible(false); // Hide the form after submission
//   };

//   return (
//     <Dropdown
//       visible={isFormVisible}
//       overlay={
//         <Form onFinish={handleFormSubmit} labelCol={{ span: 24 }}>
//           <Form.Item label="Name" labelAlign="left" name="name" labelCol={{ span: 24 }}>
//             <Input placeholder="Enter your name" />
//           </Form.Item>
//           <Form.Item label="Email" labelAlign="left" name="email" labelCol={{ span: 24 }}>
//             <Input placeholder="Enter your email" />
//           </Form.Item>
//           {/* Add more form items as needed */}
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       }
//       trigger={['click']}
//       onVisibleChange={toggleFormVisibility}
//     >
//       <Button type="primary">Open Form</Button>
//     </Dropdown>
//   );
// };

// export default DropdownFilter;
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';

// Define a type for the menu items
type MenuItem = Required<MenuProps>['items'][number];

// Utility function to create a menu item
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

const DropdownFilter: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default DropdownFilter;
