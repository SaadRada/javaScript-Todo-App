let tasks = document.querySelectorAll(".task");
let taskList = document.querySelector(".taskList");

let arrayOfTasks = [];

if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    setDataToHtmlPage(arrayOfTasks);
}

tasks.forEach(task => {
    task.onclick = () => {
        task.classList.toggle("done");
    }
})

let input = document.querySelector(".input");
let btn = document.querySelector(".btn");

btn.onclick = () => {
    if(input.value !== ""){
        addTaskToArray(input.value)
        input.value = "";
    }
}

function addTaskToArray(taskValue){
    const task = {
        "id": Date.now(),
        "content": taskValue,
        "completed": false
    }
    arrayOfTasks.push(task);
    setDataToHtmlPage(arrayOfTasks);
}

function setDataToHtmlPage(arrayOfTasks){
    taskList.innerHTML = "";
    arrayOfTasks.forEach(task =>{
        let div = document.createElement("div");
        div.className = "task";

        if(task.completed == true){
            div.className = "task done";
        }

        div.setAttribute("data-id",task.id);

        let h2 = document.createElement("h2");
        h2.appendChild(document.createTextNode(task.content));
        h2.className = "taskContent";

        let span = document.createElement("span");
        span.className = "trash";

        let img = document.createElement("img");
        img.setAttribute("src","imgs/trash.svg");
        img.setAttribute("height","15px");
        img.setAttribute("width","15px");
        img.className = "del";
        span.appendChild(img);

        h2.appendChild(span);
        div.appendChild(h2);


        taskList.appendChild(div);
        addArrayDataToLocalStorage(JSON.stringify(arrayOfTasks))
    })
}

function addArrayDataToLocalStorage(arrayOfTasksData){
    window.localStorage.setItem("tasks",arrayOfTasksData);
}

taskList.addEventListener("click",(e) => {
    if(e.target.classList.contains("del")){
        e.target.parentElement.parentElement.parentElement.remove();

        deleteTaskFromArray(e.target.parentElement.parentElement.parentElement.getAttribute("data-id"));
    }

    if(e.target.classList.contains("taskContent")){
        e.target.parentElement.classList.toggle("done");
        updateStatus(e.target.parentElement.getAttribute("data-id"));
    }

    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done");
        updateStatus(e.target.getAttribute("data-id"));
    }
    
})

function deleteTaskFromArray(taskId){
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addArrayDataToLocalStorage(JSON.stringify(arrayOfTasks));
}

function updateStatus(taskId){
    arrayOfTasks.forEach(task => {
        if(task.id == taskId){
            task.completed == false ? (task.completed = true) : (task.completed = false);
        }

        addArrayDataToLocalStorage(JSON.stringify(arrayOfTasks));
    })
}