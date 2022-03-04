/* Start Global Variables */
const mainPage = document.querySelector(".container");
const darkButton = document.querySelector(".dark-button");
const lightButton = document.querySelector(".light-button");
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
/* End Global Variables */

// Change Theme Function
const changeTheme = () => {
    darkButton.addEventListener("click", () => {
        mainPage.classList.add("dark-theme");
        mainPage.classList.remove("light-theme");
    });
    lightButton.addEventListener("click", () => {
        mainPage.classList.add("light-theme");
        mainPage.classList.remove("dark-theme");
    });
};
changeTheme();

// Empty Array For Tasks
let arrayOfTasks = [];

// Check if Local Storage has Tasks
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// Start Get Data From Local Storage function
getDataFromLocalStorage();

// Add Task
submit.addEventListener("click", () => {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array of tasks
        input.value = ""; // Clear Input Field
    }
});

// Update Task Element or Delete
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element from page
        e.target.parentElement.remove();
    }
    // Task Element
    if (e.target.classList.contains("task")) {
        // Toggle Completed task
        toggleTaskStatusWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
});

function addTaskToArray(taskText) {
    // Task Data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    //Add Task to Array
    arrayOfTasks.push(task);
    // Add Tasks to page
    addElementsToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLocalStorageFrom(arrayOfTasks);
    // For Testing
    /*  console.log(arrayOfTasks);
    console.log(JSON.stringify(arrayOfTasks)); */
}

function addElementsToPageFrom(arrayOfTasks) {
    // Empty Tasks Div
    tasksDiv.innerHTML = "";
    // Loop through Array of tasks
    arrayOfTasks.forEach((task) => {
        // Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        // Check if task is done
        if (task.completed === true) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        let taskTextDiv = document.createElement("div");
        taskTextDiv.appendChild(document.createTextNode(task.title));
        div.appendChild(taskTextDiv);
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("X"));
        div.appendChild(span);
        // Add Task Div to Page
        tasksDiv.appendChild(div);
    });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId) {
    //For Testing
    /* for (let i = 0; i < arrayOfTasks.length; i++) {
        console.log(`${arrayOfTasks[i].id} === ${taskId}`);
    } */
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}
function toggleTaskStatusWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        /*   console.log(`${arrayOfTasks[i].id}`); */

        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false
                ? (arrayOfTasks[i].completed = true)
                : (arrayOfTasks[i].completed = false);
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}
