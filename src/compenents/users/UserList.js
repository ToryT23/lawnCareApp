import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../modules/UserManager";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router-dom";

export const UserList = () => {
  const nav = useNavigate();

  const [appUsers, updateUsers] = useState([]);

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

      <div>
        {appUsers.map((user) => (
        <UserCard 
          key={user.id} 
          user={user} 
          deleteAUser={handleDeleteUser}
          
          />
        ))}
      </div>
    </>
  );
};
// !user.isEmployee ? "" :  !user.isAdmin ? "" 