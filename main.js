var _a;
// variables, enums, interfaces
var Status;
(function (Status) {
    Status["TODO"] = "TODO";
    Status["PROGRESS"] = "PROGRESS";
    Status["DONE"] = "DONE";
})(Status || (Status = {}));
var tasks = [];
//functions
function displayTasks() {
    tasks = JSON.parse(localStorage.getItem("todos") || "[]");
    var todoTable = document.getElementById("todolist");
    if (todoTable && Array.isArray(tasks)) {
        var rows_1 = "";
        tasks.forEach(function (task) {
            rows_1 += "\n      <tr>\n        <td>".concat(task.id, "</td>\n        <td>").concat(task.title, "</td>\n        <td>").concat(task.description, "</td>\n        <td>").concat(task.status, "</td>\n        <td>").concat(task.createdAt, "</td>\n        <td>").concat(task.updatedAt, "</td>\n      </tr>\n    ");
        });
        todoTable.innerHTML = rows_1;
    }
}
function nextId(todolist) {
    if (todolist.length > 0)
        return todolist.length + 1;
    else
        return 1;
}
function getInput(field) {
    var inputElement = document.getElementById(field);
    if (inputElement) {
        return inputElement.value;
    }
    else
        return "";
}
// main
displayTasks();
(_a = document.getElementById("add-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function () {
    var _a;
    var title = getInput("title");
    var description = getInput("description");
    if (title && description) {
        var task = {
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
        (_a = document.getElementById("add-form")) === null || _a === void 0 ? void 0 : _a.reset();
        displayTasks();
    }
    else {
        alert("Please fill in the title and description");
    }
});
