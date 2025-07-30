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

var tasks: Task[] = JSON.parse(localStorage.getItem("todos") || "[]");

//functions
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

function deleteTask(id: number) {}

function editTask(id: number) {}

function getInput(field: string): string {
  const inputElement = document.getElementById(field) as HTMLInputElement;
  if (inputElement) {
    return inputElement.value;
  } else return "";
}

// main

// render status filter
const statusElement = document.getElementById("status-filter") as HTMLElement;
if (statusElement) {
  let selects = "";
  for (const status in Status) {
    selects += `<option value="${status}">${status}</option>`;
  }
  statusElement.innerHTML = selects;
}

// render tasks list
displayTasks(tasks);
