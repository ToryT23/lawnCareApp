import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getEmployeesById,
  returnAllServiceTypes,
} from "../../modules/TaskManager";

export const TaskCard = ({ lawnTask, deleteATask }) => {
  const [employee, setEmployee] = useState({});

  const getServiceInfo = (serviceId) => {
    const theService = returnAllServiceTypes().find(
      (service) => service.id === serviceId
    );
    return (
      <div>
        {" "}
        <p key={theService.id}>
          Type: {theService.type} <br />
          Price: ${theService.price}
        </p>
      </div>
    );
  };

  useEffect(() => getEmployeeNameFromCompany(), []);

  const getEmployeeNameFromCompany = () => {
    getEmployeesById(lawnTask.employeeId).then((res) => setEmployee(res));
  };

  return (
    < div className="card">
      <div >
        Customer: {lawnTask.user.name} <br />
        Address: {lawnTask.user.address} <br />
        Date: {lawnTask.date} <br />
        Employee: {employee.name} <br />
        Service: {lawnTask.serviceType.type} <br />
        Price: ${lawnTask.serviceType.price} <br />
        Notes: {lawnTask.notes} <br />
      <button type="button" onClick={() => deleteATask(lawnTask.id)}>Delete</button>
      <Link to={`/lawntask/editTask/${lawnTask.id}`}>
    <button type="button" >Edit</button>
  </Link>
      </div>
    </div>
  );
};

{
  /* <div>Name {lawnTasks.user.name}</div>
            <div>Customer {lawnTasks.customerId.name}</div>
            <div>Date {lawnTasks.date}</div>
            <div>Company {lawnTasks.companies.companyName} </div>
            <div>Total ${lawnTasks.serviceType.price}</div> */
}

{
  /* <div>{user.lawntasks.map((task) => <>
             <p key={task.id}>{task.date} <br /> {task.notes}
             </p>
             
             {getServiceInfo(task.serviceTypeId)}
             </> )}   </div>
             */
}
