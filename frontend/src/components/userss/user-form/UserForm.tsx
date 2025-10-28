import React, { useState } from "react";
import classes from "./UserForm.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateUser } from "../../../queryOptions/CreateUserQueryOptions";
import { useQueryClient } from "@tanstack/react-query";

import { createUser } from "../../../apis/users-api";

const UserForm = () => {
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredAge, setEnteredAge] = useState<number>(0);
  const [enteredDate, setEnteredDate] = useState<Date | null>(null);

  const { mutateAsync, error } = useCreateUser();

  //   const nameInputRef = useRef();
  //   const emailInputRef = useRef();

  if (error) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

  // const queryClient = useQueryClient();

  const handleCreate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!enteredName || !enteredEmail || !enteredAge || !enteredDate) {
      return console.log("inputs cant be empty");
    }

    const user = {
      name: enteredName,
      age: enteredAge,
      email: enteredEmail,
      createdAt: enteredDate.toISOString(),
    };

    try {
      await mutateAsync(user);
      
      // await createUser(user);
      // console.log("created user:",user)
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      
      // queryClient.invalidateQueries({
      //   queryKey: getUsersQueryOptions().queryKey,
      // });
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className={classes.container}>
      <form action="" onSubmit={handleCreate} className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="">name</label>
          <input
            type="text"
            value={enteredName}
            onChange={(event) => setEnteredName(event.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="">email</label>
          <input
            type="email"
            value={enteredEmail}
            onChange={(event) => setEnteredEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">date</label>
          <DatePicker
            placeholderText="place date here"
            selected={enteredDate}
            onChange={(date: Date | null) => setEnteredDate(date)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="">age:</label>
          <input
            type="number"
            value={enteredAge}
            onChange={(event) => setEnteredAge(Number(event.target.value))}
          />
        </div>
        <div className={classes.action}>
          <button>Create User</button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
