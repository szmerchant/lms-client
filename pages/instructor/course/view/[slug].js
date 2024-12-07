import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";

const CourseView = () => {
    const [ course, setCourse ] = useState({});

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadCourse();
    }, [slug]);

    const loadCourse = async() => {
        const { data } = await axios.get(`/api/course/${slug}`);
        setCourse(data);
    }

    return (
        <InstructorRoute>
            <div className="container-fluid pt-3">
                {course && (
                    <div className="container-fluid pt-1">
                        <div className="d-flex align-items-center justify-content-between pb-3">
                            {/* Avatar */}
                            <Avatar
                                size={80}
                                src={course.image ? course.image.Location : "/course.png"}
                            />

                            {/* Course Details */}
                            <div className="flex-grow-1 px-3" style={{ lineHeight: "1.4" }}>
                                <h5 className="text-primary mb-2">{course.name}</h5>
                                <p classsName="mb-1">
                                    {course.lessons && course.lessons.length} Lessons
                                </p>
                                <p className="text-muted mb-0" style={{ fontSize: "12px", marginTop: "-5px" }}>
                                    {course.category}
                                </p>
                            </div>

                            {/* Action Icons */}
                            <div className="d-flex align-items-center" style={{ gap: "20px" }}>
                                <Tooltip title="Edit">
                                    <EditOutlined className="h5 pointer text-warning" />
                                </Tooltip>
                                <Tooltip title="Publish">
                                    <CheckOutlined className="h5 pointer text-danger" />
                                </Tooltip>
                            </div>
                        </div>

                        <hr />

                        {/* Course Description */}
                        <div className="row">
                            <div className="col">
                                <h6 className="mb-3 text-secondary">Course Description</h6>
                                <div
                                    style={{
                                        padding: "10px",
                                        border: "1px solid #ddd",
                                        borderRadius: "5px",
                                        backgroundColor: "#f9f9f9",
                                        fontSize: "14px",
                                        lineHeight: "1.6",
                                    }}
                                >
                                    <ReactMarkdown>{course.description}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </InstructorRoute>
    );
};

export default CourseView;