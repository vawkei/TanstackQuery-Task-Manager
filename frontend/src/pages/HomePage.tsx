import  useGetTasksQuery from "../features/task/getTaskQuery";

const HomePage = () => {
   
    const {data } = useGetTasksQuery();
    console.log("data:",data)

    return ( 
        <div>
            <h2>The Home Page</h2>
        </div>
     );
}
 
export default HomePage;