import React from "react";
import "./Home.css";

export const HomeCardPageTwo = ({ completeJobs }) => {



  return (
    <>
    < div >
    {/* <label class="switch">
  <input type="checkbox"
  onChange={""}
  />
  <span class="slider round"></span>
  
</label> */}

      <div className="listOfPreviousJobs">
        Customer Name : {completeJobs.user.name} <br />
        Address : {completeJobs.user.address} <br />
        Date : {completeJobs.date}<br />
        Type : {completeJobs.serviceType.type} < br />
        Price: ${completeJobs.serviceType?.price} <br />
      </div>
    </div>
</>
  );
};
