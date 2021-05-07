/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable max-lines-per-function */
import { deleteTask, getAllTasks, postTask, putTask } from './api';

const incompleteTasksHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

init();

function init() {
  setAddTaskEventListener();
  getInitialData();
}

function setAddTaskEventListener() {
  const addButton = document.getElementsByTagName('button')[0];
  addButton.addEventListener('click', addTask);
}
function getInitialData() {
  getAllTasks().then(tasks => {
    appendTasksElements(tasks);
    bindEventsOfIncompletedTaskElements();
    bindEventsOfCompletedTaskElements();
  });
}
function appendTasksElements(tasks: any) {
  tasks.forEach(task => {
    appendTaskElement(task);
  });
}

function bindEventsOfIncompletedTaskElements() {
  for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindEventsOfTaskElements(incompleteTasksHolder.children[i], markTaskCompleted);
  }
}
function bindEventsOfCompletedTaskElements() {
  for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindEventsOfTaskElements(completedTasksHolder.children[i], markTaskIncomplete);
  }
}

function addTask() {
  console.log('Adding Task...');
  const taskInput = document.getElementById('new-task') as HTMLInputElement;
  const taskDescription = taskInput.value;
  const newTask = { description: taskDescription, completed: false };
  taskInput.value = '';
  postTask(newTask).then(task => appendTaskElement(task));
}
function appendTaskElement(task) {
  const taskListItem = createNewTaskElement(task);
  if (task.completed) {
    completedTasksHolder.appendChild(taskListItem);
    bindEventsOfTaskElements(taskListItem, markTaskIncomplete);
  } else {
    incompleteTasksHolder.appendChild(taskListItem);
    bindEventsOfTaskElements(taskListItem, markTaskCompleted);
  }
}
function createNewTaskElement(task) {
  const completedCheckBox = document.createElement('input');
  completedCheckBox.type = 'checkBox';
  completedCheckBox.checked = task.completed;

  const descriptionLabel = document.createElement('label');
  descriptionLabel.innerText = task.description;

  const descriptionInput = document.createElement('input');
  descriptionInput.type = 'text';

  const editButton = document.createElement('button');
  editButton.innerText = '🖊 Edit';
  editButton.className = 'edit';

  const deleteButton = document.createElement('button');
  deleteButton.innerText = '🗑 Delete';
  deleteButton.className = 'delete';

  const taskListItem = document.createElement('li');
  taskListItem.id = task.id;
  taskListItem.dataset.owner = task.owner;
  taskListItem.appendChild(completedCheckBox);
  taskListItem.appendChild(descriptionLabel);
  taskListItem.appendChild(descriptionInput);
  taskListItem.appendChild(editButton);
  taskListItem.appendChild(deleteButton);
  return taskListItem;
}

function editTask() {
  console.log('Editing Task...');
  const taskListItem = this.parentNode;
  const descriptionInput = taskListItem.querySelector('input[type=text]');
  const descriptionLabel = taskListItem.querySelector('label');
  const isInEditMode = taskListItem.classList.contains('editMode');
  if (isInEditMode) {
    saveEditedTask(taskListItem, descriptionInput, descriptionLabel);
  } else {
    prepareTaskForEdition(descriptionInput, descriptionLabel);
  }
  taskListItem.classList.toggle('editMode');
}
function prepareTaskForEdition(descriptionInput, descriptionLabel) {
  descriptionInput.value = descriptionLabel.innerText;
}
function saveEditedTask(taskListItem, descriptionInput, descriptionLabel) {
  const completedCheckBox = taskListItem.querySelector('input[type="checkbox"]');
  const editedTask = {
    id: taskListItem.id,
    completed: completedCheckBox.checked,
    description: descriptionInput.value,
    owner: taskListItem.dataset.owner,
  };
  putTask(editedTask).then(() => {
    descriptionLabel.innerText = descriptionInput.value;
  });
}

function markTaskCompleted() {
  const taskListItem = this.parentNode;
  const descriptionLabel = taskListItem.querySelector('label');
  const editedTask = {
    id: taskListItem.id,
    completed: true,
    description: descriptionLabel.value,
    owner: taskListItem.dataset.owner,
  };
  console.log('Task Complete...', editedTask);
  putTask(editedTask).then(() => {
    completedTasksHolder.appendChild(taskListItem);
    bindEventsOfTaskElements(taskListItem, markTaskIncomplete);
  });
}

function markTaskIncomplete() {
  const taskListItem = this.parentNode;
  const descriptionLabel = taskListItem.querySelector('label');
  const editedTask = {
    id: taskListItem.id,
    completed: false,
    description: descriptionLabel.value,
    owner: taskListItem.dataset.owner,
  };
  console.log('Task Incomplete...', editedTask);
  putTask(editedTask).then(() => {
    incompleteTasksHolder.appendChild(taskListItem);
    bindEventsOfTaskElements(taskListItem, markTaskCompleted);
  });
}

function removeTask() {
  console.log('Removing Task...');
  const taskListItem = this.parentNode;
  deleteTask(taskListItem.id).then(() => {
    const tasksListItems = taskListItem.parentNode;
    tasksListItems.removeChild(taskListItem);
  });
}

function bindEventsOfTaskElements(taskListItem, checkBoxEventHandler) {
  console.log('Binding List item events');
  const completedCheckBox = taskListItem.querySelector('input[type="checkbox"]');
  completedCheckBox.onchange = checkBoxEventHandler;
  const editButton = taskListItem.querySelector('button.edit');
  editButton.onclick = editTask;
  const deleteButton = taskListItem.querySelector('button.delete');
  deleteButton.onclick = removeTask;
}
