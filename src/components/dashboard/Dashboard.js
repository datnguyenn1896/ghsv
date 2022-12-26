import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import Menu from "../menu/Menu";

const Dashboard = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)

    console.log(isAuthenticated)
    return (
        <div className="dashboard-container">
            <Header />
            {/* <Menu /> */}
        </div>
    )
}

export default Dashboard;