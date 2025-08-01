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
  id: number;
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
      const status = statusObject[key];
      if (status) options += `<option value="${status}">${status}</option>`;
    });
    elm.innerHTML = options;
  }
}

function deleteTask(id: number) {
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

function handleEditForm(task: Task) {
  editForm.addEventListener("submit", () => {
    const editedTask: Task = {
      id: task.id,
      title: editTitleElm.value,
      description: editDescElm.value,
      status: editStatusElm.value as Status,
      createdAt: task.createdAt,
      updatedAt: new Date().toLocaleString("vi-VN"),
    };
    deleteTask(task.id);
    tasks.unshift(editedTask);
    displayTasks(tasks);
    localStorage.setItem("todos", JSON.stringify(tasks));
    editElement.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    editElement.style.display = "none";
  });
}

function editTask(id: number) {
  if (editElement) {
    renderStatus(editStatusElm);
    editElement.style.display = "block";
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setValue(task.title, editTitleElm);
      setValue(task.description, editDescElm);
      editStatusElm.value = task.status;
      handleEditForm(task);
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
        id: new Date().getTime(),
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
}

// main
main();
