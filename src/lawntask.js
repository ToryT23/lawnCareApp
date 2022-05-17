import React, {useState} from "react";
import { NavBar } from "./compenents/nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";

export const LawnTask = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("lawn_customer") !== null
  );

  const setAuthUser = (user) => {
    sessionStorage.setItem("lawn_customer", JSON.stringify(user));
    setIsAuthenticated(sessionStorage.getItem("lawn_customer") !== null);
  };

  const clearUser = () => {
    sessionStorage.clear();
    setIsAuthenticated(sessionStorage.getItem("lawn_customer") !== null);
  };

  return (
    <>
      <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated} />
      <ApplicationViews
        setAuthUser={setAuthUser}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </>
  );
};

// http://localhost:8088/users?isAdmin=false&isEmployee=false&companyId=2&_embed=lawntasks&_expand=company
