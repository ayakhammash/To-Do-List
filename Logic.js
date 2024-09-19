document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('addTask').addEventListener('click', addTask);
document.getElementById('clearAll').addEventListener('click', clearAllTasks);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Enter a task.");
        return;
    }

    const tasks = getTasksFromLocalStorage();

    if (tasks.includes(task)) {
        alert("Task already exists.");
        return;
    }

    createTaskElement(task);
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = "";
}

function createTaskElement(task) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${task}</span>
        <div>
            <input type="checkbox" class="complete-checkbox">
            <button class="delete-btn">Delete</button>
        </div>
    `;

    taskList.appendChild(li);

    li.querySelector('.delete-btn').addEventListener('click', function () {
        deleteTask(li, task);
    });

    li.querySelector('.complete-checkbox').addEventListener('change', function () {
        toggleCompleteTask(li);
    });
}

function toggleCompleteTask(taskElement) {
    taskElement.classList.toggle('completed');
}

function deleteTask(taskElement, task) {
    taskElement.remove();

    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAllTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    localStorage.removeItem('tasks');
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => createTaskElement(task));
}
