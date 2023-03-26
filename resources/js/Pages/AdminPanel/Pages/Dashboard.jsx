import React from "react";
import MainLayout from "../Layouts";

export default function Dashboard(props) {
    return (
        <>
            <MainLayout title="Dashboard" navbarTitle="Dashboard">
                <div className="card w-full bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Dashboard</h2>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
