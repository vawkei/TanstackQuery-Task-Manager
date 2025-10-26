import { Link } from "react-router-dom";
import MainNavigation from "../components/main-nav/MainNavigation";

const ErrorPage = () => {
    return ( 
        <div>
            <MainNavigation />
              <main style={{ width: "100%", maxWidth: "50rem", margin: "5rem auto" }}>
                <h2>Page not found</h2>
                <p><Link to={"/"}>Click here to go Home</Link></p>
            </main>
        </div>
     );
}
 
export default ErrorPage;