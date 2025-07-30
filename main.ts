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
      </tr>
    `;
    });
    todoTable.innerHTML = rows;
  }
}

function nextId(todolist: Task[]): number {
  if (todolist.length > 0) return todolist.length + 1;
  else return 1;
}

function getInput(field: string): string {
  const inputElement = document.getElementById(field) as HTMLInputElement;
  if (inputElement) {
    return inputElement.value;
  } else return "";
}

// main
displayTasks(tasks);
document.getElementById("add-form")?.addEventListener("submit", () => {
  const title = getInput("title");
  const description = getInput("description");
  if (title && description) {
    const task: Task = {
      id: nextId(tasks),
      title: title,
      description: description,
      status: Status.TODO,
      createdAt: new Date().toLocaleString("vi-VN"),
      updatedAt: new Date().toLocaleString("vi-VN"),
    };

    tasks.push(task);
    localStorage.setItem("todos", JSON.stringify(tasks));
    alert("Added task!");
    (document.getElementById("add-form") as HTMLFormElement)?.reset();
    displayTasks(tasks);
  } else {
    alert("Please fill in the title and description");
  }
});

function checkIncludes(str: string, searchStr: string): boolean {
  const tmpStr = str.toLowerCase();
  const tmpSearchStr = searchStr.toLowerCase();
  const len = str.length;

  if (searchStr.length === 0) return true;
  if (searchStr.length > len) return false;

  for (let i = 0; i <= len - searchStr.length; i++) {
    if (tmpStr.substring(i, i + searchStr.length) === tmpSearchStr) {
      return true;
    }
  }
  return false;
}

document.getElementById("title-filter")?.addEventListener("input", () => {
  const title = getInput("title-filter");
  const status = getInput("status-filter");
  const filteredTasks = tasks.filter(
    (task) =>
      checkIncludes(task.title, title) && task.status.toLowerCase() === status
  );
  displayTasks(filteredTasks);
});

document.getElementById("status-filter")?.addEventListener("input", () => {
  const title = getInput("title-filter");
  const status = getInput("status-filter");
  const filteredTasks = tasks.filter(
    (task) =>
      checkIncludes(task.title, title) && task.status.toLowerCase() === status
  );
  displayTasks(filteredTasks);
});
