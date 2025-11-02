import { queryOptions  } from "@tanstack/react-query";
import { getTasks } from "../../apis/tasks-api";

const getTasksQueryOption = ()=>{

    return queryOptions({
        queryKey:["tasks"],
        queryFn:()=>getTasks(),
        staleTime:60000
        //  queryClient.invalidateQueries({ queryKey: ["users"] });
    })
};

export default getTasksQueryOption;
