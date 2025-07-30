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
