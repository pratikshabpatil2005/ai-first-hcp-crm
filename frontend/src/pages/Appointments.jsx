

import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function Appointments() {

    const [appointments, setAppointments] = useState([]);

    const [form, setForm] = useState({
        hcp_name: "",
        hospital: "",
        appointment_date: "",
        appointment_time: "",
        status: "Scheduled",
        notes: ""
    });

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            const response = await api.get("/appointments");
            setAppointments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createAppointment = async () => {
        try {
            await api.post("/appointments", form);

            setForm({
                hcp_name: "",
                hospital: "",
                appointment_date: "",
                appointment_time: "",
                status: "Scheduled",
                notes: ""
            });

            loadAppointments();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainLayout>

            <h1>Appointments</h1>

            <div style={{ marginBottom: "20px" }}>

                <input
                    placeholder="HCP Name"
                    value={form.hcp_name}
                    onChange={(e) =>
                        setForm({ ...form, hcp_name: e.target.value })
                    }
                />

                <input
                    placeholder="Hospital"
                    value={form.hospital}
                    onChange={(e) =>
                        setForm({ ...form, hospital: e.target.value })
                    }
                />

                <input
                    type="date"
                    value={form.appointment_date}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            appointment_date: e.target.value
                        })
                    }
                />

                <input
                    type="time"
                    value={form.appointment_time}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            appointment_time: e.target.value
                        })
                    }
                />

                <select
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value
                        })
                    }
                >
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                </select>

                <input
                    placeholder="Notes"
                    value={form.notes}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            notes: e.target.value
                        })
                    }
                />

                <button onClick={createAppointment}>
                    Add Appointment
                </button>

            </div>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>HCP Name</th>
                        <th>Hospital</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Notes</th>
                    </tr>
                </thead>

                <tbody>

                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.hcp_name}</td>
                            <td>{appointment.hospital}</td>
                            <td>{appointment.appointment_date}</td>
                            <td>{appointment.appointment_time}</td>
                            <td>{appointment.status}</td>
                            <td>{appointment.notes}</td>
                        </tr>
                    ))}

                </tbody>

            </table>

        </MainLayout>
    );
}

export default Appointments;