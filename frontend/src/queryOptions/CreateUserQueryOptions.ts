import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../apis/users-api";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: any) => createUser(user),
    onSuccess: () => {
      //refetch or invalidate list of users:
      queryClient.invalidateQueries({ queryKey: ["users"] });
      
      // queryClient.invalidateQueries({
      //   queryKey: getUsersQueryOptions().queryKey,
      // });
    },
  });
}
