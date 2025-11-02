import { queryOptions } from "@tanstack/react-query";
import { getTask } from "../../apis/tasks-api";
import { useParams } from "react-router-dom";

// const getTaskQuery = ()=>{

//     const {id} = useParams();
//     // console.log("id:",id)

//     return queryOptions({
//         queryKey:["task"],
//         queryFn:()=>getTask(id),
//         // staleTime:60000
//     })
// };
// export default getTaskQuery