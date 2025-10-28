import classes from "./MockApp.module.css";
import { useQuery } from "@tanstack/react-query";
import Card from "./components/ui/Card";
import UserForm from "./components/userss/users/UserForm";
import getUsersQueryOptions from "./queryOptions/GetUsersQueryOptions";
// import { createUser } from "./api";
// import getUsersQueryOptions from "./queryOptions/GetUsersQueryOptions";
//import createUsersQueryOptions from "./queryOptions/GetUsersQueryOptions";

export default function MockApp() {
  const {
    data: users,
    isLoading,
    isError,
    error,
  } = useQuery(getUsersQueryOptions());

  console.log("useQuery isLoading:", isLoading);
  console.log("useQuery isError:", isError, "error:", error);
  console.log("raw data:", users);
  // const queryClient = useQueryClient();
  // const handleCreate = async () => {
  //   const user = {
  //     name: "Austin",
  //     email: `${Math.random().toString(36).substring(2)}@gmail.com`,
  //     age: 27,
  //     createdAt: new Date().toDateString(),
  //     updatedAt: new Date().toDateString(),
  //   };
  //   await createUser(user);
  //   // queryClient.invalidateQueries({ queryKey: ["users"] });
  //   queryClient.invalidateQueries({
  //     queryKey: getUsersQueryOptions().queryKey,
  //   });
  // };

  return (
    <div className={classes.container}>
      <div>
        <UserForm />
      </div>

      <div className={classes["form-list"]}>
        {users?.map((user: any) => (
          <Card user={user} key={user.id} />
        ))}
      </div>
      {/* <button
        onClick={handleCreate}
        style={{
          borderRadius: "4px",
          padding: "2px",
          cursor: "pointer",
          backgroundColor: "green",
          color: "white",
        }}
      >
        Create New User
      </button> */}
    </div>
  );
}
