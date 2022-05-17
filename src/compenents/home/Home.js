import React, { useEffect, useState } from "react";
import { getAllCompletedJobs, getServiceTypeInfo } from "../../modules/TaskManager";
import { HomePageCard } from "./HomeCard";
import { getAllCompanies } from "../../modules/UserManager";
import { HomeCardPageTwo } from "./HomeCardTwo";
import background from "../../images/mowedlawn.png";



export const HomePage = () => {

  const loggedUser = JSON.parse(sessionStorage.getItem("lawn_customer"))
  const [servicePrice , setService] = useState([])
  const [company , setCompany] = useState({})
  const [completeJobs, setCompleteJobs] = useState([])


  useEffect( () => {
    getServiceTypeInfo(loggedUser.companyId).then( res => setService(res))
    .then( () => getAllCompletedJobs(loggedUser.companyId).then( res => setCompleteJobs(res)))

    getAllCompanies().then((res) => {
        const companyObj = res.find((company) => company.id === loggedUser.companyId);
        setCompany(companyObj);
      })
   }, [])


    return (
        <>
        <div style={{ backgroundImage: `url(${background})` }}>
        <h2> Welcome, {loggedUser.name} !</h2>
        
      
        {/* <img  src={backgroundImage} alt="background" /> */}


         <div className="info">
            <div>

        <h2>
         {company.companyName} Prices:
         </h2>
        {servicePrice?.map((type) =>
          loggedUser.companyId === type.companyId ? (
              <HomePageCard
              key={type.id}
              servicePrice={type}
              />
              ) : (
                  ""
                  )
                  )}
        </div>

 <div >
     <h2>Last 5 Completed Cards By Date</h2>
    {completeJobs.slice(0).slice(-5).map((job) =>
     loggedUser.companyId === job.companyId ?  ( 
          "No Jobs Complete" 
         ):  (
             <HomeCardPageTwo
             key={job.id}
             completeJobs={job} 
             />
             )
             )}

 </div>
 </div>
             </div>
 

 </>
 )  }

 {/* 
          <div className="taskList">
         {task.map((task) =>
           loggedUser.companyId === task.employeeId ? (
             ""
           ) : (
             <TaskCard
             key={task.id}
             lawnTask={task}
             deleteATask={handleDeleteLawnTask}
           />
           )
         )}
       </div> */}
 
