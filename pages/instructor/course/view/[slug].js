import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import { EditOutlined, CheckOutlined, UploadOutlined, QuestionOutlined, CloseOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import { toast } from "react-toastify";

const { Item } = List;

const CourseView = () => {
    const [ course, setCourse ] = useState({});
    // for lessons
    const [ visible, setVisible ] = useState(false);
    const [ values, setValues ] = useState({
        title: "",
        content: "",
        video: {}
    });
    const [ uploading, setUploading ] = useState(false);
    const [ uploadButtonText, setUploadButtonText ] = useState("Upload Video");
    const [ progress, setProgress ] = useState(0);

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadCourse();
    }, [slug]);

    const loadCourse = async() => {
        const { data } = await axios.get(`/api/course/${slug}`);
        setCourse(data);
    };

    // FUNCTIONS FOR ADD LESSON
    const handleAddLesson = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/course/lesson/${slug}/${course.instructor._id}`, values);
            // console.log(data);
            setValues({ ...values, title: "", content: "", video: {} });
            setVisible(false);
            setUploadButtonText("Upload Video");
            setCourse(data);
            toast("Lesson added");
        } catch (err) {
            console.log(err);
            toast("Lesson add failed");
        }
    };

    const handleVideo = async (e) => {
        try {
            const file = e.target.files[0];
            setUploadButtonText(file.name);
            setUploading(true);

            const videoData = new FormData();
            videoData.append("video", file);
            // save progress bar and send video as form data to backend
            const { data } = await axios.post(
                `/api/course/video-upload/${course.instructor._id}`,
                videoData,
                {
                    onUploadProgress: (e) => {
                        setProgress(Math.round((100 * e.loaded) / e.total))
                    }
                }
            );
            // once response is received
            console.log(data);
            setValues({...values, video: data});
            setUploading(false);
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast("Video upload failed");
        }
    };

    const handleVideoRemove = async () => {
        try {
            setUploading(true);
            const { data } = await axios.post(
                `/api/course/video-remove/${course.instructor._id}`,
                values.video
            );
            console.log(data);
            setValues({ ...values, video: {}});
            setUploading(false);
            setUploadButtonText("Upload another video");
        } catch (err) {
            console.log(err);
            setUploading(false);
            toast("Video remove failed");
        }
    };

    const handlePublish = async (e, courseId) => {
        try {
            let answer = window.confirm("Once you publish your course, it will be live in the marketplace for users to enroll");
            if(!answer) return;
            const { data } = await axios.put(`/api/course/publish/${courseId}`);
            setCourse(data);
            toast("Congrats! Your course is live");
        } catch (err) {
            toast("Course publish failed. Try again");
        }
    };

    const handleUnpublish = async (e, courseId) => {
        try {
            let answer = window.confirm("Once you unpublish your course, it will not be available for users to enroll");
            if(!answer) return;
            const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
            setCourse(data);
            toast("Your course is unpublished");
        } catch (err) {
            toast("Course unpublish failed. Try again");
        }
    };

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
                                <p className="mb-1">
                                    {course.lessons && course.lessons.length} Lessons
                                </p>
                                <p className="text-muted mb-0" style={{ fontSize: "12px", marginTop: "-5px" }}>
                                    {course.category}
                                </p>
                            </div>

                            {/* Action Icons */}
                            <div className="d-flex align-items-center" style={{ gap: "20px" }}>
                                <Tooltip title="Edit">
                                    <EditOutlined onClick={() => router.push(`/instructor/course/edit/${slug}`)} className="h5 pointer text-warning" />
                                </Tooltip>

                                {course.lessons && course.lessons.length < 5 ? (
                                    <Tooltip title="Minimum 5 lessons are required to publish">
                                        <QuestionOutlined className="h5 pointer text-danger" />
                                    </Tooltip>
                                ) : course.published ?  (
                                    <Tooltip title="Unpublish">
                                        <CloseOutlined
                                            onClick={(e) => handleUnpublish(e, course._id)}
                                            className="h5 pointer text-danger"
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Publish">
                                        <CheckOutlined
                                            onClick={(e) => handlePublish(e, course._id)}
                                            className="h5 pointer text-success"
                                        />
                                    </Tooltip>
                                )}
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
                                uploading={uploading}
                                uploadButtonText={uploadButtonText}
                                handleVideo={handleVideo}
                                progress={progress}
                                handleVideoRemove={handleVideoRemove}
                            />
                        </Modal>

                        <div className="row pb-5">
                            <div className-="col lesson-list">
                                <h4>
                                    {course && course.lessons && course.lessons.length} Lessons
                                </h4>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={course && course.lessons}
                                    renderItem={(item, index) => (
                                        <Item>
                                            <Item.Meta
                                                avatar={<Avatar>{index + 1}</Avatar>}
                                                title={item.title}
                                            ></Item.Meta>
                                        </Item>
                                )}></List>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </InstructorRoute>
    );
};

export default CourseView;