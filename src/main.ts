// variables, enums, interfaces
enum Status {
  TODO = "TODO",
  PROGRESS = "PROGRESS",
  DONE = "DONE",
}

const statusObject = {
  [Status.DONE]: "DONE",
  [Status.TODO]: "TODO",
  [Status.PROGRESS]: "PROGRESS",
};

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
// let tasks: Task[] = [];

const todoTable = document.getElementById("todolist");
const editElement = document.getElementById("edit-task") as HTMLElement;
const statusElement = document.getElementById("status-filter") as HTMLElement;
const editStatusElm = document.getElementById(
  "edit-status",
) as HTMLSelectElement;
const editTitleElm = document.getElementById("edit-title") as HTMLInputElement;
const editIdElm = document.getElementById("edit-id") as HTMLInputElement;
const editDescElm = document.getElementById(
  "edit-description",
) as HTMLInputElement;
const cancelBtn = document.getElementById("cancel-button") as HTMLButtonElement;
const editForm = document.getElementById("edit-form") as HTMLFormElement;

function getTaskListFromLocalStorage(): Task[] {
  const taskListFromLocal = localStorage.getItem("todos");
  if (taskListFromLocal && Array.isArray(JSON.parse(taskListFromLocal))) {
    return JSON.parse(taskListFromLocal);
  }
  return [];
}

function saveInLocal(taskList: Task[]) {
  localStorage.setItem("todos", JSON.stringify(taskList));
}

function getCurrentTimeString(): string {
  return new Date().toLocaleString("vi-VN");
}

function displayTasks(tasks: Task[]) {
  if (todoTable) {
    let rows = "";
    tasks.forEach((task) => {
      rows += `
      <tr>
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.status}</td>
        <td>${task.createdAt}</td>
        <td>${task.updatedAt}</td>
        <td><button onclick="handleEditTask('${task.id}')">Edit</button></td>
        <td><button onclick="handleDeleteTask('${task.id}')">Delete</button></td>
      </tr>
    `;
    });
    todoTable.innerHTML = rows;
  }
}

function renderStatus(elm: HTMLElement) {
  if (elm) {
    let options = `<option value="">Choose status</option>`;
    Object.keys(statusObject).forEach((key) => {
      const status = statusObject[key as Status];
      if (status) options += `<option value="${status}">${status}</option>`;
    });
    elm.innerHTML = options;
  }
}

function deletedTasks(id: string, tasks: Task[]): Task[] {
  console.log(typeof id);
  console.log(typeof tasks[0].id);
  return tasks.filter((task) => task.id !== id);
}

function handleDeleteTask(id: string) {
  let tasks = getTaskListFromLocalStorage();
  tasks = deletedTasks(id, tasks);
  displayTasks(tasks);
  saveInLocal(tasks);
}

function editedTasks(
  id: string,
  editedTask: Partial<Task>,
  tasks: Task[],
): Task[] {
  return tasks.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        ...editedTask,
        updatedAt: getCurrentTimeString(),
      };
    }
    return task;
  });
}

function handleEditForm(id: string) {
  let tasks = getTaskListFromLocalStorage();
  tasks = editedTasks(
    id,
    {
      title: editTitleElm.value,
      description: editDescElm.value,
      status: editStatusElm.value,
    },
    tasks,
  );
  displayTasks(tasks);
  saveInLocal(tasks);
  editElement.style.display = "none";
}

function setValue(text: string, elm: HTMLInputElement) {
  if (elm) {
    elm.value = text;
  }
}

function handleEditTask(id: string) {
  const tasks = getTaskListFromLocalStorage();
  if (editElement) {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      renderStatus(editStatusElm);
      setValue(task.id, editIdElm);
      setValue(task.title, editTitleElm);
      setValue(task.description, editDescElm);
      editStatusElm.value = task.status;
      editElement.style.display = "block";
    }
  }
}

function getInput(field: string): string {
  const inputElement = document.getElementById(field) as HTMLInputElement;
  if (inputElement) {
    return inputElement.value;
  }
  return "";
}

function createdTask(title: string, description: string): Task {
  return {
    id: new Date().getTime().toString(),
    title,
    description,
    status: statusObject[Status.TODO],
    createdAt: getCurrentTimeString(),
    updatedAt: getCurrentTimeString(),
  };
}

function addTask(tasks: Task[]) {
  const title = getInput("title");
  const description = getInput("description");
  if (title && description) {
    const task = createdTask(title, description);
    tasks.unshift(task);
    saveInLocal(tasks);
    alert("Added task!");
    (document.getElementById("add-form") as HTMLFormElement)?.reset();
    displayTasks(tasks);
  } else {
    alert("Please fill in the title and description");
  }
}

function main() {
  // getTaskListFromLocalStorage();
  const tasks = getTaskListFromLocalStorage();
  if (editElement) {
    editElement.style.display = "none";
  }
  renderStatus(statusElement);

  displayTasks(tasks);

  document
    .getElementById("add-form")
    ?.addEventListener("submit", () => addTask(tasks));

  if (editForm)
    editForm.addEventListener("submit", () =>
      handleEditForm(getInput("edit-id")),
    );
  if (cancelBtn && editElement)
    cancelBtn.addEventListener("click", () => {
      editElement.style.display = "none";
    });
}

// main
main();
