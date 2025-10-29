import { ShowWhenLoggedIn, ShowWhenLoggedOut } from "../auth/protected/Protected";
import classes from "./MainNavigation.module.scss";
import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../../features/auth/useLogout";

const MainNavigation = () => {
 
  const {mutateAsync:logoutUser} = useLogout()
 
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

          <ShowWhenLoggedIn >
            <li>
              <NavLink to={"/user-form"}>Task Form</NavLink>
            </li>
          </ShowWhenLoggedIn>

          <ShowWhenLoggedIn >
            <li>
              <NavLink to={"/user/:id"}>Task Detail</NavLink>
            </li>
          </ShowWhenLoggedIn>
          <ShowWhenLoggedIn>
            <li onClick={()=>logoutUser()}>Logout</li>
          </ShowWhenLoggedIn>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
