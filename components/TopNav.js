import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
  UserOutlined,
  CarryOutOutlined,
  TeamOutlined
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
        label: <Link href="/">Home</Link>,
      },
      // Conditional rendering for Create Course/Become Instructor
      ...(user && user.role && user.role.includes("Instructor")
        ? [
            {
              key: "/instructor/course/create",
              onClick: (e) => setCurrent(e.key),
              icon: <CarryOutOutlined />,
              label: <Link href="/instructor/course/create">Create Course</Link>,
            },
          ]
        : user && !user.role.includes("Instructor")
        ? [
            {
              key: "/user/become-instructor",
              onClick: (e) => setCurrent(e.key),
              icon: <TeamOutlined />,
              label: <Link href="/user/become-instructor">Become Instructor</Link>,
            },
          ]
        : []),
      // Login/Register for unauthenticated users
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
            // Instructor tab (conditionally rendered)
            ...(user.role.includes("Instructor")
              ? [
                  {
                    key: "/instructor",
                    onClick: (e) => setCurrent(e.key),
                    icon: <TeamOutlined />,
                    label: <Link href="/instructor">Instructor</Link>,
                    style: { marginLeft: "auto" }
                  },
                ]
              : []),
            // User Menu (always present for authenticated users)
            {
              key: "user-menu",
              label: user.name || "User", // Display user name if available
              icon: <UserOutlined />,
              style: !user.role?.includes("Instructor") ? { marginLeft: "auto" } : {},
              children: [
                {
                  key: "/user",
                  label: <Link href="/user">Dashboard</Link>,
                },
                {
                  key: "/logout",
                  onClick: logout,
                  label: "Logout",
                },
              ],
            },
          ]),
    ];

    return (
        <>
            <Menu
              theme="dark"
              mode="horizontal"
              items={items}
              selectedKeys={[current]}
              className="mb-2" />
        </>
    );
};

export default TopNav;