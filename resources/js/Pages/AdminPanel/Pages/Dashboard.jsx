import React from "react";
import { Line } from "react-chartjs-2";
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
console.log(labels);

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [12, 19, 2, 5, 5, 3],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: [12, 19, 3, 5, 5, 3],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};

export default function Dashboard({ dataDetail }) {
    return (
        <>
            <MainLayout title="Dashboard" navbarTitle="Dashboard">
                <div className="card w-full bg-base-100 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title">Dashboard</h2>
                    </div>
                </div>
                <div className="card w-full max-w-4xl bg-base-100 shadow-sm mt-10">
                    <div className="card-body">
                        <Line options={options} data={data} />
                    </div>
                </div>
            </MainLayout>
        </>
    );
}
