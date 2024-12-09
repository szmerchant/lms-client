import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { Avatar } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";

const UserIndex = () => {
    const { state: { user } } = useContext(Context);
    const [ courses, setCourses ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/user-courses");
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    return (
        <UserRoute>
            {loading && (
                <SyncOutlined
                    spin
                    className="d-flex justify-content-center display-1 text-danger p-5"
                />
            )}
            <h1 className="jumbotron text-center square py-5">User Dashboard</h1>
            
            {/* Show list of courses */}
            {courses && courses.map(course => (
                <div
                    key={course._id}
                    className="d-flex align-items-center justify-content-between mb-4 px-3"
                    style={{
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        padding: "15px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    {/* Avatar */}
                    <Avatar
                        size={80}
                        shape="square"
                        src={course.image ? course.image.Location : "/course.png" }
                    />

                    {/* Course Details */}
                    <div
                        className="flex-grow-1"
                        style={{
                            marginLeft: "20px",
                        }}
                    >
                        <Link
                            href={`/user/course/${course.slug}`}
                            className="pointer"
                            style={{ textDecoration: "none" }}
                        >
                            <h5
                                className="mb-1"
                                style={{
                                    fontWeight: "bold",
                                    color: "#333",
                                }}
                            >
                                {course.name}
                            </h5>
                        </Link>
                        <p className="mb-1" style={{ color: "#555" }}>
                            {course.lessons.length} Lessons
                        </p>
                        <p
                            className="text-muted"
                            style={{
                                fontSize: "12px",
                                marginTop: "-5px",
                            }}
                        >
                            By {course.instructor.name}
                        </p>
                    </div>

                    {/* Play Icon */}
                    <div className="text-center">
                        <Link href={`/user/course/${course.slug}`} className="pointer">
                            <PlayCircleOutlined
                                className="h2 pointer text-primary"
                                style={{ marginRight: "10px" }}
                            />
                        </Link>
                    </div>
                </div>
            ))}
        </UserRoute>
    );
};

export default UserIndex;