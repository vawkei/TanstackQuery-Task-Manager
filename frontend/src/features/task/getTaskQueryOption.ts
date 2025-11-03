import { queryOptions } from "@tanstack/react-query";
import { getTask } from "../../apis/tasks-api";


const getTaskQueryOption = (id:string|undefined)=>{

    return queryOptions({
        queryKey:["tasks",id],
        queryFn:()=>getTask(id),
        // staleTime:60000
    })
};
export default getTaskQueryOption