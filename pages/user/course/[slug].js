import { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
    PlayCircleOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";


const SingleCourse = () => {
    const [ clicked, setClicked ] = useState(-1);
    const [ collapsed, setCollapsed ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ course, setCourse ] = useState({ lessons: [] });

    // router
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (slug) loadCourse();
    }, [slug]);

    const loadCourse = async () => {
        const { data } = await axios.get(`/api/user/course/${slug}`);
        setCourse(data);
    };

    // Create Menu items
    const menuItems = course.lessons.map((lesson, index) => ({
        key: index,
        icon: <Avatar>{index + 1}</Avatar>,
        label: lesson.title.substring(0, 30),
        onClick: () => setClicked(index),
    }));

    return (
        <StudentRoute>
            <div className="row" style={{ height: "100vh", display: "flex" }}>
                {/* Sidebar Menu */}
                <div
                    style={{
                        maxWidth: collapsed ? 100 : 320,
                        transition: "max-width 0.3s ease-in-out",
                        overflow: "hidden",
                    }}
                >
                    <Button
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            width: "100%", // Matches the width of the menu
                        }}
                        className="text-primary mt-1 btn-block mb-2"
                    >
                        {createElement( collapsed ? MenuUnfoldOutlined : MenuFoldOutlined )}{" "}
                        {!collapsed && "Lessons"}
                    </Button>
                    <Menu
                        items={menuItems}
                        defaultSelectedKeys={[`${clicked}`]}
                        mode="inline"
                        inlineCollapsed={collapsed}
                        style={{
                            height: "calc(100vh - 50px)",
                            overflow: "auto",
                        }}
                    />
                </div>

                {/* Lesson Content */}
                <div
                    className="col"
                    style={{
                        flex: 1,
                        paddingLeft: collapsed ? "10px" : "20px",
                        transition: "padding-left 0.3s ease-in-out",
                    }}
                >
                    {clicked !== -1 ? (
                        // <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
                        //     <h3>{course.lessons[clicked].title}</h3>
                        //     <p>{course.lessons[clicked].content}</p>
                        // </div>
                        <>
                            {course.lessons[clicked].video && course.lessons[clicked].video.Location && (
                                <>
                                    <div
                                        className="wrapper"
                                        style={{
                                            height: collapsed ? "85vh" : "60vh", // Increase height when collapsed
                                            transition: "height 0.3s ease-in-out",
                                        }}
                                    >
                                        <ReactPlayer.default
                                            className="player"
                                            url={course.lessons[clicked].video.Location}
                                            width="100%"
                                            height="100%"
                                            controls
                                        />
                                    </div>
                                </>
                            )}

                            <ReactMarkdown
                                children={course.lessons[clicked].content}
                                className="single-post mt-3"
                            />
                        </>
                    ) : (
                        <div className="d-flex justify-content-center p-5">
                            <div className="text-center p-5">
                                <PlayCircleOutlined className="text-primary display-1 p-5" />
                                <p className="lead">Click on the lessons to start learning</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </StudentRoute>
    );
};

export default SingleCourse;