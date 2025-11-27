import {
  ShowWhenLoggedIn,
  ShowWhenLoggedOut,
} from "../auth/protected/Protected";
import classes from "./MainNavigation.module.scss";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../features/auth/useLogout";
// import type { AddDispatch } from "../../store/store";
// import { useDispatch } from "react-redux";
// import { SET_LOGGEDOUT_USER } from "../../store/authIndex";

const MainNavigation = () => {
  const { mutateAsync: logoutUser } = useLogout();

  // not needed no more:
  // const dispatch = useDispatch<AddDispatch>();
  // const logOut = async () => {
  //   const response = await fetch("http://localhost:5000/api/v1/auth/logout",{
  //     credentials:"include"
  //   });
  //   const data = await response.json();
  //   if (data.msg === "user logged out successfully") {
  //     dispatch(SET_LOGGEDOUT_USER(data));
  //   }
  //   console.log("fetchedLogOut:", data);
  //   return data;
  // };

  return (
    <header className={classes.header}>
      <h1>
        <Link to={"/"}>Tanstack-Query</Link>
      </h1>
      <nav>
        <ul>
          <ShowWhenLoggedOut>
            <li>
              <NavLink to={"/auth-form"}>Auth Form</NavLink>
            </li>
          </ShowWhenLoggedOut>

          <ShowWhenLoggedIn>
            <li>
              <NavLink to={"/task-form"}>Task Form</NavLink>
            </li>
          </ShowWhenLoggedIn>

          <ShowWhenLoggedIn >
            <li>
              <NavLink to={"/task-list"}>Task List</NavLink>
            </li>
          </ShowWhenLoggedIn>
          <ShowWhenLoggedIn>
             <li onClick={()=>logoutUser()}>Logout</li> 
            {/*<li onClick={() => logOut()}>Logout</li> */}
          </ShowWhenLoggedIn>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
