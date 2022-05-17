import React, { useEffect, useState } from "react";
import { addTask, getAllServices, getServiceTypeInfo } from "../../modules/TaskManager";
import { getAllUsers } from "../../modules/UserManager";
import { useNavigate } from "react-router-dom";
import "./TaskList.css"




export const AddTaskForm = () => {
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({isComplete: false});
  const [serviceTypes, setServiceType] = useState([]);

  const nav = useNavigate()

  let loggedUser = JSON.parse(sessionStorage.getItem("lawn_customer"))

  const companyId = JSON.parse(
    sessionStorage.getItem("lawn_customer")).companyId;

  const saveLawnTask = (event) => {
    event.preventDefault()

    addTask(task)
    .then( () => nav(`/serviceTask`))
  }

  const getUsers = () => {
    getAllUsers()
      // after we get all of the users set state to an array of users
      // when then filter this array by companyId and compare it to the logged in user/sessionStorage item.
      .then((res) =>
        setUsers(res.filter((user) => user.companyId == companyId))
      );
  };
  // filters through all users and returns only the employees
  const employees = users.filter((user) => user.isEmployee === true);
  // filters through all users and returns only the customers
  const customers = users.filter((user) => user.isEmployee === false);

  useEffect(() => {
    getUsers();
    getServiceTypeInfo(loggedUser.companyId).then((res) => setServiceType(res))
  }, []);

  return (
              <div className="purple">
                
    < div className="form">
      <form className="taskForm">
        <h2 className="taskForm__title">Enter A Lawn Task</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="employeeId">Select An Employee:</label>
            <select
              id="employeeId"
              required
              className="form-control"
              onChange={(event) => {
                const copy = { ...task };
                copy.employeeId = parseInt(event.target.value);
                setTask(copy);
              }}
              >
              <option hidden> Select an employee </option>
              {employees.map((employee) => (
                <option value={employee.id} key={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="userId">Customer:</label>
            <select
              id="userId"
              required
              className="form-control"
              onChange={(event) => {
                const copy = { ...task };
                copy.userId = parseInt(event.target.value);
                setTask(copy);
              }}
            >
              <option hidden> Select an Customer </option>
              {customers.map((customer) => (
                <option value={customer.id} key={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="serviceTypeId">Select A Service:</label>
            <select
              id="serviceTypeId"
              required
              className="form-control"
              onChange={(event) => {
                const copy = { ...task };
                copy.serviceTypeId = parseInt(event.target.value);
                setTask(copy);
              }}
              >
              <option hidden> Choose one. </option>
              {serviceTypes.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.type}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="date">Completion Date:</label>
            <input
              id="date"
              type="date"
              onChange={(event) => {
                const copy = { ...task };
                copy.date = event.target.value;
                setTask(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              required autoFocus 
              className="form-control" 
              onChange={(event) => {
                const copy = { ...task };
                copy.notes = event.target.value;
                setTask(copy);
              }}
            />
          </div>
        </fieldset>
        <button onClick={saveLawnTask}>Submit Task</button>
        <button onClick={() => nav("/serviceTask")}>Cancel</button>
      </form>
    </div>
                </div>
  );
};
