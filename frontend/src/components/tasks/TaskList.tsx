import classes from "./TaskList.module.scss";
import { useQuery } from "@tanstack/react-query";
import getTasksQueryOption from "../../features/task/getTasksQueryOption";
import Card from "../ui/card/Card";
// import { useState } from "react";
import type { TaskProps } from "../../interface/interface";
import { AiFillEdit } from "react-icons/ai";
import {
  RiDeleteBin2Line,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDeleteTask } from "../../features/task/useDeleteTask";

const TaskList = () => {
  const { data, isLoading, isError, error } = useQuery(getTasksQueryOption());
  console.log("data:", data);
  
  const {mutateAsync:deleteTaskMutation} = useDeleteTask()
  const navigate = useNavigate();

  // const [search, setSearch] = useState("");

  
  const navigateToEditPageHandler = (id: string) => {
    navigate(`/task-list/${id}`);
  };
  const deleteButtonHandler =async (id:string)=>{
      await deleteTaskMutation(id)
  }
  

  if (isLoading) {
    return (
      <div  className={classes.returns}>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div  className={classes.returns}>
        <p>{error.message}</p>
      </div>
    );
  }

  if(data?.nbhts===0){
    return(
      <div className={classes.returns}>
        <p>{data?.msg}</p>
      </div>
    )
  }



  return (
    <Card className={classes.cardClass}>
      <h2>TaskList</h2>
      <div className={classes.search}>
        <input type="text" />
      </div>

      <ul>
        {data?.tasks.map((task: TaskProps) => {
          return (
            <li key={task._id}>
              <Card className={classes.cardClass2}>
                <h3>{task?.title}</h3>
                <div className={classes["desc-content"]}>
                  <p className={classes.desc}>{task.description}</p>
                  <div className={classes["status-date"]}>
                    <p className={task.status === true ? "true" : ""}>
                      <input type="checkbox" checked={task.status} disabled />
                    </p>
                    <p>{task.dateDue}</p>
                  </div>
                </div>

                <div className={classes.actions}>
                  <div className={classes.edit}>
                    <AiFillEdit
                      color="green"
                      onClick={() => navigateToEditPageHandler(task._id || "")}
                    />
                  </div>
                  <div className={classes.delete}>
                    <RiDeleteBin2Line color="red" onClick={()=>deleteButtonHandler(task._id||"")} />
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default TaskList;
