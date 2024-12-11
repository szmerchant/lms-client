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
    MenuUnfoldOutlined,
    CheckCircleFilled,
    MinusCircleFilled
} from "@ant-design/icons";


const SingleCourse = () => {
    const [ clicked, setClicked ] = useState(-1);
    const [ collapsed, setCollapsed ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ course, setCourse ] = useState({ lessons: [] });
    const [ completedLessons, setCompletedLessons ] = useState([]);
    // force state update
    const [ updateState, setUpdateState ] = useState(false);

    // router
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        if (slug) loadCourse();
    }, [slug]);

    useEffect(() => {
        if(course) loadCompletedLessons();
    }, [course]);

    const loadCourse = async () => {
        const { data } = await axios.get(`/api/user/course/${slug}`);
        setCourse(data);
    };

    const loadCompletedLessons = async () => {
        const { data } = await axios.post(`/api/list-completed`, {
            courseId: course._id
        });
        console.log("COMPLETED LESSONS => ", data);
        setCompletedLessons(data);
    };

    // Create Menu items
    const menuItems = course.lessons.map((lesson, index) => ({
        key: index,
        icon: <Avatar>{index + 1}</Avatar>,
        label: (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{lesson.title.substring(0, 30)}</span>
                {completedLessons.includes(lesson._id) ? (
                    <CheckCircleFilled
                        className="text-primary"
                    />
                ) : (
                    <MinusCircleFilled
                        className="text-danger"
                    />
                )}
            </div>
        ),
        onClick: () => setClicked(index),
    }));

    const markCompleted = async () => {
        try {
            const { data } = await axios.post(`/api/mark-completed`, {
                courseId: course._id,
                lessonId: course.lessons[clicked]._id
            });
            console.log(data);
            setCompletedLessons([ ...completedLessons, course.lessons[clicked]._id ]);
        } catch (err) {
            console.log(err);
        }
    };

    const markIncompleted = async () => {
        try {
            const { data } = await axios.post(`/api/mark-incompleted`, {
                courseId: course._id,
                lessonId: course.lessons[clicked]._id
            });
            console.log(data);
            const all = completedLessons;
            const index = all.indexOf(course.lessons[clicked]._id);
            if(index > -1) {
                all.splice(index, 1);
                setCompletedLessons(all);
                setUpdateState(!updateState);
            }
        } catch (err) {
            console.log(err);
        }
    };

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
                        <>
                        <div
                            className="col alert alert-primary square"
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        >
                            <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                            {completedLessons.includes(course.lessons[clicked]._id) ? (
                                <span className="pointer" onClick={markIncompleted} style={{ marginLeft: "auto" }}>
                                    Mark As Incompleted
                                </span>
                            ) : (
                                <span className="pointer" onClick={markCompleted} style={{ marginLeft: "auto" }}>
                                    Mark As Completed
                                </span>
                            )}
                        </div>
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
                                            onEnded={() => markCompleted()}
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