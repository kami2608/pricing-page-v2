var _a, _b, _c;
// variables, enums, interfaces
var Status;
(function (Status) {
    Status["TODO"] = "TODO";
    Status["PROGRESS"] = "PROGRESS";
    Status["DONE"] = "DONE";
})(Status || (Status = {}));
var tasks = JSON.parse(localStorage.getItem("todos") || "[]");
//functions
function displayTasks(tasks) {
    var todoTable = document.getElementById("todolist");
    if (todoTable && Array.isArray(tasks)) {
        var rows_1 = "";
        tasks.forEach(function (task) {
            rows_1 += "\n      <tr>\n        <td>".concat(task.id, "</td>\n        <td>").concat(task.title, "</td>\n        <td>").concat(task.description, "</td>\n        <td>").concat(task.status, "</td>\n        <td>").concat(task.createdAt, "</td>\n        <td>").concat(task.updatedAt, "</td>\n        <td><button onclick=\"editTask(").concat(task.id, ")\">Edit</button></td>\n        <td><button onclick=\"deleteTask(").concat(task.id, ")\">Delete</button></td>\n      </tr>\n    ");
        });
        todoTable.innerHTML = rows_1;
    }
}
function deleteTask(id) { }
function editTask(id) { }
function getInput(field) {
    var inputElement = document.getElementById(field);
    if (inputElement) {
        return inputElement.value;
    }
    else
        return "";
}
function checkIncludes(str, searchStr) {
    var tmpStr = str.toLowerCase();
    var tmpSearchStr = searchStr.toLowerCase();
    var len = str.length;
    if (searchStr.length === 0)
        return true;
    if (searchStr.length > len)
        return false;
    for (var i = 0; i <= len - searchStr.length; i++) {
        if (tmpStr.substring(i, i + searchStr.length) === tmpSearchStr) {
            return true;
        }
    }
    return false;
}
// main
// render status filter
var statusElement = document.getElementById("status-filter");
if (statusElement) {
    var selects = "";
    for (var status_1 in Status) {
        selects += "<option value=\"".concat(status_1, "\">").concat(status_1, "</option>");
    }
    statusElement.innerHTML = selects;
}
// render tasks list
displayTasks(tasks);
// create task
(_a = document.getElementById("add-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function () {
    var _a;
    var title = getInput("title");
    var description = getInput("description");
    if (title && description) {
        var task = {
            id: new Date().getTime(),
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
        displayTasks(tasks);
    }
    else {
        alert("Please fill in the title and description");
    }
});
(_b = document.getElementById("title-filter")) === null || _b === void 0 ? void 0 : _b.addEventListener("input", function () {
    var title = getInput("title-filter");
    var status = getInput("status-filter");
    var filteredTasks = tasks.filter(function (task) { return checkIncludes(task.title, title) && task.status === status; });
    displayTasks(filteredTasks);
});
(_c = document.getElementById("status-filter")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", function () {
    var title = getInput("title-filter");
    var status = getInput("status-filter");
    var filteredTasks = tasks.filter(function (task) { return checkIncludes(task.title, title) && task.status === status; });
    displayTasks(filteredTasks);
});
