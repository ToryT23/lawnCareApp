import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../modules/UserManager";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router-dom";
import "./User.css"

export const UserList = () => {
  const nav = useNavigate();

  const [appUsers, updateUsers] = useState([]);

const loggedUser = JSON.parse(sessionStorage.getItem("lawn_customer")).companyId

  const handleDeleteUser = (id) => {
    deleteUser(id)
    .then(() => {
        getAllUsers()
        .then(updateUsers)
    })
  }

  useEffect(() => {
    getAllUsers().then((res) => updateUsers(res));
  }, []);

  return (
    <>
      <button
        onClick={() => {
          nav("/users/create");
        }}
      >
        Add User
      </button>

      <div className="userList">
        {appUsers.map((user ) => (
         loggedUser === user.companyId  ? <UserCard 
          key={user.id} 
          user={user} 
          deleteAUser={handleDeleteUser}
          
          />
          :""
        ))}
      </div>
    </>
  );
};

