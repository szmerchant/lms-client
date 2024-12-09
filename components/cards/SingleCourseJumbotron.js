import { Badge } from "antd";
import { currencyFormatter } from "../../utils/helpers";
import ReactPlayer from "react-player";

const SingleCourseJumbotron = ({
    course, 
    showModal,
    setShowModal,
    preview,
    setPreview
}) => {
    const { name, description, instructor, updatedAt, lessons, image, price, paid, category } = course;

    return (
        <>
            <div
                className="jumbotron bg-primary square p-4"
                style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                }}
            >
                <div className="row align-items-center">
                    {/* Left Content */}
                    <div className="col-md-8 text-light">
                        {/* Title */}
                        <h1 className="font-weight-bold mb-3">{name}</h1>

                        {/* Description */}
                        <p className="lead mb-3">
                            {description && description.substring(0, 160)}...
                        </p>

                        {/* Category */}
                        <Badge
                            count={category}
                            style={{
                                backgroundColor: "#03a9f4",
                                fontSize: "14px",
                                borderRadius: "8px",
                                whiteSpace: "nowrap", // Prevents truncation
                                wordBreak: "keep-all", // Ensures badge text stays intact
                            }}
                            className="mb-3 d-inline-block"
                        />

                        {/* Instructor and Last Updated */}
                        <p className="mb-2">
                            <strong>Created by:</strong> {instructor.name}
                        </p>

                        {/* Updated At */}
                        <p className="mb-3">
                            <strong>Last updated</strong>{" "}
                            {new Date(updatedAt).toLocaleDateString()}
                        </p>

                        {/* Price */}
                        <h4 className="mb-0">
                            {paid
                                ? currencyFormatter({ amount: price, currency: "usd" })
                                : "Free" }
                        </h4>
                    </div>

                    {/* Right Content */}
                    <div className="col-md-4 text-center">
                        {/* Video Preview or Course Image */}
                        {lessons[0].video && lessons[0].video.Location ? (
                            <div
                                className="video-preview-container mb-3"
                                onClick={() => {
                                    setPreview(lessons[0].video.Location);
                                    setShowModal(!showModal);
                                }}
                                style={{
                                    cursor: "pointer",
                                    borderRadius: "10px",
                                    overflow: "hidden",
                                }}
                            >
                                <ReactPlayer.default
                                    className="react-player-div"
                                    url={lessons[0].video.Location}
                                    light={image.Location}
                                    width="100%"
                                    height="225px"
                                    style={{
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                <img
                                    src={image.Location}
                                    alt={name}
                                    className="img-fluid mb-3"
                                    style={{
                                        maxHeight: "225px",
                                        borderRadius: "10px",
                                        objectFit: "cover",
                                    }}
                                />
                            </>
                        )}

                        {/* Enroll Button */}
                        <button
                            className="btn btn-warning btn-lg px-4"
                            style={{
                                fontWeight: "bold",
                                borderRadius: "20px",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            Enroll Now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleCourseJumbotron;