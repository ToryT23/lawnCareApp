import React, { useEffect, useState } from "react";
import { deleteUser, getAllUsers, getUserByCompany } from "../../modules/UserManager";
import { UserCard } from "./UserCard";
import { useNavigate } from "react-router-dom";
import "./User.css"

export const UserList = () => {
  const nav = useNavigate();

  const [appUsers, updateUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('')
  const [filteredResults, setFilteredResults] = useState([])

const loggedUser = JSON.parse(sessionStorage.getItem("lawn_customer")).companyId

 const searchBar = (searchValue) => {

   console.log(searchValue)
  setSearchInput(searchValue)
  if(searchInput !== '') {

    const filteredUsers = appUsers.filter( (user) => {
      return Object.values(user).join('').toLowerCase().includes(searchInput.toLowerCase())
    })
    setFilteredResults(filteredUsers)
  } else {
    setFilteredResults(appUsers)
  }
 }
  



  const handleDeleteUser = (id) => {
    deleteUser(id)
    .then(() => {
        getAllUsers()
        .then((res) => updateUsers(res.filter( user => user.companyId === loggedUser)))
    })
  }

  useEffect(() => {
    getUserByCompany().then((res) => updateUsers(res))
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
       <input type="search"
      id="searchBar"
      autoComplete="off"
      className="searchIt"
      placeholder="Enter A Name"
       onChange={(e) => searchBar(e.target.value)}
       
     />
     <div className="userList">
       

                {searchInput.length > 1 ? (
                  filteredResults.map((user) => {
                        return (
                          <UserCard key={user.id} 
                          user={user}
                          deleteAUser={handleDeleteUser}
                           />
                        )
                    })
                    ) : (
                    appUsers.map((user) => {
                        return (
                          <UserCard 
                          key={user.id} 
                          user={user} 
                          deleteAUser={handleDeleteUser}
                          
                          />
                        )
                      })
                      )}
   </div>
  

      {/* <div className="userList">
        {appUsers.map((user ) => (
         loggedUser === user.companyId  ? <UserCard 
          key={user.id} 
          user={user} 
          deleteAUser={handleDeleteUser}
          
          />
          :""
        ))}
      </div> */}
    </>
  );
};

