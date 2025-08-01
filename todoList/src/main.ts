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

const tasks: Task[] = [];
const editElement = document.getElementById("edit-task") as HTMLElement;
const statusElement = document.getElementById("status-filter") as HTMLElement;
const editStatusElm = document.getElementById(
  "edit-status"
) as HTMLSelectElement;
const editTitleElm = document.getElementById("edit-title") as HTMLInputElement;
const editIdElm = document.getElementById("edit-id") as HTMLInputElement;
const editDescElm = document.getElementById(
  "edit-description"
) as HTMLInputElement;
const cancelBtn = document.getElementById("cancel-button") as HTMLButtonElement;
const editForm = document.getElementById("edit-form") as HTMLFormElement;

const getTaskListFromLocalStorage = () => {
  const taskListFromLocal = localStorage.getItem("todos");

  if (taskListFromLocal && Array.isArray(JSON.parse(taskListFromLocal))) {
    tasks.push(...JSON.parse(taskListFromLocal));
  }
};

function displayTasks(tasks: Task[]) {
  const todoTable = document.getElementById("todolist");
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
        <td><button onclick="editTask(${task.id})">Edit</button></td>
        <td><button onclick="deleteTask(${task.id})">Delete</button></td>
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

function deleteTask(id: string) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    displayTasks(tasks);
    localStorage.setItem("todos", JSON.stringify(tasks));
  }
}

function setValue(text: string, elm: HTMLInputElement) {
  if (elm) {
    elm.value = text;
  }
}

function handleEditForm(id: string) {
  const task = tasks.find((task) => task.id == id);
  if (task) {
    deleteTask(task.id);
    const editedTask: Task = {
      id: task.id,
      title: editTitleElm.value,
      description: editDescElm.value,
      status: editStatusElm.value,
      createdAt: task.createdAt,
      updatedAt: new Date().toLocaleString("vi-VN"),
    };
    tasks.unshift(editedTask);
    displayTasks(tasks);
    localStorage.setItem("todos", JSON.stringify(tasks));
    editElement.style.display = "none";
  }
}

function editTask(id: string) {
  if (editElement) {
    const task = tasks.find((task) => task.id === id);
    renderStatus(editStatusElm);
    if (task) {
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

function main() {
  getTaskListFromLocalStorage();
  if (editElement) {
    editElement.style.display = "none";
  }
  renderStatus(statusElement);

  displayTasks(tasks);

  document.getElementById("add-form")?.addEventListener("submit", () => {
    const title = getInput("title");
    const description = getInput("description");
    if (title && description) {
      const task: Task = {
        id: new Date().getTime().toString(),
        title: title,
        description: description,
        status: statusObject[Status.TODO],
        createdAt: new Date().toLocaleString("vi-VN"),
        updatedAt: new Date().toLocaleString("vi-VN"),
      };

      tasks.unshift(task);
      localStorage.setItem("todos", JSON.stringify(tasks));
      alert("Added task!");
      (document.getElementById("add-form") as HTMLFormElement)?.reset();
      displayTasks(tasks);
    } else {
      alert("Please fill in the title and description");
    }
  });

  if (editForm)
    editForm.addEventListener("submit", () =>
      handleEditForm(getInput("edit-id"))
    );
  if (cancelBtn && editElement)
    cancelBtn.addEventListener("click", () => {
      editElement.style.display = "none";
    });
}

// main
main();
