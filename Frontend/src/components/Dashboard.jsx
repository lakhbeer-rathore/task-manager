import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";


function Dashboard() {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    async function fetchTasks() {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/task",
                {
                    withCredentials: true,
                }
            );

            setTasks(response.data);

        } catch (error) {
            console.log(error.response?.data || error.message);

            navigate("/");
        }
    }



    async function handleAddTask() {
        console.log("Button clicked");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/task",
                {
                    title,
                    description,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);
            fetchTasks();

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    // async function handleDeleteTask(id) {
    //     console.log(id);

    //     try {
    //         await axios.delete(
    //             `http://localhost:5000/api/task/${id}`,
    //             {
    //                 withCredentials: true,
    //             }
    //         );

    //         setTasks(tasks.filter(task => task._id !== id));

    //     } catch (error) {
    //         console.log(error.response?.data || error.message);
    //     }
    // }

    async function handleDeleteTask(id) {
        console.log("Deleting:", id);

        try {
            await axios.delete(
                `http://localhost:5000/api/task/${id}`,
                {
                    withCredentials: true,
                }
            );

            console.log("Before:", tasks);

            const updatedTasks = tasks.filter(
                (task) => task._id !== id
            );

            console.log("After:", updatedTasks);

            setTasks(updatedTasks);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    async function handleLogout() {
        try {
            await axios.post(
                "http://localhost:5000/api/user/logout",
                {},
                {
                    withCredentials: true,
                }
            );

            navigate("/");

        } catch (error) {
            console.log(error.response?.data || error.message);

            navigate("/");
        }
    }

    async function handleUpdateTask() {
        try {
            await axios.put(
                `http://localhost:5000/api/task/${editId}`,
                {
                    title: editTitle,
                    description: editDescription,
                },
                {
                    withCredentials: true,
                }
            );

            fetchTasks();

            setEditId(null);

        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    useEffect(() => {
        fetchTasks();

    }, []);


    return (
        <div className="dashboard">
            <h1 className="heading">
                Task Manager Dashboard
            </h1>
            <p>Welcome to Task Manager</p>
            {tasks.map((task) => (
                <div className="task-card" key={task._id}>
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>

                    <button
                        className="btn delete-btn"
                        onClick={() => handleDeleteTask(task._id)}
                    >
                        Delete
                    </button>

                    <button
                        className="btn edit-btn"
                        onClick={() => {
                            setEditId(task._id);
                            setEditTitle(task.title);
                            setEditDescription(task.description);
                        }}
                    >
                        Edit
                    </button>

                    {editId === task._id && (
                        <div className="edit-box">
                            <input
                                value={editTitle}
                                onChange={(e) =>
                                    setEditTitle(e.target.value)
                                }
                            />

                            <textarea
                                value={editDescription}
                                onChange={(e) =>
                                    setEditDescription(e.target.value)
                                }
                            ></textarea>

                            <button
                                className="btn edit-btn"
                                onClick={handleUpdateTask}
                            >
                                Update
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <div className="form-section">
                <h2>Add Task</h2>

                <input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <textarea
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <button
                    className="btn add-btn"
                    onClick={handleAddTask}
                >
                    Add Task
                </button>

                <button
                    className="btn logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}



export default Dashboard;