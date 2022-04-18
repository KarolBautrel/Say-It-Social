import { useState, ChangeEvent } from 'react';
import Logout from '../../../pages/UserAuthorization/Logout';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  EditOutlined,
  MailOutlined,
  ToolOutlined
} from '@ant-design/icons';

export const Sidebar = () => {
  const { SubMenu } = Menu;
  const { Sider } = Layout;
  const [user] = useCookies(['user']);
  const userId = user.user?.id;
  const [currentKey, setCurrentKey] = useState<string>('1');
  const sidebarMenuConfiguration = [
    { id: 1, text: <Link to={`/`}>Homepage</Link>, icon: <HomeOutlined /> },
    { id: 2, text: <Link to={`/user/${userId}`}>My Profile</Link>, icon: <UserOutlined /> },
    { id: 3, text: <Logout />, icon: <LogoutOutlined /> }
  ];
  const sidebarSubMenuConfiguration = [
    { id: 4, text: <Link to={`/createRoom`}>Create Room</Link>, icon: <EditOutlined /> },
    { id: 5, text: <Link to={`/user/changeEmail`}>Change Email</Link>, icon: <MailOutlined /> },
    {
      id: 6,
      text: <Link to={`/user/changePassword`}>Change Password</Link>,
      icon: <ToolOutlined />
    },
    { id: 7, text: <Link to={`/`}>Friends</Link>, icon: <UserOutlined /> }
  ];

  return (
    <Sider trigger={null} style={{ height: '100%' }}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        selectedKeys={[currentKey]}
        onClick={(event) => setCurrentKey(event.key)}>
        <SubMenu key={'sub1'} icon={<SettingOutlined />} title="Settings">
          {sidebarSubMenuConfiguration.map(({ id, text, icon }) => (
            <Menu.Item key={id} icon={icon}>
              {text}
            </Menu.Item>
          ))}
        </SubMenu>
        {sidebarMenuConfiguration.map(({ id, text, icon }) => (
          <Menu.Item key={id} icon={icon}>
            {text}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
