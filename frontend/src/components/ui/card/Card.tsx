// import { useDeleteUser } from "../../queryOptions/DeleteUserQueryOptions";
// import type { User } from "../../types";
// // import { deleteUser } from "../../apis/users-api";
// // import { useQueryClient } from "@tanstack/react-query";
// // import createUsersQueryOptions from "../../queryOptions/GetUsersQueryOptions";




// type CardProps = {
//   user: User;
// };

// export default function Card(props:CardProps) {
//   // const { _id, name, email, createdAt } = props.user;
//   // const queryClient = useQueryClient();
//   const {mutateAsync} = useDeleteUser()

// //   const handleDelete = async (id: string) => {
// //     await deleteUser(id);
// //     queryClient.invalidateQueries({
// //       queryKey: createUsersQueryOptions().queryKey,
// //     });
// //   };


// const handleDelete = async (id: string) => {
//   try {
//     await mutateAsync(id);
    
//     // await deleteUser(id);
//     // queryClient.invalidateQueries({
//     //   queryKey: createUsersQueryOptions().queryKey,
//     // });
//     // optional: show a toast or set local state to confirm deletion

//   } catch (err: any) {
//     console.error("Delete failed:", err);
//     // show error to user (toast/modal)
//     alert(err.message || "Failed to delete user");
//   }
// };

//   return (
//     <div
//       style={{
//         backgroundColor: "white",
//         border: "1px solid grey",
//         marginBottom: "1rem",
//         borderRadius: "4px",
//         width:"100%",
//         maxWidth:"35rem",
//         margin:"0.25rem auto"
//       }}
//     >
//       <button
//         onClick={() => handleDelete(props.user.id)}
//         style={{ padding: "1rem", cursor: "pointer" }}
//       >
//         Click Me
//       </button>
//       <div style={{ padding: "1rem" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             marginBottom: "4px",
//           }}
//         >
//           <h3 style={{ fontWeight: "bold", color: "gray", fontSize: "1rem" }}>
//             {props.user.name}
//           </h3>
//           <span>ID: {props.user.id}</span>
//         </div>
//         <div>
//           <div>{props.user.email}</div>
//           <div>{new Date(props.user.createdAt).toLocaleDateString()}</div>
//         </div>
//       </div>
//     </div>
//   );
// }


  // {
  //     "id": "1",
  //     "name": "Alice",
  //     "email": "alice@gmail.com",
  //     "age": 20
  //   }

  import classes from "./Card.module.scss";
  import type React from "react";

  const Card:React.FC<{children:React.ReactNode,className:string}> = (props) => {
    return ( 
      <div className={`${classes.card} ${props.className}`}>
          {props.children}
      </div>
     );
  }
   
  export default Card;