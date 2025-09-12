import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Task } from "../../types/task.types";
import { createdTask } from "../../utils/createNewTask";
import { fieldRules } from "../../utils/fieldRules";
import DisplayError from "../../components/DisplayError";
import Button from "../../components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveTaskInMockAPI } from "../../services/postTask.api";
import { queryKeys } from "../../constants/queryKeys.constant";

const TaskInput: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation<Task, Error, Task>({
    mutationFn: saveTaskInMockAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos });
    },
    
  },
);

  const onSubmit: SubmitHandler<Partial<Task>> = async (data) => {
    const newTask = createdTask(data);
    mutation.mutate(newTask, {
      onSuccess: (task) => {
        reset();
        alert(`Task ${task.title} added successfully!`);
      },
      onError: (error) => {
        console.log(error);
        alert("Failed to add task. Please try again.");
      },
    });
  };

  return (
    <>
      <div className="add-task">
        <h2>Add Task</h2>
        <form id="add-form" onSubmit={handleSubmit(onSubmit)}>
          <label>Title: </label>
          <br />
          <input
            id="title"
            {...register("title", {
              required: true,
              minLength: {
                value: 3,
                message: "Title must be at least 3 chars",
              },
              validate: fieldRules,
            })}
          />
          <br />
          <DisplayError error={errors.title} />
          <label>Description: </label>
          <br />
          <input
            id="description"
            {...register("description", {
              required: true,
              minLength: {
                value: 5,
                message: "Description must be at least 5 chars",
              },
            })}
          />
          <br />
          <DisplayError error={errors.description} />
          <br />
          <Button title="Add" />
          <br />
        </form>
      </div>
    </>
  );
};

export default TaskInput;
