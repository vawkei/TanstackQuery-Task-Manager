const BASE_URL = "http://localhost:5000/auth";

export const register = async (userData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = response.json();
    console.log("data:", data);
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("register message:", message);
  }
};

export const login = async (userData: any) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    });
    const data = response.json();
    console.log("data:", data);
    return data;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("register message:", message);
  }
};
