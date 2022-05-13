const remoteURL = "http://localhost:8088"


export const getAllUsers = () => {
  return fetch(`${remoteURL}/users?_expand=company`)
  .then(res => res.json())
} 

export const getCurrentUser = () => {
    let user = {}
   return user = JSON.parse(sessionStorage.getItem("lawn_customer"))
}

export const getUserByCompany = () => {
   const loggedUser = getCurrentUser()
    return fetch(`${remoteURL}/users?_expand=company`)
    .then(res => res.json())
    .then( res => res.filter( res1 => res1.companyId === loggedUser.companyId))

}

export const getAllCompanies = () => {
    return fetch(`${remoteURL}/companies`)
    .then(res => res.json())
}

export const addUser = (newUser) => {
    return fetch(`${remoteURL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }).then(response => response.json())
}

export const deleteUser = (id) => {
    return fetch(`${remoteURL}/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
      }).then(result => result.json())
}

export const updateUser  = editedUser => {
	return fetch(`${remoteURL}/users/${editedUser.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedUser)
	}).then(data => data.json());
}

export const getUsersById = (id) => {
    return fetch(`${remoteURL}/users/${id}`)
    .then( (data) => data.json() )
}
