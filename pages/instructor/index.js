import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";


const InstructorIndex = () => {
    const [ courses, setCourses ] = useState([]);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        const { data } = await axios.get("/api/instructor-courses");
        setCourses(data);
    };

    const myStyle = { marginTop: "5px", fontSize: "12px"};

    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square py-5">Instructor Dashboard</h1>
            {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

            {courses && courses.map(course => (
                <>
                    <div className="d-flex align-items-center border-bottom py-3" style={{ paddingRight: "20px" }} key={course._id}>
                        {/* Avatar */}
                        <Avatar
                            size={80}
                            src={course.image ? course.image.Location : "/course.png"} 
                        />

                        {/* Course Details */}
                        <div className="flex-grow-1 px-3">
                            <Link href={`/instructor/course/view/${course.slug}`} className="pointer text-primary">
                                <h5 className="mb-1">{course.name}</h5>
                            </Link>
                            <p className="mb-1">{course.lessons.length} Lessons</p>

                            {course.lessons.length < 5 ? (
                                <p style={myStyle} className="text-warning mb-0">At least 5 lessons are required to publish a course</p>
                            ) : course.published ? (
                                <p style={myStyle} className="text-success mb-0">Your course is live in the marketplace</p>
                            ) : (
                                <p style={myStyle} className="text-success mb-0">Your course is ready to be published</p>
                            )}
                        </div>

                        {/* Status Icon */}
                        <div style={{ position: "relative", right: "10px" }}>
                            {course.published ? (
                                <Tooltip title="Published">
                                    <CheckCircleOutlined className="h5 pointer text-success" />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Unpublished">
                                    <CloseCircleOutlined className="h5 pointer text-warning" />
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </>
            ))}
        </InstructorRoute>
    );
};

export default InstructorIndex;