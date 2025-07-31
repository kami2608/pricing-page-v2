var _a;
var _b;
// variables, enums, interfaces
var Status;
(function (Status) {
    Status["TODO"] = "TODO";
    Status["PROGRESS"] = "PROGRESS";
    Status["DONE"] = "DONE";
})(Status || (Status = {}));
var statusObject = (_a = {},
    _a[Status.DONE] = "DONE",
    _a[Status.TODO] = "TODO",
    _a[Status.PROGRESS] = "PROGRESS",
    _a);
var tasks = [];
var editElement = document.getElementById("edit-task");
var statusElement = document.getElementById("status-filter");
var getTaskListFromLocalStorage = function () {
    var taskListFromLocal = localStorage.getItem("todos");
    if (taskListFromLocal && Array.isArray(JSON.parse(taskListFromLocal))) {
        tasks.push.apply(tasks, JSON.parse(taskListFromLocal));
    }
};
function displayTasks(tasks) {
    var todoTable = document.getElementById("todolist");
    if (todoTable) {
        var rows_1 = "";
        tasks.forEach(function (task) {
            rows_1 += "\n      <tr>\n        <td>".concat(task.id, "</td>\n        <td>").concat(task.title, "</td>\n        <td>").concat(task.description, "</td>\n        <td>").concat(task.status, "</td>\n        <td>").concat(task.createdAt, "</td>\n        <td>").concat(task.updatedAt, "</td>\n        <td><button onclick=\"editTask(").concat(task.id, ")\">Edit</button></td>\n        <td><button onclick=\"deleteTask(").concat(task.id, ")\">Delete</button></td>\n      </tr>\n    ");
        });
        todoTable.innerHTML = rows_1;
    }
}
function renderStatus(elm) {
    if (elm) {
        var options_1 = "<option value=\"\">Choose status</option>";
        Object.keys(statusObject).forEach(function (key) {
            var status = statusObject[key];
            if (status)
                options_1 += "<option value=\"".concat(status, "\">").concat(status, "</option>");
        });
        elm.innerHTML = options_1;
    }
}
function main() {
    getTaskListFromLocalStorage();
    if (editElement) {
        editElement.style.display = "none";
    }
    renderStatus(statusElement);
    displayTasks(tasks);
}
function getInput(field) {
    var inputElement = document.getElementById(field);
    if (inputElement) {
        return inputElement.value;
    }
    return "";
}
// main
main();
(_b = document.getElementById("add-form")) === null || _b === void 0 ? void 0 : _b.addEventListener("submit", function () {
    var _a;
    var title = getInput("title");
    var description = getInput("description");
    if (title && description) {
        var task = {
            id: new Date().getTime(),
            title: title,
            description: description,
            status: statusObject[Status.TODO] || "TODO",
            createdAt: new Date().toLocaleString("vi-VN"),
            updatedAt: new Date().toLocaleString("vi-VN"),
        };
        tasks.unshift(task);
        localStorage.setItem("todos", JSON.stringify(tasks));
        alert("Added task!");
        (_a = document.getElementById("add-form")) === null || _a === void 0 ? void 0 : _a.reset();
        displayTasks(tasks);
    }
    else {
        alert("Please fill in the title and description");
    }
});
