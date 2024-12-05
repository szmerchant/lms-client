import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";

const InstructorIndex = () => {
    return (
        <InstructorRoute>
            <h1 className="jumbotron text-center square py-5">Instructor Dashboard</h1>
        </InstructorRoute>
    );
};

export default InstructorIndex;