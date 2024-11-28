import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";

const UserIndex = () => {
    // state
    const [ hidden, setHidden ] = useState(true);

    const { state: { user } } = useContext(Context);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/current-user");
            console.log(data);
            console.log("user fetched");
            setHidden(false);
        } catch (err) {
            console.log("user fetch error");
            console.log(err);
            setHidden(true);
        }
    };

    return (
        <>
            {!hidden && <h1 className="jumbotron text-center square py-5">
                <pre>{JSON.stringify(user, null, 4)}</pre>
            </h1>}
        </>
    )
};

export default UserIndex;