import { Button, Progress, Tooltip } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const AddLessonForm = ({
    values,
    setValues,
    handleAddLesson,
    uploading,
    uploadButtonText,
    handleVideo,
    progress,
    handleVideoRemove
}) => {
    return <div className="container pt-3">
        <form onSubmit={handleAddLesson}>
            <input
                type="text"
                className="form-control square"
                onChange={(e) => setValues({ ...values, title: e.target.value })}
                values={values.title}
                placeholder="Title"
                autoFocus
                required
            />
        </form>

        <textarea
            className="form-control mt-3"
            cols="7"
            rows="7"
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            values={values.content}
            placeholder="Content"
        ></textarea>

        {/* Buttons Container */}
        <div className="d-flex flex-column mt-3">
            {/* Upload Video Button with Remove Icon */}
            <div className="d-flex justify-content-center mb-3">
                {/* Upload Button */}
                <label className="btn btn-dark btn-block text-left">
                    {uploadButtonText}
                    <input onChange={handleVideo} type="file" accept="video/*" hidden />
                </label>

                {/* Remove Icon */}
                {!uploading && values.video.Location && (
                    <Tooltip title="Remove">
                        <span
                            onClick={handleVideoRemove}
                            className="d-flex align-items-center"
                            style={{
                                marginLeft: "15px", // Add spacing here
                                cursor: "pointer",
                            }}
                        >
                            <CloseCircleFilled className="text-danger" />
                        </span>
                    </Tooltip>
                )}
            </div>

            {/* Progress Bar */}
            {progress > 0 && (
                <div className="mb-3">
                    <Progress
                        className="d-flex justify-content-center"
                        percent={progress}
                        steps={10}
                    />
                </div>
            )}

            {/* Save Button */}
            <Button
                onClick={handleAddLesson}
                className="col"
                size="large"
                type="primary"
                loading={uploading}
                shape="round"
            >
                Save
            </Button>
        </div>
    </div>
};

export default AddLessonForm;