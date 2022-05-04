import React, {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { deleteATask, getAllTasks, getLawnTask } from "../../modules/TaskManager";
import { UserList } from "../users/UserList";
import { TaskCard } from "./TaskCard";

export const TaskList = () => {

    const nav = useNavigate()
 const [task, setTask] = useState([])

    //  const [users, setUsers] = useState({})

    const handleDeleteLawnTask = (id) => {
        deleteATask(id)
        .then( () => {
            getLawnTask()
            .then(setTask)
        })
    }


    useEffect(() => {
        getLawnTask().
        then((res) => setTask(res));

      }, []);
    

    return (
        <>
        <div>
            <button onClick={() => nav("/serviceTask/create")}>Create A Lawn Task</button>
        </div>

        <div>
        {task.map( (task) => (
             <TaskCard 
            key= {task.id}
            lawnTask={task}
            deleteATask={handleDeleteLawnTask}
            />
    ))}
        </div>
        </>
    )
}


// 