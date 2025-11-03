import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../apis/tasks-api";
import getTasksQueryOption from "./getTasksQueryOption";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),

    onSuccess: (data) => {
      console.log("responseFromServer:", data);
      if (data.msg === "task deleted successfully.") {
        queryClient.invalidateQueries({
          //   queryKey: createUsersQueryOptions().queryKey,
          queryKey: getTasksQueryOption().queryKey,
          //   show a toast or set local state to confirm deletion
        });
      }
    },

    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("deleteTaskError:", message);
    },
  });
};
