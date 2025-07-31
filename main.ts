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
  } else return "";
}

function main() {
  getTaskListFromLocalStorage();
  if (editElement) {
    editElement.style.display = "none";
  }
  renderStatus(statusElement);

  displayTasks(tasks);
}

// main
main();

document.getElementById("title-filter")?.addEventListener(
  "input",
  debounce(() => {
    const title = getInput("title-filter");
    const status = getInput("status-filter");
    const filteredTasks = tasks.filter(
      (task) =>
        checkIncludes(task.title, title) &&
        (status !== "" ? task.status === status : true)
    );
    displayTasks(filteredTasks);
  }, 1000)
);

document.getElementById("status-filter")?.addEventListener("input", () => {
  const title = getInput("title-filter");
  const status = getInput("status-filter");
  const filteredTasks = tasks.filter(
    (task) =>
      checkIncludes(task.title, title) &&
      (status !== "" ? task.status === status : true)
  );
  displayTasks(filteredTasks);
});
