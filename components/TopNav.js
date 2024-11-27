import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
  
const TopNav = () => {
    const [current, setCurrent] = useState("");

    const { state, dispatch } = useContext(Context);

    const { user } = state;

    const router = useRouter();

    useEffect(() => {
        typeof window !== "undefined" && setCurrent(window.location.pathname)
    }, [typeof window !== "undefined" && window.location.pathname]);

    const logout = async () => {
        dispatch({ type: "LOGOUT" });
        window.localStorage.removeItem("user");
        const { data } = await axios.get("/api/logout");
        toast(data.message);
        router.push("/login");
    };

    // Dynamically filter menu items based on user state
    const items = [
      {
        key: "/",
        onClick: (e) => setCurrent(e.key),
        icon: <AppstoreOutlined />,
        label: <Link href="/">App</Link>,
      },
      ...(!user
        ? [
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
          ]
        : [
            {
              key: "/logout",
              onClick: logout,
              icon: <LogoutOutlined />,
              style: { marginLeft: "auto" }, // Push to the right
              label: "Logout",
            },
          ]),
    ];

    return (
        <>
            <Menu mode="horizontal" items={items} selectedKeys={[current]} />
        </>
    );
};

export default TopNav;