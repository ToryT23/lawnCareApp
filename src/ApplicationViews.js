import React from "react";
import {Routes} from "react-router-dom"
import {Route, Navigate} from "react-router-dom"
import { TaskList } from "./compenents/servicetask/TaskList";
import { Login } from "./compenents/auth/Login";
import { Register } from "./compenents/auth/Register";
import { UserList } from "./compenents/users/UserList";
import { UserForm } from "./compenents/users/AddUserForm";
import { EditUserForm } from "./compenents/users/EditUserForm";
import { AddTaskForm } from "./compenents/servicetask/AddTaskForm";
import { EditTaskForm } from "./compenents/servicetask/EditTaskForm";


export const ApplicationViews = ({ isAuthenticated, setIsAuthenticated }) => {
   
    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }
    
    const setAuthUser = (user) => {
        sessionStorage.setItem("lawn_customer", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("lawn_customer") !== null)
    }

    return (
        <>

        <Routes>
        <Route path="/" element={<PrivateRoute />} />
        <Route exact path="/login" element={<Login setAuthUser={setAuthUser} />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/serviceTask" element={<TaskList />} />
        <Route path="/serviceTask/create" element={<AddTaskForm />} />
        <Route path="/lawntask/editTask/:taskId" element={<EditTaskForm />}     />
        <Route path="/users" element={<UserList/>} />
        <Route path="/users/create" element={<UserForm/>} />
        <Route path="/users/editUser/:userId" element={<EditUserForm />} />
        </Routes>
        </>
    )
}