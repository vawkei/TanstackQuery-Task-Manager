import { useMutation } from "@tanstack/react-query";
import { login } from "../../apis/auth-api";
import type { User } from "../../interface/interface";

export const useLogin = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData:User) => login(userData),
    onSuccess: (data) => {
      console.log("logged in successfully", data);
      // queryClient.invalidateQueries({queryKey:["user"]})
    },

    onError: (error: any) => {
      const message = error instanceof Error ? error.message : "loggin failed";
      console.log("loggin error:", message);
    },
  });
};
