import Task from "./Task";

const Tasks = ({ tasks, setTasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task._id} task={task} setTasks={setTasks} />
      ))}
    </div>
  );
};

export default Tasks;
