import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ToDoApp() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortAsc, setSortAsc] = useState(true);

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCbChange = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { taskName: newTask.trim(), isDone: false }]);
    setNewTask("");
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  const handleUpdate = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[editIndex] = { ...updatedTasks[editIndex], taskName: newTask.trim() };
    setTasks(updatedTasks);
    setNewTask("");
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortToggle = () => {
    setSortAsc(!sortAsc);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isDone;
    if (filter === "inProgress") return !task.isDone;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    return sortAsc
      ? a.taskName.localeCompare(b.taskName)
      : b.taskName.localeCompare(a.taskName);
  });

  return (
    <section className="vh-auto" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>

                <form
                  className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Your Task Here"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    {isEditing ? (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddTask}
                      >
                        Save
                      </button>
                    )}
                  </div>

                  <div className="col-12">
                    <select className="form-select" onChange={handleFilterChange}>
                      <option value="all">All</option>
                      <option value="completed">Completed</option>
                      <option value="inProgress">In Progress</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleSortToggle}
                    >
                      Sort {sortAsc ? "A-Z" : "Z-A"}
                    </button>
                  </div>
                </form>

                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Todo item</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTasks.map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          textDecoration: item.isDone ? "line-through" : "none",
                          opacity: item.isDone ? 0.5 : 1,
                        }}
                      >
                        <th scope="row">{index + 1}</th>
                        <td>{item.taskName}</td>
                        <td>{item.isDone ? "Completed" : "In Progress"}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm me-1"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>
                          <button
                            className="btn btn-warning btn-sm me-1"
                            onClick={() => {
                              setIsEditing(true);
                              setEditIndex(index);
                              setNewTask(item.taskName);
                            }}
                          >
                            Edit
                          </button>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={item.isDone}
                            onChange={() => handleCbChange(index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToDoApp;