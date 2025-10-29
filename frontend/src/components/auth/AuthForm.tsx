import { useState } from "react";
import classes from "./AuthForm.module.scss";
import Card from "../ui/card/Card";
import Button from "../ui/button/Button";
// import { register, login, RESET_AUTH } from "../../store/auth/authIndex";
import { useDispatch } from "react-redux";
import type { AddDispatch } from "../../store/store";
import {  useNavigate } from "react-router-dom";
import { useRegister } from "../../features/auth/useRegister";
import { useLogin } from "../../features/auth/useLogin";
import type { User } from "../../interface/interface";
import { SET_LOGGEDIN_USER } from "../../store/authIndex";

const AuthForm = () => {
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");

  const [haveAccount, setHaveAccount] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const switchAuthModeHandler = () => {
    setHaveAccount((currentState) => !currentState);
  };

  const navigate = useNavigate();

  const { mutateAsync: registerUser, isPending } = useRegister();
  const { mutateAsync: loginUser } = useLogin();

  const dispatch = useDispatch<AddDispatch>();

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (enteredEmail.trim().length === 0 || enteredPassword.trim().length < 6) {
      return console.log("please enter email and password");
    }

    try {
      const userData: User = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };

      if (haveAccount) {
        // 📒📒For Login===============================================================
        setIsSending(true);
        await loginUser(userData, {
          onSuccess: (data) => {
            console.log("responseFromServer:", data);
            if (data?.msg === "loggedin successfully") {
              dispatch(SET_LOGGEDIN_USER(data));
              navigate("/task-form")
            }
          },
        });
        

        console.log(userData);
      } else {
        // 📒📒For Register===============================================================
        setIsSending(true);
        await registerUser(userData, {
          onSuccess: (data) => {
            console.log("responseFromServer:", data);
            if (data?.msg === "new user registered") {
              setHaveAccount(true);
            }
          },
        });

        console.log(userData);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("error:", message);
    } finally {
      setIsSending(false);
      setEnteredName("");
      setEnteredEmail("");
      setEnteredPassword("");
    }
  };

  // 📒📒Not needed since i am not using redux to make the change.
  // useEffect(() => {
  //   if (message === "new user registered") {
  //     setHaveAccount(true);
  //     dispatch(RESET_AUTH());
  //   }
  // }, [message, dispatch]);

  return (
    <div className={classes["auth-form-container"]}>
      <form action="" onSubmit={onSubmitHandler}>
        <Card className={classes.cardClass}>
          {isPending && <p style={{ color: "green" }}>Loading...</p>}
          <div className={classes["form-intro"]}>
            {isSending && <p>Sending...</p>}
            <h2>{haveAccount ? "Login" : "Register"}</h2>
          </div>

          {haveAccount ? (
            ""
          ) : (
            <div className={classes.control}>
              <label htmlFor="">Name:</label>
              <input
                type="text"
                placeholder="enter user name"
                value={enteredName}
                onChange={(event) => setEnteredName(event.target.value)}
              />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="">Email:</label>
            <input
              type="email"
              placeholder="enter email"
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="">Password:</label>
            <input
              type="password"
              placeholder="enter password"
              value={enteredPassword}
              onChange={(event) => setEnteredPassword(event.target.value)}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit">Submit</Button>
          </div>

          <div className={classes["form-outro"]}>
            <p onClick={switchAuthModeHandler}>
              {haveAccount
                ? "create new account"
                : "log in with existing account"}
            </p>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default AuthForm;
