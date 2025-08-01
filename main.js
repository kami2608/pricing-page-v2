var _a;
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
var editStatusElm = document.getElementById("edit-status");
var editTitleElm = document.getElementById("edit-title");
var editDescElm = document.getElementById("edit-description");
var cancelBtn = document.getElementById("cancel-button");
var editForm = document.getElementById("edit-form");
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
function deleteTask(id) {
    var index = tasks.findIndex(function (task) { return task.id === id; });
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    displayTasks(tasks);
    localStorage.setItem("todos", JSON.stringify(tasks));
}
function setValue(text, elm) {
    if (elm) {
        elm.value = text;
    }
}
function handleEditForm(task) {
    editForm.addEventListener("submit", function () {
        var editedTask = {
            id: task.id,
            title: editTitleElm.value,
            description: editDescElm.value,
            status: editStatusElm.value,
            createdAt: task.createdAt,
            updatedAt: new Date().toLocaleString("vi-VN"),
        };
        deleteTask(task.id);
        tasks.unshift(editedTask);
        displayTasks(tasks);
        localStorage.setItem("todos", JSON.stringify(tasks));
        editElement.style.display = "none";
    });
    cancelBtn.addEventListener("click", function () {
        editElement.style.display = "none";
    });
}
function editTask(id) {
    if (editElement) {
        renderStatus(editStatusElm);
        editElement.style.display = "block";
        var task = void 0;
        for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
            var tmp = tasks_1[_i];
            if (tmp.id === id) {
                task = tmp;
                break;
            }
        }
        if (task) {
            setValue(task.title, editTitleElm);
            setValue(task.description, editDescElm);
            editStatusElm.value = task.status;
            handleEditForm(task);
        }
    }
}
function getInput(field) {
    var inputElement = document.getElementById(field);
    if (inputElement) {
        return inputElement.value;
    }
    return "";
}
function main() {
    var _a;
    getTaskListFromLocalStorage();
    if (editElement) {
        editElement.style.display = "none";
    }
    renderStatus(statusElement);
    displayTasks(tasks);
    (_a = document.getElementById("add-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function () {
        var _a;
        var title = getInput("title");
        var description = getInput("description");
        if (title && description) {
            var task = {
                id: new Date().getTime(),
                title: title,
                description: description,
                status: statusObject[Status.TODO],
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
}
// main
main();
