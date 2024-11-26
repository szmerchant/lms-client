import TopNav from "../components/TopNav.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "../public/css/styles.css";

function MyApp ({ Component, pageProps }) {
    return (
        <>
            <TopNav />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;