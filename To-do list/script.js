const listContainer = document.getElementById('list-container');
const inputBox = document.getElementById('input-box');

function addTask() {
  if (inputBox.value.trim() === '') {
    alert('Please enter a task');
    return;
  }

  let li = document.createElement('li');

  let checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.className = 'task-checkbox';

  let div = document.createElement('div');
  div.className = 'task-content';
  div.innerHTML = inputBox.value;

  let span = document.createElement('span');
  span.innerHTML = '\u00d7';
  
  li.appendChild(checkBox);  // Checkbox comes first
  li.appendChild(div);
  li.appendChild(span);
  listContainer.appendChild(li);

  inputBox.value = '';
  saveTask();
}

listContainer.addEventListener('click', function(e) {
  if (e.target.type === 'checkbox') {
    e.target.parentElement.classList.toggle('checked'); 
    saveTask();
  } else if (e.target.tagName === 'SPAN') {
    e.target.parentElement.remove();
    saveTask();
  }
});

function saveTask() {
  let tasks = [];
  document.querySelectorAll("#list-container li").forEach(li => {
    tasks.push({
      checked: li.querySelector(".task-checkbox").checked,
      text: li.querySelector(".task-content").innerText
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  listContainer.innerHTML = ""; 

  savedTasks.forEach(task => {
    let li = document.createElement('li');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'task-checkbox';
    checkBox.checked = task.checked;

    let div = document.createElement('div');
    div.className = 'task-content';
    div.innerText = task.text;

    let span = document.createElement('span');
    span.innerHTML = '\u00d7';

    li.appendChild(checkBox);
    li.appendChild(div);
    li.appendChild(span);
    listContainer.appendChild(li);
  });
}

loadTasks();
