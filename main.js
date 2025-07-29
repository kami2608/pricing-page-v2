var Status;
(function (Status) {
    Status["TODO"] = "TODO";
    Status["PROGRESS"] = "PROGRESS";
    Status["DONE"] = "DONE";
})(Status || (Status = {}));
var task1 = {
    id: 1,
    title: "ABC",
    description: "xyz",
    status: Status.TODO,
    createdAt: new Date(),
    updatedAt: new Date(),
};
var task2 = {
    id: 2,
    title: "XYZ",
    description: "xyz",
    status: Status.TODO,
    createdAt: new Date(),
    updatedAt: new Date(),
};
var todoData = [];
todoData.push(task1);
todoData.push(task2);
localStorage.setItem("todos", JSON.stringify(todoData));
var localData = JSON.parse(localStorage.getItem("todos") || "");
var todoTable = document.getElementById("todolist");
if (todoTable && Array.isArray(localData)) {
    var rows_1 = "";
    localData.forEach(function (task) {
        rows_1 += "\n      <tr>\n        <td>".concat(task.id, "</td>\n        <td>").concat(task.title, "</td>\n        <td>").concat(task.description, "</td>\n        <td>").concat(task.status, "</td>\n        <td>").concat(task.createdAt.toLocaleString(), "</td>\n        <td>").concat(task.updatedAt.toLocaleString(), "</td>\n      </tr>\n    ");
    });
    todoTable.innerHTML = rows_1;
}
