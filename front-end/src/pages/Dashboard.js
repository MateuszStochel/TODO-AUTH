
import { useEffect, useState } from 'react';
import axios from 'axios';

import AddForm from '../components/AddForm';
import Tasks from '../components/Tasks';

function Dashboard() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { tasks } } = await axios.get(`/api/v1/tasks`)
        setTasks(tasks)
      } catch (error) {
        //handle logic with error
        console.log(error)
      }
    }

    fetchData()
  }, []);

  return (
    <div>
      <AddForm setTasks={setTasks} />
      <Tasks setTasks={setTasks} tasks={tasks} />
    </div>
  );
}


export default Dashboard;
