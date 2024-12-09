import { Button, Progress, Switch } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import ReactPlayer from "react-player";

const UpdateLessonForm = ({
    current,
    setCurrent,
    handleUpdateLesson,
    uploading,
    uploadVideoButtonText,
    handleVideo,
    progress
}) => {
    return <div className="container pt-3">
        <form onSubmit={handleUpdateLesson}>
            <input
                type="text"
                className="form-control square"
                onChange={(e) => setCurrent({ ...current, title: e.target.value })}
                value={current.title}
                autoFocus
                required
            />
        </form>

        {/* Text Area */}
        <textarea
            className="form-control mt-3"
            cols="7"
            rows="7"
            onChange={(e) => setCurrent({ ...current, content: e.target.value })}
            value={current.content}
        ></textarea>

        <div className="d-flex flex-column mt-3">
            {/* Video Preview */}
            {!uploading && current.video && current.video.Location && (
                <div className="mt-4 d-flex justify-content-center">
                    <ReactPlayer.default
                        url={current.video.Location}
                        width="100%"
                        height="240px"
                        controls
                    />
                </div>
            )}

            {/* Upload Video Button */}
            <label className="btn btn-dark btn-block text-left mt-4">
                {uploadVideoButtonText}
                <input onChange={handleVideo} type="file" accept="video/*" hidden />
            </label>

            {/* Progress Bar */}
            {progress > 0 && (
                <div className="mt-3 mb-1">
                    <Progress
                        className="d-flex justify-content-center"
                        percent={progress}
                        steps={10}
                    />
                </div>
            )}

            {/* Preview Toggle */}
            <div className="d-flex justify-content-between mt-4 mb-4">
                <span className="pt-2 badge" style={{ color: "#000" }}>Preview</span>
                <Switch
                    className="float-right mt-2"
                    disabled={uploading}
                    defaultChecked={current.free_preview}
                    name="free_preview"
                    onChange={(v) => setCurrent({ ...current, free_preview: v })}
                />
            </div>

            {/* Save Button */}
            <Button
                onClick={handleUpdateLesson}
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

export default UpdateLessonForm;