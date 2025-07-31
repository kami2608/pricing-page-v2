var _a;
var _b, _c;
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
function getInput(field) {
    var inputElement = document.getElementById(field);
    if (inputElement) {
        return inputElement.value;
    }
    else
        return "";
}
function main() {
    var _a, _b, _c;
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
    (_b = document.getElementById("title-filter")) === null || _b === void 0 ? void 0 : _b.addEventListener("input", debounce(function () {
        var title = getInput("title-filter");
        var status = getInput("status-filter");
        var filteredTasks = tasks.filter(function (task) {
            return checkIncludes(task.title, title) &&
                (status !== "" ? task.status === status : true);
        });
        displayTasks(filteredTasks);
    }, 1000));
    (_c = document.getElementById("status-filter")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", function () {
        var title = getInput("title-filter");
        var status = getInput("status-filter");
        var filteredTasks = tasks.filter(function (task) {
            return checkIncludes(task.title, title) &&
                (status !== "" ? task.status === status : true);
        });
        displayTasks(filteredTasks);
    });
}
// main
main();
(_b = document.getElementById("title-filter")) === null || _b === void 0 ? void 0 : _b.addEventListener("input", debounce(function () {
    var title = getInput("title-filter");
    var status = getInput("status-filter");
    var filteredTasks = tasks.filter(function (task) {
        return checkIncludes(task.title, title) &&
            (status !== "" ? task.status === status : true);
    });
    displayTasks(filteredTasks);
}, 1000));
(_c = document.getElementById("status-filter")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", function () {
    var title = getInput("title-filter");
    var status = getInput("status-filter");
    var filteredTasks = tasks.filter(function (task) {
        return checkIncludes(task.title, title) &&
            (status !== "" ? task.status === status : true);
    });
    displayTasks(filteredTasks);
});
