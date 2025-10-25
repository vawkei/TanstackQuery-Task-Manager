const BASE_URL = "http://localhost:8000";

export const getUsers =async ()=>{
  const response = await fetch(`${BASE_URL}/users`);
  console.log("response:",response)
  return response.json();
};

export const getUser =async (id:string)=>{
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
};

export const createUser =async (user:any)=>{
  const response = await fetch(`${BASE_URL}/users`,{
    method:"POST",
    body: JSON.stringify(user),
    headers:{"Content-Type":"application/json"}
  });
  return response.json()
};

export const editUser = async(user:any)=>{
  const response = await fetch(`${BASE_URL}/${user.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(user)
  });
  return response.json()
};

export const deleteUser =async (id:any)=>{
    const response = await fetch(`${BASE_URL}/users/${id}`,{
      method:"DELETE"
    });
    return response.json()
}