import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal } from "antd";
import { EditOutlined, CheckOutlined, UploadOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm"

const CourseView = () => {
    const [ course, setCourse ] = useState({});
    // for lessons
    const [ visible, setVisible ] = useState(false);
    const [ values, setValues ] = useState({
        title: "",
        content: "",
        video: ""
    });
    const [ uploading, setUploading ] = useState(false);

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadCourse();
    }, [slug]);

    const loadCourse = async() => {
        const { data } = await axios.get(`/api/course/${slug}`);
        setCourse(data);
    }

    // FUNCTIONS FOR ADD LESSON
    const handleAddLesson = e => {
        e.preventDefault();
        console.log(values);
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

                        <br />

                        {/* Add Lesson Button */}
                        <div className="row">
                            <Button
                                onClick={() => setVisible(true)}
                                className="col-md-6 offset-md-3 text-center"
                                type="primary"
                                shape="round"
                                icon={<UploadOutlined />}
                                size="large"
                            >
                                Add Lesson
                            </Button>
                        </div>

                        <br />

                        {/* Add Lesson Modal Popup */}
                        <Modal title="+ Add Lesson"
                            centered
                            open={visible}
                            onCancel={() => setVisible(false)}
                            footer={null}
                        >
                            <AddLessonForm
                                values={values}
                                setValues={setValues}
                                handleAddLesson={handleAddLesson}
                                uplaoding={uploading}
                            />
                        </Modal>
                    </div>
                )}
            </div>
        </InstructorRoute>
    );
};

export default CourseView;