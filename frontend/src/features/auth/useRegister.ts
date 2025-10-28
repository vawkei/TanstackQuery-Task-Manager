import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../../apis/auth-api";
import type { User } from "../../interface/interface";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData:User) => register(userData),
    onSuccess: (data) => {
      console.log("user registered successfully:", data);
      //refetch or invalidate list of users:
      //   queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: any) => {
      const message =
        error instanceof Error ? error.message : " registeration failed";
      console.log("regError:", message);
    },
  });
};
