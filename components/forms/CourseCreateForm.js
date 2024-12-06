import { Select, Button, Avatar, Badge } from "antd";

const { Option } = Select;

const CourseCreateForm = ({
    handleSubmit,
    handleImage,
    handleChange,
    values,
    setValues, 
    preview,
    uploadButtonText,
    handleImageRemove
}) => {
    const children = [];
    for (let i = 9.99; i <= 100.99; i++){
        children.push(
            <Option key={i.toFixed(2)} value={parseFloat(i.toFixed(2))}>
                ${i.toFixed(2)}
            </Option>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group pt-3">
                <textarea
                    name="description"
                    cols="7"
                    rows="7"
                    value={values.description}
                    className="form-control"
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="form-row align-items-center pt-3" style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Free/Paid Dropdown */}
                <div className="col" style={{ flexGrow: 1, marginRight: "10px" }}>
                    <div className="form-group">
                        <Select
                            style={{ width: "100%" }}
                            size="large"
                            value={values.paid}
                            onChange={v => setValues({...values, paid: !values.paid})}
                        >
                            <Option value={true}>Paid</Option>
                            <Option value={false}>Free</Option>
                        </Select>
                    </div>
                </div>

                {/* Price Dropdown */}
                {values.paid && (
                    <div className="col-auto" style={{ flexShrink: 0 }}>
                        <div className="form-group">
                            <Select
                                value={values.price}
                                style={{ width: "100px" }}
                                onChange={v => setValues({ ...values, price: v })}
                                size="large"
                            >
                                {children}
                            </Select>
                        </div>
                    </div>
                )}
            </div>

            <div className="form-group pt-3">
                <input
                    type="text"
                    name="category"
                    className="form-control"
                    placeholder="Category"
                    value={values.category}
                    onChange={handleChange}
                />
            </div>

            <div className="form-row pt-3" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {/* Image Upload Button */}
                <div className="col-auto">
                    <div className="form-group">
                        <label className="btn btn-outline-secondary btn-blcok text-left">
                            {uploadButtonText}
                            <input
                                type="file"
                                name="image"
                                onChange={handleImage}
                                accept="image/*"
                                hidden
                            />
                        </label>
                    </div>
                </div>

                {/* Image Preview */}
                {preview && (
                    <div className="col-auto">
                        <Badge count="X" onClick={handleImageRemove} className="pointer" >
                            <Avatar width={200} src={preview} />
                        </Badge>
                    </div>
                )}
            </div>

            <div className="row pt-3">
                <div className="col">
                    <Button
                        onClick={handleSubmit}
                        disabled={values.loading || values.uploading}
                        className="btn btn-primary"
                        loading={values.loading}
                        type="primary"
                        size="large"
                        shape="round"
                    >
                        {values.loading ? "Saving..." : "Save & Continue"}
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default CourseCreateForm;