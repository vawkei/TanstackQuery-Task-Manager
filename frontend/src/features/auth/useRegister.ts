import { useMutation } from "@tanstack/react-query";
import { register } from "../../apis/auth-api";
import type { User } from "../../interface/interface";



export const useRegister = () => {


  return useMutation({
    mutationFn: (userData:User) => register(userData),
    //📒📒I didnt call the onSuccess here, but inside theAuthForm.ts, so as to avoid using redux and useEffect to update the haveAccount state to true in the AuthForm.📒📒
    // onSuccess: (data) => {
    //   console.log("responseFromServer:", data);
    //   dispatch(SET_REGISTERED_USER(data))
    // },
    onError: (error: any) => {
      const message =
        error instanceof Error ? error.message : " registeration failed";
      console.log("regError:", message);
    },
  });
};
