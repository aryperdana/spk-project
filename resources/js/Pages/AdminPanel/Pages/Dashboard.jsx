import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import MainLayout from "../Layouts";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Penjualan Bulan Ini",
        },
    },
};

const totalDays = new Date(
    new Date().getFullYear(),
    parseInt(new Date().getMonth() + 1),
    0
).getDate();

const labels = Array.from({ length: totalDays }, (_, i) => i + 1);

export default function Dashboard({}) {
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
