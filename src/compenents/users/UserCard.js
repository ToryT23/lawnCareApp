import React from "react";
import {Link} from "react-router-dom"

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ')-' + match[2] + '-' + match[3];
    }
    return null;
  }

export const UserCard = ({ user, deleteAUser,  }) => {
  return (
    <div  className="userList">
      <div className="card">
        Name: {user.name} <br />
        Address: {user.address} <br />
        Service Company: {user.company.companyName} <br />
        Phone Number: {formatPhoneNumber(user.phoneNumber)} <br />
        Email: {user.email} <br />
        {/* {user.isAdmin} <br />
        {user.isEmployee} <br /> */}
        <br />
      <button type="button" onClick={() => {
        deleteAUser(user.id)
      }}>
          DELETE
      </button>
      <Link to={`/users/editUser/${user.id}`}>
    <button type="button" >EDIT</button>
  </Link>
        </div>
    </div>
  );
};
