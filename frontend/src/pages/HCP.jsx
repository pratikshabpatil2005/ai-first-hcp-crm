import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function HCP() {
    const [hcps, setHcps] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [form, setForm] = useState({
        name: "",
        specialization: "",
        hospital: "",
        location: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        loadHcps();
    }, []);

    const loadHcps = async () => {
        try {
            const response = await api.get("/hcps");
            setHcps(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const clearForm = () => {
        setForm({
            name: "",
            specialization: "",
            hospital: "",
            location: "",
            phone: "",
            email: "",
        });

        setEditingId(null);
    };

    const createHcp = async () => {
        try {
            await api.post("/hcps", form);
            clearForm();
            loadHcps();
        } catch (error) {
            console.error(error);
        }
    };

    const editHcp = (hcp) => {
        setEditingId(hcp.id);

        setForm({
            name: hcp.name,
            specialization: hcp.specialization,
            hospital: hcp.hospital,
            location: hcp.location,
            phone: hcp.phone,
            email: hcp.email,
        });
    };

    const updateHcp = async () => {
        try {
            await api.put(`/hcps/${editingId}`, form);

            clearForm();
            loadHcps();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteHcp = async (id) => {
        if (!window.confirm("Delete this HCP?")) return;

        try {
            await api.delete(`/hcps/${id}`);
            loadHcps();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainLayout>
            <h1>HCP Management</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "10px",
                    marginBottom: "20px",
                }}
            >
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                    }
                />

                <input
                    placeholder="Specialization"
                    value={form.specialization}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            specialization: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Hospital"
                    value={form.hospital}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            hospital: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            location: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            phone: e.target.value,
                        })
                    }
                />

                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                />
            </div>

            {editingId ? (
                <>
                    <button onClick={updateHcp}>Update HCP</button>

                    <button
                        onClick={clearForm}
                        style={{ marginLeft: "10px" }}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <button onClick={createHcp}>Add HCP</button>
            )}

            <br />
            <br />

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Hospital</th>
                        <th>Location</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {hcps.map((hcp) => (
                        <tr key={hcp.id}>
                            <td>{hcp.name}</td>
                            <td>{hcp.specialization}</td>
                            <td>{hcp.hospital}</td>
                            <td>{hcp.location}</td>
                            <td>{hcp.phone}</td>
                            <td>{hcp.email}</td>

                            <td>
                                <button
                                    onClick={() => editHcp(hcp)}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteHcp(hcp.id)}
                                    style={{ marginLeft: "10px" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </MainLayout>
    );
}

export default HCP;