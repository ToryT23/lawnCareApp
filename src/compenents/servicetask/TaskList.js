import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteATask,
  getLawnTaskByCompany,
  getTotalPriceOfServices,
  updateTask,
} from "../../modules/TaskManager";
import { getAllCompanies } from "../../modules/UserManager";
import { TaskCard } from "./TaskCard";
import  "./TaskList.css"

export const TaskList = () => {
  const nav = useNavigate();
  const [task, setTask] = useState([]);
  const [company, setCompany] = useState({});

  const loggedUser = JSON.parse(
    sessionStorage.getItem("lawn_customer")
  );


  const handleDeleteLawnTask = (id) => {
    deleteATask(id).then(() => {
      getLawnTaskByCompany(loggedUser.companyId).then(setTask);
    });
  };

  const handleCheckmark = (lawnTask) => {
    
      lawnTask.isComplete = true
      getLawnTaskByCompany(loggedUser.companyId)
    
    updateTask(lawnTask).then( () => getLawnTaskByCompany(loggedUser.companyId).then(setTask) )
  }

  useEffect(() => {
    getLawnTaskByCompany(loggedUser.companyId).then((res) => setTask(res));
    getAllCompanies().then((res) => {
      const companyObj = res.find((company) => company.id === loggedUser.companyId);
      setCompany(companyObj);
    });
  }, []);

  return (
    <>
      <h2>{company.companyName}</h2>
      <div>
        <button  onClick={() => nav("/serviceTask/create")}>
          Create A Lawn Task
        </button>
      </div>

      <div className="taskList">
        {task.map((task) =>
          loggedUser.companyId === task.employeeId ? (
            ""
          ) : (
            <TaskCard
            key={task.id}
            lawnTask={task}
            deleteATask={handleDeleteLawnTask}
            checkBoxMark={handleCheckmark}
          />
          )
        )}
      </div>
    </>
  );
};

//
