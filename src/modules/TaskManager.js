const remoteURL = "http://localhost:8088";

// const loggedUser = JSON.parse(sessionStorage.getItem("lawn_customer")).companyId


export const getAllTasks = () => {
  return fetch(`${remoteURL}/users?_embed=lawntasks&_expand=company`)
  .then((res) => res.json());
  
};

export const getEmployeesById = (id) => {
    return fetch(`http://localhost:8088/users/${id}`)
    .then( res => res.json())
}

export const getLawnTask = () => {
    return fetch(`http://localhost:8088/lawntasks?_expand=user&_expand=serviceType`)
    .then(res => res.json())
}

let getPrice = [{ type:"mom" , price: 100,}, {type:"dad" , price: 200}]
const result = getPrice.reduce((total, currentValue) => total = total + currentValue.price,0);
//console.log(result)

// expand then sort
export const getLawnTaskByCompany = (companyId) => {
  return  fetch(`http://localhost:8088/lawntasks?_expand=user&_expand=serviceType&_sort=date`)
  .then( (res) => res.json() )
  .then( (res) => res.filter( (res1) => res1.user?.companyId === companyId))
}

export const getTotalPriceOfServices = (companyId) => {
 getLawnTaskByCompany(companyId)
 .then( (res) => console.log(res.reduce((total, currentValue) => total + parseInt(currentValue.serviceType.price),0)));
//  console.log(totalPrice)
}
getTotalPriceOfServices(2)

let allServiceTypes = [];

export const getAllServices = () => {
  return fetch(`${remoteURL}/serviceTypes`).then((res) => res.json());
};
export const returnAllServiceTypes = () => {
  return allServiceTypes;
};
getAllServices().then((res) => (allServiceTypes = res));

// lawnTask for employees only
// http://localhost:8088/users?_embed=lawntasks&_expand=company_?&isAdmin=false&isEmployee=true

//lawnTask for customer that are not employees
// http://localhost:8088/users?_embed=lawntasks&_expand=company_?&isAdmin=false&isEmployee=false

export const addTask = (newTask) => {
  return fetch(`${remoteURL}/lawntasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  }).then((response) => response.json());
};

export const deleteATask = (id) => {
  return fetch(`${remoteURL}/lawntasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => result.json());
};

export const updateTask  = editTask => {
	return fetch(`${remoteURL}/lawntasks/${editTask.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editTask)
	}).then(data => data.json());
}

export const getLawnTaskById = (id) => {
  return fetch(`${remoteURL}/lawntasks/${id}`)
  .then(data => data.json())
}