// redux like state management system using a reducer and context hook

import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// initial state
const initialState = {
    user: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        default:
            return state;      
    }
}

// context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user")),
        });
    }, []);

    axios.interceptors.response.use(
        function (response) {
            // Any status code in the range of 2xx triggers this function
            return response;
        },
        function (error) {
            let res = error.response;
    
            // Handle 401 errors (unauthorized) with custom logic
            if (res && res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.get("/api/logout")
                        .then(() => {
                            console.log("/401 error > logout");
                            dispatch({ type: "LOGOUT" });
                            window.localStorage.removeItem("user");
                            router.push("/login");
                        })
                        .catch((err) => {
                            console.log("AXIOS INTERCEPTORS ERR", err);
                            reject(err);
                        });
                });
            }
    
            // For other errors, ensure the error is propagated to the caller
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const getCsrfToken = async () => {
            const { data } = await axios.get("/api/csrf-token");
            axios.defaults.headers["X-CSRF-Token"] = data.csrfToken;
        };
        getCsrfToken();
    }, [])

    return (
        <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
};

export { Context, Provider };