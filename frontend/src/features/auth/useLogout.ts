import { useMutation } from "@tanstack/react-query";
import { logout } from "../../apis/auth-api";
import { useDispatch } from "react-redux";
import type { AddDispatch } from "../../store/store";

// logout
export const useLogout = () => {
    
    const dispatch = useDispatch<AddDispatch>;
 
    return useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      console.log("logged out successfully", data);
      if(data.msg==="user logged out successfully"){
        dispatch()
      }
    },
    onError: (error) => {
      const message = error instanceof Error ? error.message : "loggin failed";
      console.log("loggin error:", message);
    },
  });
};
