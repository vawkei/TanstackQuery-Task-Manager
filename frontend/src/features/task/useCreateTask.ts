import { useMutation } from "@tanstack/react-query";
import { createTask } from "../../apis/tasks-api";
import { useNavigate } from "react-router-dom";

export const useCreateTask = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => createTask(data),
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
      if (data?.msg === "new task created") {
        navigate("/");
      }
    },

    onError: (error: any) => {
      const message =
        error instanceof Error ? error.message : "something went wrong";
      console.log("createTaskError:", message);
    },
  });
};
