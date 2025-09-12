import { FC } from "react";
import { type Dispatch, type SetStateAction } from "react";
import { Task } from "../../types/task.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCurrentTimeString } from "../../utils/formatDate";
import DisplayError from "../../components/DisplayError";
import { statusObject } from "../../constants/statusObject.constant";
import { Status } from "../../types/status.enum";
import Button from "../../components/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditTaskArgs, editTaskInMockAPI } from "../../services/editTask.api";
import { queryKeys } from "../../constants/queryKeys.constant";

interface EditTaskFormProps {
  task: Task;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const EditTaskForm: FC<EditTaskFormProps> = ({ task, setIsEditing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<Task>>({
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
    mode: "onChange",
  });

  const queryClient = useQueryClient();

  const mutation = useMutation<Task, Error, EditTaskArgs>({
    mutationFn: editTaskInMockAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.todos });
    },
  });

  const onSubmit: SubmitHandler<Partial<Task>> = async (editedTask) => {
    editedTask = {
      ...editedTask,
      updatedAt: getCurrentTimeString(),
    };

    mutation.mutate(
      { id: task.id, task: editedTask },
      {
        onSuccess: (task) => {
          alert(`Task ${task.title} updated successfully!`);
        },
        onError: (error) => {
          console.log(error);
          alert("Failed to update task. Please try again.");
        },
      },
    );

    setIsEditing(false);
  };

  function handleCancel() {
    setIsEditing(false);
  }
  return (
    <>
      <section id="edit-task">
        <h3>Edit task</h3>
        <form onSubmit={handleSubmit(onSubmit)} id="edit-form">
          <label>ID:</label>
          <br />
          <input
            type="text"
            id="edit-id"
            value={task.id}
            readOnly
            style={{ color: "gray" }}
          />
          <br />
          <label>Title: </label>
          <br />
          <input
            id="edit-title"
            {...register("title", {
              minLength: {
                value: 3,
                message: "Title must be at least 3 chars",
              },
            })}
          />
          <br />
          <DisplayError error={errors.title} />
          <label>Description: </label>
          <br />
          <input
            id="edit-description"
            {...register("description", {
              minLength: {
                value: 5,
                message: "Description must be at least 5 chars",
              },
            })}
          />
          <br />
          <DisplayError error={errors.description} />
          <br />
          <label>
            Status:
            <select id="status" {...register("status")}>
              {Object.keys(statusObject).map((key) => {
                const status = statusObject[key as Status];
                return status ? (
                  <option key={key} value={status}>
                    {status}
                  </option>
                ) : null;
              })}
            </select>
          </label>
          <br />
          <br />
          <Button title="Submit" />
          <Button title="Cancel" handleClick={handleCancel} />
        </form>
      </section>
    </>
  );
};

export default EditTaskForm;
