// variables, enums, interfaces
var Status;
(function (Status) {
    Status["TODO"] = "TODO";
    Status["PROGRESS"] = "PROGRESS";
    Status["DONE"] = "DONE";
})(Status || (Status = {}));
var tasks = Array.isArray(JSON.parse(localStorage.getItem("todos") || "[]")) ? JSON.parse(localStorage.getItem("todos") || "[]") : [];
var editElement = document.getElementById("edit-task");
var statusElement = document.getElementById("status-filter");
//functions
var debounce = function (callback, delay) {
    var timeoutTimer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutTimer);
        timeoutTimer = setTimeout(function () {
            callback.apply(void 0, args);
        }, delay);
    };
};
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
function renderStatus(elm) {
    if (elm) {
        var selects = "<option value=\"\">Choose status</option>";
        for (var status_1 in Status) {
            selects += "<option value=\"".concat(status_1, "\">").concat(status_1, "</option>");
        }
        elm.innerHTML = selects;
    }
}
function setValue(text, elm) {
    if (elm) {
        elm.value = text;
    }
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
if (editElement) {
    editElement.style.display = "none";
}
// render status filter
renderStatus(statusElement);
// render tasks list
displayTasks(tasks);
// create task
