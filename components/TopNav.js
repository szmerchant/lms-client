import { Menu } from "antd";
import Link from "next/link";
import { AppstoreOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const items = [
    {
      key: "app",
      icon: <AppstoreOutlined />,
      label: <Link href="/">App</Link>,
    },
    {
      key: "login",
      icon: <LoginOutlined />,
      label: <Link href="/login">Login</Link>,
    },
    {
      key: "register",
      icon: <UserAddOutlined />,
      label: <Link href="/register">Register</Link>,
    },
];
  
const TopNav = () => {
    return (
        <>
            <Menu mode="horizontal" items={items} />
        </>
    );
};

export default TopNav;