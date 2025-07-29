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
  createdAt: Date;
  updatedAt: Date;
}

const task1: Task = {
  id: 1,
  title: "ABC",
  description: "xyz",
  status: Status.TODO,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const task2: Task = {
  id: 2,
  title: "XYZ",
  description: "xyz",
  status: Status.TODO,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const todoData: Task[] = [];

todoData.push(task1);
todoData.push(task2);

localStorage.setItem("todos", JSON.stringify(todoData));

const localData: Task[] = JSON.parse(localStorage.getItem("todos") || "");

const todoTable = document.getElementById("todolist");

if (todoTable && Array.isArray(localData)) {
  let rows = "";
  localData.forEach((task: Task) => {
    rows += `
      <tr>
        <td>${task.id}</td>
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.status}</td>
        <td>${task.createdAt.toLocaleString()}</td>
        <td>${task.updatedAt.toLocaleString()}</td>
      </tr>
    `;
  });
  todoTable.innerHTML = rows;
}

