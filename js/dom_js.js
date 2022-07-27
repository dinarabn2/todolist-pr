class DOM {
    titleSpan(task) {
        const span = document.createElement('span');
        span.classList.add('descr');
        span.innerText = task.attributes.title;
        return span;
    }

    descrSpan(task) {
        const span = document.createElement('span');
        span.classList.add('descr');
        span.innerText = task.attributes.descriptions;
        return span;
    }

    statusSpan(task) {
        const span = document.createElement('span');
        span.classList.add('status');
        span.innerText = task.attributes.status === true ? 'Complete' : 'Uncomplete';
        return span;
    }

    toggleBtn(task) {
        const btn = document.createElement('button');
        btn.classList.add('button');
        btn.innerHTML = '&#10003';
        btn.onclick = toggle(task);
        return btn;
    }

    removeBtn(task) {
        const btn = document.createElement('button');
        btn.classList.add('button');
        btn.innerHTML = 'x';
        btn.onclick = remove(task);
        return btn;
    }

    createItem(task) {
        const item = document.createElement('li');
        item.classList.add('task-item');
        item.innerText = '';
        item.append(this.titleSpan(task));
        item.append(this.descrSpan(task));
        item.append(this.statusSpan(task));
        item.append(this.toggleBtn(task));
        item.append(this.removeBtn(task));
        item.dataset.id = task.id
        return item;
    }

    addItem(tasks) {
        const list = document.querySelector('.main-list');
        const elem = this.createItem(tasks);
        return list.appendChild(elem);
    }

    getElementById(taskId){
        const elem = Array
        .from(document.getElementsByClassName('task-item'))
        .filter(item => item.dataset.id == taskId)[0];
        return elem;
    }

    toggle(task){
        const elem = this.getElementById(task.id);
        const complete = elem.children[2];
        console.log(complete)
        complete.textContent = todoList.formatDate(task.completedAt);
        return elem;
    }

    remove(task){
        const elem = this.getElementById(task.id);
        elem.remove();
        console.log(elem);
        return elem;
    }

    createList(tasks) {
        if (tasks) {
            for (let task of tasks) {
                this.addItem(task);
            }
        }
    }

}