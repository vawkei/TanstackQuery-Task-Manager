import { ProtectedLink } from "../auth/protected/Protected";
import classes from "./MainNavigation.module.scss";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <h1>
        <Link to={"/"}>Tanstack-Query</Link>
      </h1>
      <nav>
        <ul>
          <ProtectedLink requireAuth={false}>
            <li>
              <NavLink to={"/auth-form"}>Auth Form</NavLink>
            </li>
          </ProtectedLink>

          <ProtectedLink requireAuth={true}>
            <li>
              <NavLink to={"/user-form"}>Task Form</NavLink>
            </li>
          </ProtectedLink>

          <ProtectedLink requireAuth={true}>
            <li>
              <NavLink to={"/user/:id"}>Task Detail</NavLink>
            </li>
          </ProtectedLink>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
