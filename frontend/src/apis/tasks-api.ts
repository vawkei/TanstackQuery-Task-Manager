const BASE_URL = "http://localhost:5000";

export const getTasks = async () => {
  const response = await fetch(BASE_URL);

  const data = response.json();
  console.log("data:", data);
  return data;
};

export const getTask = async (id: any) => {
  const response = await fetch(BASE_URL + id);

  const data = response.json();
  console.log("data:", data);
  return data;
};

export const createTask = async (task: any) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: { "Content-Type": "application/json" },
  });

  const data = response.json();
  console.log("data:", data);
  return data;
};

export const editTask = async (task: any) => {
  const response = await fetch(`${BASE_URL}/edit-task`, {
    method: "PATCH",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = response.json();
  console.log("data:",data);
  return data;
};

export const deleteTask = async(id:any)=>{
    const response = await fetch(`${BASE_URL}/delete-task/${id}`,{
        method:"DELETE"
    });
    return response.json();
};
