// variables, enums, interfaces
enum Status {
  TODO = "TODO",
  PROGRESS = "PROGRESS",
  DONE = "DONE",
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

const tasks: Task[] = Array.isArray(JSON.parse(localStorage.getItem("todos") || "[]")) ? JSON.parse(localStorage.getItem("todos") || "[]") : [];

const editElement = document.getElementById("edit-task") as HTMLElement;
const statusElement = document.getElementById("status-filter") as HTMLElement;

//functions
const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeoutTimer);

    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

function displayTasks(tasks: Task[]) {
  const todoTable = document.getElementById("todolist");
  if (todoTable && Array.isArray(tasks)) {
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
    let selects = `<option value="">Choose status</option>`;
    for (const status in Status) {
      selects += `<option value="${status}">${status}</option>`;
    }
    elm.innerHTML = selects;
  }
}


function setValue(text: string, elm: HTMLInputElement) {
  if (elm) {
    elm.value = text;
  }
}

function getInput(field: string): string {
  const inputElement = document.getElementById(field) as HTMLInputElement;
  if (inputElement) {
    return inputElement.value;
  } else return "";
}


// main

if (editElement) {
  editElement.style.display = "none";
}

// render status filter

renderStatus(statusElement);

// render tasks list
displayTasks(tasks);

// create task
