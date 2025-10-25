
import { queryOptions } from "@tanstack/react-query";
import { getUsers } from "../apis/users-api";
// import type { GetUsersOptions } from "../types";

export default function getUsersQueryOptions(){
  return queryOptions({
    queryKey:["users"],
    queryFn:()=>getUsers()
  })
}