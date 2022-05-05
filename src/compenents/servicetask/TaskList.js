import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteATask,
  getLawnTask,
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
  ).companyId;

  const handleDeleteLawnTask = (id) => {
    deleteATask(id).then(() => {
      getLawnTask().then(setTask);
    });
  };
  useEffect(() => {
    getLawnTask().then((res) => setTask(res));
    getAllCompanies().then((res) => {
      const companyObj = res.find((company) => company.id === loggedUser);
      setCompany(companyObj);
    });
  }, []);

  return (
    <>
      <h2>{company.companyName}</h2>
      <div>
        <button onClick={() => nav("/serviceTask/create")}>
          Create A Lawn Task
        </button>
      </div>

      <div className="taskList">
        {task.map((task) =>
          loggedUser === task.employeeId ? (
            ""
          ) : (
            <TaskCard
              key={task.id}
              lawnTask={task}
              deleteATask={handleDeleteLawnTask}
            />
          )
        )}
      </div>
    </>
  );
};

//
