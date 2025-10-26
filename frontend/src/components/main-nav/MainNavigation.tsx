import classes from "./MainNavigation.module.scss";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
    return ( 
        <header className={classes.header}>
            <h1><Link to={"/"}>Tanstack-Query</Link></h1>
            <nav>
                <ul>
                    <li><NavLink to={"/auth-form"}>Auth Form</NavLink></li>
                    {/* <li><NavLink to={"/user-form"}>User Form</NavLink></li> */}
                    {/* <li><NavLink to={"/user/:id"}>User Detail</NavLink></li> */}
                </ul>
            </nav>
        </header>
     );
}
 
export default MainNavigation;