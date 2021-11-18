// in order to load the data present in db.js we will have to use hook
// called useEffect which deals with the side effect. 
import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


// this looks like HTML but it is a JSX: Javascript Syntax Extension
function App() {
  const [showAddTask, setShowAddTask] = useState(true)
  const [tasks, setTask] = useState([ ])

useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }
    getTasks()
  }, [])

// Fetch Tasks
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  console.log(data);
  return data
}

// Fetch task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  console.log(data);
  return data
}

// Add task
const addTask = async (task) =>  {
  const res = await fetch('http://localhost:5000/tasks', 
  {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTask([...tasks, data])
}

// Delete task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE'
  })
 setTask(tasks.filter((task)=> task.id !== id))
}

// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method:"PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(updatedTask)
  })

  const data =await res.json()

  setTask(tasks.map((task) => task.id === id ? {...task, reminder: data.reminder} : task))
}
  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ?  (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ('No Tasks To Show')}
    </div>
    
  );
}



export default App;
