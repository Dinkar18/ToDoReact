import { useState } from "react";

function ToDoApp() {
  const [newTask, setNewTask] = useState("");

  const [tasks, setTask] = useState([
    { taskName: "Watching Movie", isDone: false },
    { taskName: "Playing Cricket", isDone: false },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleCbChange(index) {
    const updatedTask = tasks.map((task, idx) =>
      idx === index ? { ...task, isDone: !task.isDone } : task
    );
    setTask(updatedTask);
  }

  function handleAddTask() {
    if (newTask.trim() === "") return;
    setTask([...tasks, { taskName: newTask, isDone: false }]);
    setNewTask("");
  }

  function handleDelete(index) {
    const updTask = tasks.filter((item, idx) => idx !== index);
    setTask(updTask);
  }

  function handleUpdate() {
    if (newTask.trim() === "") return;

    const updatedTask = [...tasks];
    updatedTask[editIndex] = { ...updatedTask[editIndex], taskName: newTask };

    setTask(updatedTask);
    setNewTask("");
    setIsEditing(false);
    setEditIndex(null);
  }

  return (
    <section className="vh-auto" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7 " style={{ minWidth: "900px" }}>
            <div className="card rounded-3">
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>

                <form
                  className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="col-12">
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form1"
                        style={{ minWidth: "800px" }}
                        className="form-control"
                        value={newTask}
                        placeholder="Enter Your Task Here"
                        onChange={(e) => setNewTask(e.target.value)}
                      />
                    </div>
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
                </form>

                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Todo item</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Rendering Task as a row  */}
                    {tasks.map((item, index) => (
                      <tr
                        key={index}
                        style={{
                          textDecoration: item.isDone ? "line-through" : "none",
                          opacity: item.isDone ? 0.3 : 1,
                        }}
                      >
                        <th scope="row">{index + 1}</th>
                        <td>{item.taskName}</td>

                        <td>{item.isDone ? "Completed" : "In Progress"}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </button>

                          <button
                            className="btn btn-warning ms-1"
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
                            onChange={() => handleCbChange(index)}
                            checked={item.isDone}
                            className="form-check-input me-4 status"
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
