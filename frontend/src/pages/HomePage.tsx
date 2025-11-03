// import { useQuery } from "@tanstack/react-query";
// import getTasksQueryOption from "../features/task/getTasksQueryOption";
// import { useEffect } from "react";

const HomePage = () => {
  //  const { data } = useQuery(getTasksQueryOption());
  
  //  console.log("data:", data);

  // const fetchTasks =async ()=>{
  //   const response = await fetch("http://localhost:5000/api/v1/tasks/get-tasks",{
  //     credentials:"include"
  //   });
  //   const data = await response.json();
  //   console.log("fetchedTasksData:",data)
  //   return data
  // };

  // useEffect(()=>{
  //   fetchTasks()
  // },[]);

  return (
    <div>
      <h2>The Home Page</h2>
    </div>
  );
};

export default HomePage;
