import { useEffect, useState } from "react";
import api from "../api/api";

import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {

    const [summary, setSummary] = useState({
        users: 0,
        hcps: 0,
        leads: 0,
        appointments: 0,
        tasks: 0,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await api.get("/dashboard/summary");

            setSummary(response.data.cards);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainLayout>

            <h1>Dashboard</h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                <DashboardCard title="Users" value={summary.users} />

                <DashboardCard title="HCPs" value={summary.hcps} />

                <DashboardCard title="Leads" value={summary.leads} />

                <DashboardCard title="Appointments" value={summary.appointments} />

                <DashboardCard title="Tasks" value={summary.tasks} />
            </div>

        </MainLayout>
    );
}

export default Dashboard;