// import axios from "axios";

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

const APIUrl = "https://68917047447ff4f11fbc8ceb.mockapi.io/api/v1/tasks";
const LIMIT = 10;
let currentPage = 1;
let totalPages = 1;
let tasks: Task[] = [];
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
const pagination = document.getElementById("pagination");
const todoTable = document.getElementById("todolist");

function convertTaskData(tasks: Task[]): Task[] {
  return tasks.map((task) => ({
    ...task,
    status: statusObject[Status.TODO],
    createdAt: getCurrentTimeString(),
    updatedAt: getCurrentTimeString(),
  }));
}

async function saveTaskListInMockAPI(task: Task) {
  try {
    const response = await fetch(APIUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log("Error: ", error);
  }
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
        <td><button onclick="handleEditTask(${task.id})">Edit</button></td>
        <td><button onclick="handleDeleteTask(${task.id})">Delete</button></td>
      </tr>
    `;
    });
    todoTable.innerHTML = rows;
  }
}

function displayLoading() {
  if (todoTable) {
    todoTable.innerHTML = `
    <tr id="loading-row">
      <td colspan="8" style="text-align: center;">Loading...</td>
    </tr>
  `;
  }
}

function displayErrorLoading() {
  if (todoTable) {
    todoTable.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; color: red;">Failed to load tasks</td>
      </tr>
    `;
  }
}

async function getTasksLength() {
  try {
    const response = await fetch(APIUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const taskList: Task[] = await response.json();
    totalPages = Math.ceil(taskList.length / LIMIT);
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function getTaskListFromMockAPI(page = 1) {
  displayLoading();
  try {
    const response = await fetch(`${APIUrl}?page=${page}&limit=${LIMIT}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    tasks = convertTaskData(data);
    displayTasks(tasks);
    renderPagination();
  } catch (error) {
    displayErrorLoading();
    console.error("Error:", error);
  }
}

function renderPagination() {
  if (!pagination) return;

  let buttons = "";
  for (let i = 1; i <= totalPages; i++) {
    buttons += `<button onclick="goToPage(${i})" ${i === currentPage ? "disabled" : ""}>${i}</button>`;
  }
  pagination.innerHTML = buttons;
}

function goToPage(page: number) {
  currentPage = page;
  getTaskListFromMockAPI(page);
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

async function deleteTaskInMockAPI(id: string) {
  try {
    const response = await fetch(`${APIUrl}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function editTaskInMockAPI(id: string, task: Partial<Task>) {
  try {
    const response = await fetch(`${APIUrl}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(task),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  } catch (error) {
    console.log("Error: ", error);
  }
}

function deleteTaskById(id: string, tasks: Task[]): Task[] {
  return tasks.filter((task) => task.id !== id.toString());
}

async function handleDeleteTask(id: string) {
  tasks = deleteTaskById(id, tasks);
  displayTasks(tasks);
  await deleteTaskInMockAPI(id);
}

function handleEditTask(id: string) {
  if (editElement) {
    const task = tasks.find((task) => task.id === id.toString());
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

function setValue(text: string, elm: HTMLInputElement) {
  if (elm) {
    elm.value = text;
  }
}

function editTaskById(
  id: string,
  editedTask: Partial<Task>,
  tasks: Task[],
): Task[] {
  return tasks.map((task) => {
    if (task.id === id.toString()) {
      return {
        ...task,
        ...editedTask,
        updatedAt: getCurrentTimeString(),
      };
    }
    return task;
  });
}

async function handleEditForm(id: string) {
  tasks = editTaskById(
    id,
    {
      title: editTitleElm.value,
      description: editDescElm.value,
      status: editStatusElm.value,
    },
    tasks,
  );
  displayTasks(tasks);
  await editTaskInMockAPI(id, {
    title: editTitleElm.value,
    description: editDescElm.value,
    status: editStatusElm.value,
  });
  editElement.style.display = "none";
}

function getInput(field: string): string {
  const inputElement = document.getElementById(field) as HTMLInputElement;
  if (inputElement) {
    return inputElement.value;
  }
  return "";
}

function getCurrentTimeString(): string {
  return new Date().toLocaleString("vi-VN");
}

function createdTask(title: string, description: string): Task {
  return {
    id: (tasks.length + 1).toString(),
    title,
    description,
    status: statusObject[Status.TODO],
    createdAt: getCurrentTimeString(),
    updatedAt: getCurrentTimeString(),
  };
}

async function addTask(tasks: Task[]) {
  const title = getInput("title");
  const description = getInput("description");
  if (title && description) {
    const task = createdTask(title, description);
    tasks.unshift(task);
    await saveTaskListInMockAPI(task);
    alert("Added task!");
    (document.getElementById("add-form") as HTMLFormElement)?.reset();
    displayTasks(tasks);
  } else {
    alert("Please fill in the title and description");
  }
}

async function main() {
  await getTasksLength();
  await getTaskListFromMockAPI();
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
