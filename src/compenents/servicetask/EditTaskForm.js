import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllServices,
  getLawnTaskById,
  updateTask,
} from "../../modules/TaskManager";
import { getAllUsers } from "../../modules/UserManager";

export const EditTaskForm = () => {
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState({
    employeeId: 0,
    userId: 0,
    serviceTypeId: 0,
    date: "",
    notes: "",
  });

  const [serviceTypes, setServiceTypes] = useState([]);
  const { taskId } = useParams();
  const [isLoading, setisLoading] = useState(false);

  const handleFieldChange = (evt) => {
    const stateToChange = { ... task };
    stateToChange[evt.target.id] = evt.target.value;
    setTask((stateToChange));
  };
  const handleFieldChangeForNum = (evt) => {
    const stateToChange = { ... task };
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    setTask((stateToChange));
  };

 

  const updatingExistUser = (evt) => {
    evt.preventDefault();
    setisLoading(true);


    updateTask(task).then(() => {
      nav("/serviceTask");
    });
  };

  const companyId = JSON.parse(
    sessionStorage.getItem("lawn_customer")
  ).companyId;
  console.log(companyId);

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
    getLawnTaskById(taskId).then((res) => setTask(res)).
    then(() => getUsers())
    .then(() =>getAllServices()
    .then((res) => setServiceTypes(res) ))

    setisLoading(false);
  }, []);

  return (
    <>
      <form className="taskForm">
        <h2 className="taskForm__title">Edit this task</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="employeeId">Select An Employee:</label>
            <select
              id="employeeId"
              required
              className="form-control"
              value={task.employeeId}
              onChange={handleFieldChangeForNum}
            >
              <option hidden> Select an employee </option>
              {employees.map((employee) => (
                <option defaultValue={employee.id === task.employeeId} value={employee.id} key={employee.id}>
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
              value={task.userId}
              onChange={handleFieldChangeForNum}
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
              value={task.serviceTypeId}
              onChange={handleFieldChangeForNum}
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
              value={task.date}
              onChange={handleFieldChange}  />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              required
              autoFocus
              className="form-control"
              onChange={handleFieldChange}
              value={task.notes}
            />
          </div>
        </fieldset>
        <button disabled={isLoading} type="button" onClick={updatingExistUser}>
          Update
        </button>
      </form>
    </>
  );
};
