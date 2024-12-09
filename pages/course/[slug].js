import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLessons from "../../components/cards/SingleCourseLessons";

const SingleCourse = ({ course }) => {
    // state
    const [ showModal, setShowModal ] = useState(false);
    const [ preview, setPreview ] = useState("");

    const router = useRouter();
    const { slug } = router.query;

    const { name, description, instructor, updatedAt, lessons, image, price, paid, category } = course;

    return (
        <>
            <SingleCourseJumbotron
                course={course}
                showModal={showModal}
                setShowModal={setShowModal}
                preview={preview}
                setPreview={setPreview}
            />

            <PreviewModal
                showModal={showModal}
                setShowModal={setShowModal}
                preview={preview}
            />

            {course.lessons && (
                <div className="mt-4">
                    <SingleCourseLessons
                        lessons={course.lessons}
                        setPreview={setPreview}
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                </div>
            )}
        </>
    );
};

export async function getServerSideProps({ query }) {
    const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
    return {
        props: {
            course: data
        }
    }
};

export default SingleCourse;