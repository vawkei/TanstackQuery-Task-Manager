import { useMutation } from "@tanstack/react-query";
import { createTask } from "../../apis/tasks-api";
import { useNavigate } from "react-router-dom";
import type { TaskProps } from "../../interface/interface";
import { useQueryClient } from "@tanstack/react-query";
import getTasksQueryOption from "./getTasksQueryOption";

export const useCreateTask = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskData:TaskProps) => createTask(taskData),
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
      if (data?.msg === "new task created") {
        queryClient.invalidateQueries({
          queryKey:getTasksQueryOption().queryKey
        })
        navigate("/task-list");
      }
    },
    onError: (error: any) => {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("createTaskError:", message);
    },
  });
};
