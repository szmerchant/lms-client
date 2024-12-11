import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import InstructorRoute from "../../components/routes/InstructorRoute";
import axios from "axios";
import {
    DollarOutlined,
    SettingOutlined,
    SyncOutlined
} from "@ant-design/icons";
import { stripeCurrencyFormatter } from "../../utils/helpers";

const InstructorRevenue = () => {
    const [ balance, setBalance ] = useState({ pending: [] });
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        sendBalanceRequest();
    }, []);

    const sendBalanceRequest = async () => {
        const { data } = await axios.get("/api/instructor/balance");
        setBalance(data);
    };

    const handlePayoutSettings = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/instructor/payout-settings");
            window.open(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            alert("Unable to access payout settings. Try again later.")
        }
    };

    return (
        <InstructorRoute>
            <div className="container">
                <div className="row pt-2">
                    <div className="col-md-8 offset-md-2 bg-light p-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Revenue Report</h2>
                            <DollarOutlined style={{ fontSize: "1.75rem" }} />
                        </div>
                        <small>
                            You get paid directly from Stripe to your bank account every 48 hours.
                        </small>
                        <hr />

                        <div className="d-flex justify-content-between align-items-center">
                            <h4>Pending Balance</h4>
                            {balance.pending && balance.pending.map((bp, i) => (
                                <span key={i} style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                                    {stripeCurrencyFormatter(bp)}
                                </span>
                            ))}
                        </div>
                        <small>For Last 48 Hours</small>
                        <hr />

                        <div className="d-flex justify-content-between align-items-center">
                            <h4>Payouts</h4>
                            {!loading ? (
                                <SettingOutlined 
                                    style={{ fontSize: "1.75rem", cursor: "pointer" }} 
                                    onClick={handlePayoutSettings} 
                                />
                            ) : (
                                <SyncOutlined
                                    spin
                                    style={{ fontSize: "1.75rem", cursor: "pointer" }}
                                />
                            )}
                        </div>
                        <small>Update your stripe account details or view previous payouts.</small>
                    </div>
                </div>
            </div>
        </InstructorRoute>
    );
};

export default InstructorRevenue;