class DOM {
    descrSpan(task) {
        const span = document.createElement('span');
        span.classList.add('descr');
        span.innerText = task.description;
        return span;
    }

    createdSpan(task) {
        const span = document.createElement('span');
        span.classList.add('created');
        span.innerText = todoList.formatDate(task.createdAt);
        return span;
    }

    completedSpan(task) {
        const span = document.createElement('span');
        span.classList.add('completed');
        span.innerText = todoList.formatDate(task.completedAt);
        return span;
    }

    completeBtn(task) {
        const btn = document.createElement('button');
        btn.classList.add('button');
        btn.innerHTML = '&#10003';
        btn.onclick = complete(task);
        return btn;
    }

    uncompleteBtn(task) {
        const btn = document.createElement('button');
        btn.classList.add('button');
        btn.innerHTML = '&#8249';
        btn.onclick = uncomplete(task);
        return btn;
    }

    removeBtn(task) {
        const btn = document.createElement('button');
        btn.classList.add('button');
        btn.innerHTML = '&times';
        btn.onclick = remove(task);
        return btn;
    }

    createItem(task) {
        const item = document.createElement('li');
        item.classList.add('task-item');
        item.innerText = '';
        item.append(this.descrSpan(task));
        item.append(this.createdSpan(task));
        item.append(this.completedSpan(task));
        item.append(this.completeBtn(task));
        item.append(this.uncompleteBtn(task));
        item.append(this.removeBtn(task));
        item.dataset.id = task.id
        return item;
    }

    addItem(tasks) {
        const list = document.querySelector('.main-list');
        const lastAddedTask = tasks[tasks.length-1];
        const elem = this.createItem(lastAddedTask);
        return list.appendChild(elem);
    }

    getElementById(taskId){
        const elem = Array
        .from(document.getElementsByClassName('task-item'))
        .filter(item => item.dataset.id == taskId)[0];
        return elem;
    }

    complete(task){
        const elem = this.getElementById(task.id);
        const span = document.querySelector('.completed');
        span.innerHTML = todoList.formatDate(task.completedAt);
        return elem;
    }

    uncomplete(task){
        if (this.complete(task)) {
            const elem = this.getElementById(task.id);
            const span = document.querySelector('.completed');
            span.innerHTML = '-';
            return elem;
        }
    } 

    remove(task){
        const listElement = this.getElementById(task.id);
        listElement.remove();
        return listElement;
    }

}