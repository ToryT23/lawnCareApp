import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, getAllCompanies } from "../../modules/UserManager";

export const UserForm = () => {
  const loggedUser = JSON.parse(sessionStorage.getItem("lawn_customer")).companyId

  const nav = useNavigate();
  const [users, setUsers] = useState ({ companyId:loggedUser, isEmployee: false, isAdmin: false });
  const [companies, setCompany] = useState([]);

  useEffect(() => {
    getAllCompanies()
    .then((res) => setCompany(res));
  }, []);


    const saveNewUser = (event) => {          
        event.preventDefault()
        
        addUser(users)
        .then(() => nav(`/users`))
    }

    

  return (
    <form className="userForm">
      <h2 className="userForm__title">Add an User</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name of User:</label>
          <input
          id="name"
          autoCapitalize= "on"
            required
            autoComplete="off"
            autoFocus
            type="input"
            className="form-control"
            placeholder="Please enter a Name."
            onChange={(event) => {
              const copy = { ...users };
              copy.name = event.target.value;
              setUsers(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
          id="phoneNumber"
            autoFocus
            autoComplete="off"
            type="tel"
            maxLength={10}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            className="form-control"
            placeholder="Phone number."
            onChange={(event) => {
              const copy = { ...users };
              copy.phoneNumber = parseInt(event.target.value);
              setUsers(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="email">Enter Email:</label>
          <input
          id="email"
            required
            autoComplete="off"
            autoFocus
            type="text"
            className="form-control"
            placeholder="Please enter Email."
            onChange={(event) => {
              const copy = { ...users };
              copy.email = event.target.value;
              setUsers(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="address">Enter Address: </label>
          <input
          id="address"
            required
            autoComplete="off"
            autoFocus
            type="text"
            className="form-control"
            placeholder="Please enter Address."
            onChange={(event) => {
              const copy = { ...users };
              copy.address = event.target.value;
              setUsers(copy);
            }}
          />
        </div>
      </fieldset>

      <button type="button" onClick={saveNewUser}>Add User</button>
      <button type="button" onClick={() => nav("/users")}>Cancel</button>
    </form>
  );
};
