import React from 'react';
import Logout from '../../../pages/UserAuthorization/Logout';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';

export const Sidebar = () => {
  const { Sider } = Layout;
  const [user] = useCookies(['user']);
  const userId = user.user?.id;
  const sidebarConfiguration = [
    { id: 1, text: 'Dashboard', value: '/', icon: <UserOutlined /> },
    { id: 2, text: <Link to={`/user/${userId}`}>My Profile</Link>, icon: <UserOutlined /> },
    { id: 3, text: 'Create Room', value: '/createRoom', icon: <UserOutlined /> },
    { id: 4, text: 'Settings', value: '#', icon: <UserOutlined /> },
    { id: 5, text: <Logout />, value: '#', icon: <UserOutlined /> }
  ];

  return (
    <Sider trigger={null} style={{ height: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {sidebarConfiguration.map(({ id, text, icon }) => (
          <Menu.Item key={id} icon={icon}>
            {text}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
