

import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium"
    });

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createTask = async () => {
        try {
            await api.post("/tasks", form);

            setForm({
                title: "",
                description: "",
                status: "Pending",
                priority: "Medium"
            });

            loadTasks();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainLayout>

            <h1>Task Management</h1>

            <div style={{ marginBottom: "20px" }}>

                <input
                    placeholder="Task Title"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value
                        })
                    }
                />

                <select
                    value={form.priority}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            priority: e.target.value
                        })
                    }
                >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>

                <select
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value
                        })
                    }
                >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>

                <button onClick={createTask}>
                    Add Task
                </button>

            </div>

            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>Title</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {tasks.map((task) => (

                        <tr key={task.id}>

                            <td>{task.title}</td>

                            <td>{task.description}</td>

                            <td>{task.priority}</td>

                            <td>{task.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </MainLayout>
    );
}

export default Tasks;