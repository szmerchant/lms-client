import { Modal } from "antd";
import ReactPlayer from "react-player";

const PreviewModal = ({ showModal, setShowModal, preview }) => {
    return (
        <>
            <Modal
                title="Course Preview"
                open={showModal}
                onCancel={() => setShowModal(!showModal)}
                width={720}
                footer={null}
            >
                <div className="wrapper">
                    <ReactPlayer.default
                        url={preview}
                        playing={showModal}
                        controls={true}
                        width="100%"
                        height="100%"
                    />
                </div>
            </Modal>
        </>
    );
};

export default PreviewModal;