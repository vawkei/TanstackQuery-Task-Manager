import { useMutation } from "@tanstack/react-query";
import { updateTask } from "../../apis/tasks-api";
import { useNavigate } from "react-router-dom";

const useUpdateTask = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string, task) => updateTask(id, task),
    onSuccess: (data) => {
      console.log("responseFromServer:", data);
      navigate("/");
    },
    onError: (error: any) => {
      const message =
        error instanceof Error ? error.message : "something went wrong";
        console.log("updateTaskError:",message)
    },
  });
};

export default useUpdateTask;
