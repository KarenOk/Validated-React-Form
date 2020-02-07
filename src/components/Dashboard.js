import React from "react";
import image from "../images/wave.gif"
import "../styles/Dashboard.css";

function Dashboard() {
    return (
        <main className="dashboard">
            <img src={image} alt={"Garfield waving"} />
            <h1> Welcome to Softcom! </h1>
        </main>
    );

}

export default Dashboard;