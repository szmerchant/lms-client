import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../../../../components/forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Avatar, List } from "antd";

const { Item } = List;

const CourseEdit = () => {
    // state
    const [ values, setValues ] = useState({
        name: "",
        description: "",
        price: 9.99,
        uploading: false,
        paid: true,
        category: "",
        loading: false,
        lessons: []
    });
    const [ image, setImage ] = useState({});
    const [ preview, setPreview ] = useState("");
    const [ uploadButtonText, setUploadButtonText ] = useState("Upload Image");

    // router
    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {
        loadCourse();
    }, [slug]);

    const loadCourse = async () => {
        const { data } = await axios.get(`/api/course/${slug}`);
        if(data) setValues(data);
        if(data && data.image) setImage(data.image);
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        let file = e.target.files[0];
        setPreview(window.URL.createObjectURL(file));
        setUploadButtonText(file.name);
        setValues({ ...values, loading: true });

        // resize
        Resizer.default.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                let { data } = await axios.post("/api/course/upload-image", {
                    image: uri
                });
                console.log("IMAGE UPLOADED", data);
                // set image in the state
                setImage(data);
                setValues({ ...values, loading: false });
            } catch (err) {
                console.log(err);
                setValues({ ...values, loading: false });
                toast("Image upload failed. Try again.");
            }
        }, "base64");
    };

    const handleImageRemove = async (e) => {
        try {
            setValues({ ...values, loading: true });
            const res = await axios.post("/api/course/remove-image", { image });
            setImage({});
            setPreview("");
            setUploadButtonText("Upload Image");
            setValues({ ...values, loading: false });
        } catch (err) {
            console.log(err);
            setValues({ ...values, loading: false });
            toast("Image removal failed. Try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(values);
        try {
            const { data } = await axios.put(`/api/course/${slug}`, {
                ...values,
                image
            });
            toast("Course updated!");
            // router.push("/instructor");
        } catch (err) {
            toast(err.response.data);
        }
    };

    const handleDrag = (e, index) => {
        // console.log("ON DRAG => ", index);
        e.dataTransfer.setData("itemIndex", index);
    };

    const handleDrop = async (e, index) => {
        // console.log("ON DROP => ", index);
        const movingItemIndex = e.dataTransfer.getData("itemIndex");
        const targetItemIndex = index;
        let allLessons = values.lessons;

        let movingItem = allLessons[movingItemIndex]; // clicked/dragged item to re-order
        allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
        allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index

        setValues({ ...values, lessons: [...allLessons] });

        // save the new lessons order in db
        const { data } = await axios.put(`/api/course/${slug}`, {
            ...values,
            image
        });
        toast("Lessons rearranged successfully");
    };

    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square py-5">Update Course</h1>
            <div className="pt-3 pb-3">
                <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleImage={handleImage}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                    handleImageRemove={handleImageRemove}
                    editPage={true}
                />
            </div>

            <hr />

            <div className="row pb-5">
                <div className-="col lesson-list">
                    <h4>
                        {values && values.lessons && values.lessons.length} Lessons
                    </h4>
                    <List
                        onDragOver={(e) => e.preventDefault()}
                        itemLayout="horizontal"
                        dataSource={values && values.lessons}
                        renderItem={(item, index) => (
                            <Item
                                draggable
                                onDragStart={e => handleDrag(e, index)}
                                onDrop={e => handleDrop(e, index)}
                            >
                                <Item.Meta
                                    avatar={<Avatar>{index + 1}</Avatar>}
                                    title={item.title}
                                ></Item.Meta>
                            </Item>
                    )}></List>
                </div>
            </div>
        </InstructorRoute>
    );
};

export default CourseEdit;