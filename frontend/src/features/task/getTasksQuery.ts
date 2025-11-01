import {  useQuery } from "@tanstack/react-query";
import { getTasks } from "../../apis/tasks-api";

const useGetTasksQuery = ()=>{

    return useQuery({
        queryKey:["tasks"],
        queryFn:()=>getTasks(),
        // staleTime:60000
        //  queryClient.invalidateQueries({ queryKey: ["users"] });
    })
};

export default useGetTasksQuery;
