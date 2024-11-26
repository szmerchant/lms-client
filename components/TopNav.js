import { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { AppstoreOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
  
const TopNav = () => {
    const [current, setCurrent] = useState("");

    useEffect(() => {
        typeof window !== "undefined" && setCurrent(window.location.pathname)
        console.log(window.location.pathname);
    }, [typeof window !== "undefined" && window.location.pathname]);

    const items = [
        {
          key: "/",
          onClick: (e) => setCurrent(e.key),
          icon: <AppstoreOutlined />,
          label: <Link href="/">App</Link>,
        },
        {
          key: "/login",
          onClick: (e) => setCurrent(e.key),
          icon: <LoginOutlined />,
          label: <Link href="/login">Login</Link>,
        },
        {
          key: "/register",
          onClick: (e) => setCurrent(e.key),
          icon: <UserAddOutlined />,
          label: <Link href="/register">Register</Link>,
        },
    ];

    return (
        <>
            <Menu mode="horizontal" items={items} selectedKeys={[current]} />
        </>
    );
};

export default TopNav;