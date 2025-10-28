import { useState } from "react";
import classes from "./AuthForm.module.scss";
import Card from "../ui/card/Card";
import Button from "../ui/button/Button";
// import { register, login, RESET_AUTH } from "../../store/auth/authIndex";
// import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
// import { AddDispatch, RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../../features/auth/useRegister";
import { useLogin } from "../../features/auth/useLogin";
import type { User } from "../../interface/interface";

const AuthForm = () => {
  const [enteredName, setEnteredName] = useState<string>("");
  const [enteredEmail, setEnteredEmail] = useState<string>("");
  const [enteredPassword, setEnteredPassword] = useState<string>("");

  const [haveAccount, setHaveAccount] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const switchAuthModeHandler = () => {
    setHaveAccount((currentState) => !currentState);
  };


  const {mutateAsync:registerUser,isPending} = useRegister();
  const {mutateAsync:loginUser} = useLogin();

  // const dispatch = useDispatch<AddDispatch>();

  // const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

  // const {isLoggedIn, isSuccess} = useTypedSelector(
  //   (state) => state.auth
  // );


  // console.log("message:",message);
  // console.log("isSuccess:",isSuccess)
  // console.log("isLoading:",isLoading);
  // console.log("isLoggedIn:", isLoggedIn);

  // const navigate = useNavigate();

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (enteredEmail.trim().length === 0 || enteredPassword.trim().length < 6) {
      return console.log("please enter email and password");
    }

    try {
      const userData:User = {
        username: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };

      if (haveAccount) {
        setIsSending(true);
        await loginUser(userData)
        // navigate("/task-form")
        // await dispatch(login(userData));
        console.log(userData);
      } else {
        setIsSending(true);
        await registerUser(userData)
        // await dispatch(register(userData));
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

  // useEffect(() => {
  //   if (isLoggedIn && isSuccess) {
  //     navigate("/task-list");
  //   }
  //   dispatch(RESET_AUTH());
  // }, [isLoggedIn, isSuccess]);

  return (
    <div className={classes["auth-form-container"]}>
      
      <form action="" onSubmit={onSubmitHandler}>
        <Card className={classes.cardClass}>
          
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
