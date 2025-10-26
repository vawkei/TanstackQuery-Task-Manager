// 📒📒📒=============== THIS IS AUSTIN'S OWN, IT DIDN'T RUN====================== 📒📒📒

// this was the one used in the tutorial, but it didnt work for me.

import type {GetUsersOptions,} from "./types";

import { responseSchema, userSchema, type User} from "./types"

const BASE_URL = "http://localhost:8000/users/users";

export const getUsers = async (options?: GetUsersOptions) => {
  // await new Promise((resolve) => setTimeout(resolve, 500));

    // console.log(">>> getUsers called, url:", "time:", Date.now());

  const { page, limit } = options ? options : {};
  const queryParams = new URLSearchParams();

  if (limit) {
    queryParams.append("limit", limit.toString());
  };
  if (page) {
    queryParams.append("page", page.toString());
  };

  const queryString = queryParams.toString();

  const response = await fetch(
    `${BASE_URL}/users${queryString?`?${queryString}`:""}`
  );
  console.log("response:",response)
  const data = await response.json();
  console.log("data:",data)
  return responseSchema.parse(data)
};

export const createUser = async(user:Omit<User,"_id">)=>{
    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(user),
    }
    const res = await fetch(`${BASE_URL}/users`,options);
    console.log("res:",res)
    const data = await res.json();
    console.log("data:",data)
    return userSchema.parse(data)
};

export const deleteUser = async(id:string)=>{
    const options = {
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        },
    }
    await fetch(`${BASE_URL}/users/${id}`,options)
}


// 📒📒📒=============== THIS IS A CHATGPT SUGGESTION 1====================== 📒📒📒

// api.ts — client-side mock implementation (no backend required)
// import { responseSchema, type User } from "./types";
// import type { GetUsersOptions } from "./types";

// simple in-memory store (persists only while the dev server runs)
// let MOCK_USERS: User[] = [
//   {
//     _id: "u1",
//     name: "Alice",
//     email: "alice@example.com",
//     age: 28,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     _id: "u2",
//     name: "Bob",
//     email: "bob@example.com",
//     age: 32,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
// ];

// const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

// export const getUsers = async (options?: GetUsersOptions) => {
//   // simulate network delay
//   await delay(300);

//   // support optional pagination params if you want later
//   const response = {
//     users: MOCK_USERS,
//     pagination: {
//       totalPages: 1,
//       totalItems: MOCK_USERS.length,
//       hasMore: false,
//       currentPage: 1,
//     },
//   };

//   // validate shape with your zod schema
//   return responseSchema.parse(response);
// };

// export const createUser = async (user: Partial<User>) => {
//   await delay(200);
//   const newUser: User = {
//     _id: Math.random().toString(36).slice(2),
//     name: user.name ?? "Unnamed",
//     email: user.email ?? `${Math.random().toString(36).slice(2)}@mock.com`,
//     age: typeof user.age === "number" ? user.age : 18,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   };
//   MOCK_USERS = [newUser, ...MOCK_USERS];
//   return newUser;
// };

// export const deleteUser = async (id: string) => {
//   await delay(150);
//   MOCK_USERS = MOCK_USERS.filter((u) => u._id !== id);
//   return { success: true };
// };




// 📒📒📒=============== THIS IS A CHATGPT SUGGESTION 2====================== 📒📒📒
// api.ts
// import type { GetUsersOptions } from "./types";
// import { responseSchema, userSchema, type User } from "./types";

// const BASE_URL = "http://localhost:8000"; // root of json-server

// function mapServerUserToClient(user: any): User {
 
//   return {
//     _id: user._id ?? String(user.id ?? Math.random().toString(36).slice(2)),
//     // ?? is the nullish coalescing operator — it means:“If the left side is null or undefined, use the right side.”
//     name: user.name,
//     email: user.email,
//     age: typeof user.age === "number" ? user.age : Number(user.age ?? 0),
//     createdAt: user.createdAt ?? new Date().toISOString(),
//     updatedAt: user.updatedAt ?? new Date().toISOString(),
//   };
// }

// export const getUsers = async (options?: GetUsersOptions) => {
//   const { page, limit } = options ?? {};
//   const queryParams = new URLSearchParams();
//   if (limit) queryParams.append("_limit", String(limit)); // json-server uses _limit
//   if (page && limit) {
//     // convert page+limit to _page for json-server
//     queryParams.append("_page", String(page));
//   }

//   const queryString = queryParams.toString();
//   const url = `${BASE_URL}/users${queryString ? `?${queryString}` : ""}`;
//   console.log("GET ->", url);

//   const res = await fetch(url);
//   console.log("response:", res.status, res.headers.get("content-type") ?? "");

//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`GET /users failed: ${res.status} ${text.slice(0, 200)}`);
//   }

//   const arr = await res.json(); // json-server returns an array for /users
//   console.log("arr:",arr)
//   // normalize server array to the { users, pagination } shape expected by your zod schema
//   const users = Array.isArray(arr) ? arr.map(mapServerUserToClient) : [];
//   const pagination = {
//     totalPages: 1,
//     totalItems: users.length,
//     hasMore: false,
//     currentPage: 1,
//   };

//   const normalized = { users, pagination };
//   console.log("normalized:", normalized);
//   return responseSchema.parse(normalized);
// };

// export const createUser = async (user: Omit<User, "_id">) => {
//   // ensure timestamps exist
//   const payload = {
//     ...user,
//     createdAt: user.createdAt ?? new Date().toISOString(),
//     updatedAt: user.updatedAt ?? new Date().toISOString(),
//   };

//   const options = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   };

//   const res = await fetch(`${BASE_URL}/users`, options);
//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`POST /users failed: ${res.status} ${text.slice(0, 200)}`);
//   }

//   const created = await res.json();
//   // map returned object to your `User` shape (convert id -> _id)
//   const normalized = mapServerUserToClient(created);
//   return userSchema.parse(normalized);
// };

// export const deleteUser = async (id: string) => {
//   // json-server expects the id value that exists on the resource (its `id` or `_id` depending on your db)
//   // If your db uses `_id` as key, start json-server with --id _id. Otherwise map accordingly.
//   const res = await fetch(`${BASE_URL}/users/${id}`, { method: "DELETE" });
//   if (!res.ok) {
//     const text = await res.text();
//     throw new Error(`DELETE /users/${id} failed: ${res.status} ${text.slice(0, 200)}`);
//   }
//   return { success: true };
// };
