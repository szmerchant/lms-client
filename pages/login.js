import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // state
    const {state, dispatch} = useContext(Context);
    const { user } = state;

    // router
    const router = useRouter();

    // useEffect(() => {
    //     if(user !== null) router.push("/");
    // }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/login", {
                email,
                password,
            });
            const { data } = response;
            
            // Dispatch user login action
            dispatch({
                type: "LOGIN",
                payload: data,
            });
            // Save user data in local storage
            window.localStorage.setItem("user", JSON.stringify(data));
            // Redirect to homepage
            router.push("/user");
        } catch (err) {
            // Handle 400 errors explicitly
            if (err.response && err.response.status == 400) {
                toast.error(err.response.data); // Display error message from server
            } else {
                // Handle other types of errors
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false); // Ensure loading is turned off
        }
    };
    
    return (
        <>
            <h1 className="jumbotron text-center bg-primary square py-5">Login</h1>
            
            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-control mb-4 p-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-4 p-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />

                    <button type="submit" className="btn btn-block btn-primary w-100"
                        disabled={!email || !password || loading}>
                        {loading ? <SyncOutlined spin /> : "Submit"}
                    </button>
                </form>

                <p className="text-center pt-3">
                    Not yet registered?{" "}
                    <Link href="/register">
                        Register
                    </Link>
                </p>


                <p className="text-center">
                    <Link href="/forgot-password">
                        Forgot Password?
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;