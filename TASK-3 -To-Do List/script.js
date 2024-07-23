

document.getElementById('add-task-button').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = createTaskElement(taskText, false);
        document.getElementById('pending-tasks').appendChild(task);
        taskInput.value = "";
    }
}

function createTaskElement(taskText, isCompleted) {
    const li = document.createElement('li');
    li.textContent = taskText;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.addEventListener('click', () => editTask(li, taskText));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', () => deleteTask(li));

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    if (!isCompleted) {
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete';
        completeButton.addEventListener('click', () => completeTask(li));
        li.appendChild(completeButton);
    }

    return li;
}

function editTask(taskElement, oldTaskText) {
    const newTaskText = prompt("Edit task:", oldTaskText);
    if (newTaskText) {
        taskElement.childNodes[0].nodeValue = newTaskText;
    }
}

function deleteTask(taskElement) {
    taskElement.parentNode.removeChild(taskElement);
}

function completeTask(taskElement) {
    taskElement.classList.toggle('completed');
    if (taskElement.classList.contains('completed')) {
        const taskText = taskElement.childNodes[0].nodeValue;
        const completedTask = createTaskElement(taskText, true);
        document.getElementById('completed-tasks').appendChild(completedTask);
        deleteTask(taskElement);
    } else {
        document.getElementById('pending-tasks').appendChild(taskElement);
    }
}
