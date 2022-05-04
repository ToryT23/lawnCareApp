import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllCompanies,
  getUsersById,
  updateUser,
} from "../../modules/UserManager";

export const EditUserForm = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({name:"", address:"", email:"", companyId:"", phoneNumber:"", isAdmin: false, isEmployee: false});
  const [isLoading, setisLoading] = useState(false);
  const { userId } = useParams();
  const [companies, setCompanies] = useState([]);

  //   getAllCompanies().then((res) => setCompanies(res));

  const handleFieldChange = (evt) => {
    const stateToChange = { ...user };
    stateToChange[evt.target.id] = (evt.target.value);
    setUser(stateToChange);
  };

  const handleFieldChangeForNum = (evt) => {
    const stateToChange = { ... user };
    stateToChange[evt.target.id] = parseInt(evt.target.value);
    setUser((stateToChange));
  };

  const updatingExistUser = (evt) => {
    evt.preventDefault();
    setisLoading(true);

    updateUser(user).then(() => {
      nav("/users");
    });
  };
  useEffect(() => {
    getUsersById(userId).then((res) => {
      setUser(res);
      setisLoading(false);
      getAllCompanies().then((res) => setCompanies(res));
    });
  }, []);

  return (
    <>
      <form className="userForm">
        <h2 className="userForm__title">Add an User</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">Name of User:</label>
            <input
              id="name"
              autoCapitalize="yes"
              autoComplete="off"
              required
              autoFocus
              type="input"
              className="form-control"
              placeholder="Please enter a Name."
              value={user.name}
              onChange={handleFieldChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="companyId">Name of Company:</label>
            <select
              id="companyId"
              autoComplete="off"
              value={user.companyId}
              onChange={(evt) => handleFieldChangeForNum(evt)}
              >
              <option hidden> Select Your Company </option>
              {companies.map((company) => (
                  <option value={company.id} key={company.id}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
              id="phoneNumber"
              autoFocus
              type="tel"
              maxLength={10}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
              className="form-control"
              placeholder="Phone number."
              value={user.phoneNumber}
              onChange={handleFieldChangeForNum}
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
              value={user.email}
              onChange={handleFieldChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="address">Enter Address: </label>
            <input
              id="address"
              autoComplete="off"
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="Please enter Address."
              value={user.address}
              onChange={(evt) => handleFieldChange(evt)}
            />
          </div>
        </fieldset>

        <button disabled={isLoading} type="button" onClick={updatingExistUser}>
          Update
        </button>
        <button onClick={() => {
            nav("/users")
        }}>Cancel</button>
      </form>
    </>
  );
};
