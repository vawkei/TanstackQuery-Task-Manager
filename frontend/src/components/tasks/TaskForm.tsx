import classes from "./TaskForm.module.scss";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "../ui/button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Card from "../ui/card/Card";
// import type { TaskProps } from "../../interface/interface";
import { useCreateTask } from "../../features/task/useCreateTask";
import type { TaskProps } from "../../interface/interface";


const TaskForm = () => {
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredDescription, setEnteredDescription] = useState<string>("");
  const [enteredStatus, setEnteredTaskStatus] = useState<boolean>(false);
  const [enteredDate, setEnteredDate] = useState<Date | null >(null);

  const {mutateAsync:createTask} = useCreateTask();

  // const navigate = useNavigate();

  const submitTaskHandler =async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      enteredTitle.trim().length === 0 ||
      enteredDescription.trim().length === 0 ||
      enteredDate === null
    ) {
      return console.log("please fill in your task...");
    }

    const taskData: TaskProps = {
      title: enteredTitle,
      description: enteredDescription,
      status: enteredStatus,
      dateDue:enteredDate.toLocaleDateString()


      // dateDue:enteredDate.toLocaleString():dateDue: '10/30/2025, 12:00:00 AM'}
      // dateDue: enteredDate.toLocaleDateString(),:dateDue: '10/30/2025'}
      // dateDue:enteredDate:dateDue: Thu Oct 30 2025 00:00:00 GMT+0100 (West Africa Standard Time)}
      // dateDue:enteredDate.toISOString()dateDue: '2025-10-29T23:00:00.000Z'}
   
    };
    console.log("taskdata:", taskData);
    await createTask(taskData)
    //  navigate("/task-list");
  };

  return (
    <div className={classes["task-form-container"]}>
      <h2>Task Form</h2>
      <form onSubmit={submitTaskHandler}>
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
              //onChange={(date) =>setEnteredDate(date)}
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

export default TaskForm;
