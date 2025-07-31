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
