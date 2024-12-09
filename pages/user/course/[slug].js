import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";

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
            <div className="row">
                {/* Sidebar Menu */}
                <div style={{ maxWidth: 320 }}>
                    <Menu
                        items={menuItems}
                        defaultSelectedKeys={[`${clicked}`]}
                        mode="inline"
                        inlineCollapsed={collapsed}
                        style={{
                            height: "80vh",
                            overflow: "auto",
                            borderRight: "1px solid #ddd",
                        }}
                    />
                </div>

                {/* Lesson Content */}
                <div className="col" style={{ paddingLeft: "20px" }}>
                    {clicked !== -1 ? (
                        <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
                            <h3>{course.lessons[clicked].title}</h3>
                            <p>{course.lessons[clicked].content}</p>
                        </div>
                    ) : (
                        <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>
                            Click on a lesson to start learning
                        </div>
                    )}
                </div>
            </div>
        </StudentRoute>
    );
};

export default SingleCourse;