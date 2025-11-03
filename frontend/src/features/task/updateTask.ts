import { useMutation } from "@tanstack/react-query";
import { updateTask } from "../../apis/tasks-api";
import { useNavigate } from "react-router-dom";
import type { TaskProps } from "../../interface/interface";
import getTasksQueryOption from "./getTasksQueryOption";
import { useQueryClient } from "@tanstack/react-query";

const useUpdateTask = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: ({id task}) => updateTask(id, task),
    mutationFn: ({ id, task }: { id: string; task: TaskProps }) =>
      updateTask(id, task),
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
      if (data?.msg === "task updated successfully") {
        navigate("/task-list");
        queryClient.invalidateQueries({
          queryKey: getTasksQueryOption().queryKey,
        });
      }
    },
    onError: (error: any) => {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("updateTaskError:", message);
    },
  });
};

export default useUpdateTask;
