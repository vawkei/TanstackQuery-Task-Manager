const BASE_URL = "http://localhost:5000/api/v1/tasks";

export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/get-tasks`);

  const data =await response.json();
  console.log("data:", data);
  return data;
};

export const getTask = async (id: any) => {
  const response = await fetch(`${BASE_URL}/get-task/` + id, {
    credentials: "include",
  });

  const data =await response.json();
  console.log("data:", data);
  return data;
};

export const createTask = async (task: any) => {
  const response = await fetch(`${BASE_URL}/create-task`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data =await response.json();
  console.log("data:", data);
  return data;
};

export const updateTask = async (id: string, task: any) => {
  const response = await fetch(`${BASE_URL}/update-task/` + id, {
    method: "PATCH",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data =await response.json();
  console.log("data:", data);
  return data;
};

export const deleteTask = async (id: any) => {
  const response = await fetch(`${BASE_URL}/delete-task/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return response.json();
};
