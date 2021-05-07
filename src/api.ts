const url = 'https://api-base-21.herokuapp.com/api/pub/tasks/';

export { getAllTasks, getTask, postTask, putTask, deleteTask };

function getAllTasks() {
  const request = createRequest(url, 'GET');
  return fetch(request).then(res => getListOrEmpty(res));
}

function getTask(task_id) {
  const request = createRequest(url + task_id, 'GET');
  return fetch(request).then(res => getObjectOrEmpty(res));
}

function postTask(task) {
  const request = createRequest(url, 'POST', task);
  return fetch(request).then(res => res.json());
}

function putTask(task) {
  const request = createRequest(url + task._id, 'PUT', task);
  return fetch(request).then(res => res.json());
}

function deleteTask(task_id) {
  const request = createRequest(url + task_id, 'DELETE');
  return fetch(request);
}

function createRequest(url, method, payload) {
  const request = new Request(url, {
    method: method,
    body: payload ? JSON.stringify(payload) : null,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  });
  return request;
}

function getListOrEmpty(res) {
  if (res.status === 200) {
    return res.json();
  } else {
    return [];
  }
}
function getObjectOrEmpty(res) {
  if (res.status === 200) {
    return res.json();
  } else {
    return {};
  }
}
