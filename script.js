const todoList = new Todolist('work');
const dom = new DOM;

document.addEventListener("DOMContentLoaded", () => {
    getTodoInLS();
})

function add(){
    const input = document.querySelector('.create-task_input');
    if (input.value) {

        let value = todoList.add(input.value);
        dom.addItem(todoList.tasks);
        addToLS(todoList.tasks);
        input.value = '';
    }
}

function complete(task) {
    return () => {
        todoList.complete(task.id);
        dom.complete(task);
        completeToLS(task.id);
    }
}

function uncomplete(task) {
    return () => {
        todoList.uncomplete(task.id);
        dom.uncomplete(task);
        uncompleteToLS(task.id);
    }
}

function remove(task){
    return () => {
        todoList.remove(task.id);
        dom.remove(task);
        removeToLS(task.id);
    }
}

//localStorage

function putElemInArray () {
    const tasks = [];
    for(let i in {...localStorage}){
        tasks.push(JSON.parse({...localStorage}[i]));
    }
    return tasks;
}

function getTodoInLS() {
    const tasks = putElemInArray();
    for(let i in tasks){ 
        todoList.add(tasks[i].description);
        let elem = todoList.tasks[todoList.tasks.length-1];
        elem.id = tasks[i].id;
        elem.createdAt = tasks[i].createdAt;
        elem.completedAt = tasks[i].completedAt;
        elem.completionHistory = tasks[i].completionHistory;
        dom.addItem(todoList.tasks);
    }
}

function addToLS(tasks) {
    let elem = tasks[tasks.length - 1];
    localStorage.setItem(elem.id, JSON.stringify(elem));
    return localStorage.getItem(elem.id);
}

function completeToLS(id) {
    const taskInLS = JSON.parse(localStorage.getItem(id));
    taskInLS.completedAt = todoList.findTaskById(id).completedAt;
    taskInLS.completionHistory = todoList.findTaskById(id).completionHistory;
    localStorage.setItem(taskInLS.id, JSON.stringify(taskInLS));
    return taskInLS;
}

function uncompleteToLS(id) {
    const taskInLS = JSON.parse(localStorage.getItem(id));
    taskInLS.completedAt = null;
    localStorage.setItem(taskInLS.id, JSON.stringify(taskInLS));
    return taskInLS;
}

function removeToLS(id) {
    const taskInLS = JSON.parse(localStorage.getItem(id));
    localStorage.removeItem(taskInLS.id);
    return taskInLS;
}