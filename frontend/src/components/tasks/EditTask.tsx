import classes from "./TaskForm.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { TypedUseSelectorHook } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import getTaskQueryOption from "../../features/task/getTaskQueryOption";
import Button from "../ui/button/Button";
import DatePicker from "react-datepicker";
import Card from "../ui/card/Card";
import type { TaskProps } from "../../interface/interface";
import useUpdateTask from "../../features/task/updateTask";

const EditTask = () => {
  const { id }  = useParams();
  console.log("id:", id);

  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredDescription, setEnteredDescription] = useState<string>("");
  const [enteredStatus, setEnteredTaskStatus] = useState<boolean>(false);
  const [enteredDate, setEnteredDate] = useState<Date | null>(null);

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  const { data, isSuccess } = useQuery(getTaskQueryOption(id));
  console.log("data:", data);
  const {mutateAsync: updateTaskMutation } = useUpdateTask()

  const editTaskHandler =async (e:React.FormEvent)=>{
    e.preventDefault();

    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredDate === null
    ) {
      return console.log("please fill in your task...");
    };

    const taskData:TaskProps = {
      title:enteredTitle,
      description:enteredDescription,
      status:enteredStatus,
      dateDue:enteredDate.toLocaleString()
    };

    if (!id) {
      console.error("Task ID is undefined");
      return;
      // here we are ensuring that id is always defined before passing it to updateTask.
    }

    
     await  updateTaskMutation ({ id, task:taskData });
  }

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      setEnteredTitle(data?.title);
      setEnteredDescription(data?.description || "");
      setEnteredTaskStatus(data?.status);
      setEnteredDate(data?.dueDate ? new Date(data.dueDate):null)

    }
  }, [isSuccess,isLoggedIn]);

  return (
    <div className={classes["task-form-container"]}>
      <h2>Edit Task</h2>
      <form onSubmit={editTaskHandler}>
        <Card className={classes.cardClass}>
          <div className={classes.control}>
            <label htmlFor="">title:</label>
            <input
              type="text"
              placeholder="enter Title"
              value={enteredTitle}
              onChange={(event) => setEnteredTitle(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="">description:</label>
            <textarea
              placeholder="enter Description"
              value={enteredDescription}
              onChange={(event) => setEnteredDescription(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <div className={classes.checkbox}>
              <label htmlFor="">status</label>
              <input
                type="checkbox"
                checked={enteredStatus}
                onChange={(event) => setEnteredTaskStatus(event.target.checked)}
              />
            </div>
          </div>
          <div className={classes.control}>
            <label htmlFor="">date:</label>
            <DatePicker
              selected={enteredDate}
              placeholderText="pick your date here"
              // value={enteredDate}
              onChange={(date: Date | null) => setEnteredDate(date)}
            />
          </div>

          <div className={classes.action}>
            <Button type="submit">Submit</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditTask;
