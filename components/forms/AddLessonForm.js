import { Button } from "antd";

const AddLessonForm = ({ values, setValues, handleAddLesson, loading, uploadButtonText, handleVideo }) => {
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
            <label className="btn btn-dark btn-block text-left mb-3">
                {uploadButtonText}
                <input onChange={handleVideo} type="file" accept="video/*" hidden />
            </label>

            <Button
                onClick={handleAddLesson}
                className="col"
                size="large"
                type="primary"
                loading={loading}
                shape="round"
            >
                Save
            </Button>
        </div>
    </div>
};

export default AddLessonForm;