const todoList = new Todolist('work');
const dom = new DOM;

const titleInput = document.querySelector('input[name="title"]'),
      descriptionsInput =  document.querySelector('input[name="descr"]');

const accessToken = localStorage.getItem('access');

//get

const getTodo = async (accessToken) => {
    const todo = await fetch("http://internstemp.evrika.com/api/todo/", {
        headers: {
            "Content-Type": "application/vnd.api+json",
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const data = await todo.json()
    return data
}

document.addEventListener("DOMContentLoaded", async () => {
    const todo = await getTodo(accessToken);
    dom.createList(todo.data);
})

//post

async function postTodo(todo, accessToken) {
    
    const data = await fetch("http://internstemp.evrika.com/api/todo/create/", {
        method: 'POST',
        headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            "data": {
                "type": "PostCreateView",
                "attributes": {
                    title: todo.attributes.title,
                    descriptions: todo.attributes.descriptions,
                    status: todo.attributes.status
                },
                "relationships": {
                    "user": {
                      "data": {
                        "id": parseJwtToUserId(accessToken),
                        "type": "User"
                      }
                    }
                }
            }
        })
    })

    return data
}

function parseJwtToUserId(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    const result = JSON.parse(jsonPayload);
    return result.user_id.toString()
}

async function addTask(){
    const inputValue = {
        attributes : {
            title: document.querySelector('input[name="title"]').value,
            descriptions:  document.querySelector('input[name="descr"]').value,
            status: document.querySelector('input[name="check"]').checked
        }
    }
    if (inputValue.attributes.title && inputValue.attributes.descriptions) {
        await postTodo(inputValue, accessToken);
        dom.addItem(inputValue);
        titleInput.value = '';
        descriptionsInput.value = '';
    }
}

//remove

async function removeTodo(id, accessToken) {
    const data = await fetch(`http://internstemp.evrika.com/api/todo/delete/${id}/`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${accessToken}`
        }
    })

    return data
}

function remove(task){
    return () => {
        console.log(task)
        removeTodo(task.id, accessToken);
        dom.remove(task);
    }
}

//toggle

async function toggleTodo(id, status, accessToken) {
    const response = await fetch('http://internstemp.evrika.com/api/todo/update/', {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/vnd.api+json",
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            "data": {
                "type": "PostUpdateAPIView",
                id: id,
                "attributes": {
                    "status": !status
                }
            }
        })
    })
    return response
}

function toggle(task){
    return () => {
        console.log(task)        
        toggleTodo(task.id, task.attributes.status, accessToken)
        const text = task.attributes.status !== true ? 'Complete' : 'Uncomplete'
        dom.getElementById(task.id).children[2].innerText = text
        task.attributes.status = !task.attributes.status
    }
}
const logout = document.querySelectorAll('.logout');

logout.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        window.location.href = 'authorization.html';
        if (localStorage.getItem('access', 'refresh')) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        }
    })
})

