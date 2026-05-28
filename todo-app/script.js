const taskList = document.querySelector("#taskList");

const taskInput = document.querySelector("#taskInput");

const addBtn = document.querySelector("#addBtn");

const loader = document.querySelector("#loader");

const counter = document.querySelector("#taskCounter");

const searchInput = document.querySelector("#searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");

let tasks = [];

let currentFilter = "all";



function showLoader() {
    loader.classList.remove("hidden");
}

function hideLoader() {
    loader.classList.add("hidden");
}



function updateCounter(filteredTasks = tasks) {

    let count = 0;

    if (currentFilter === "completed") {

        count =
            filteredTasks.filter(
                task => task.completed
            ).length;

        counter.textContent =
            `Виконаних задач: ${count}`;

    } else if (currentFilter === "active") {

        count =
            filteredTasks.filter(
                task => !task.completed
            ).length;

        counter.textContent =
            `Активних задач: ${count}`;

    } else {

        count =
            filteredTasks.filter(
                task => !task.completed
            ).length;

        counter.textContent =
            `Активних задач: ${count}`;
    }
}



function createTaskElement(task) {

    const li = document.createElement("li");

    li.classList.add("task-item");

    li.dataset.id = task.id;

    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <input
            type="checkbox"
            class="task-checkbox"
            ${task.completed ? "checked" : ""}
        >

        <span class="task-title">
            ${task.title}
        </span>

        <button class="task-delete">
            Видалити
        </button>
    `;

    return li;
}



function renderTasks(taskArray) {

    taskList.innerHTML = "";

    taskArray.forEach(task => {

        const element =
            createTaskElement(task);

        taskList.append(element);
    });

    updateCounter(taskArray);
}



async function loadTasks() {

    showLoader();

    try {

        const response =
            await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=20"
            );

        if (!response.ok) {
            throw new Error("Помилка");
        }

        tasks = await response.json();

        renderTasks(tasks);

    } catch (error) {

        alert(
            "Не вдалося завантажити задачі"
        );

        console.error(error);

    } finally {

        hideLoader();
    }
}



async function addTask(title) {

    showLoader();

    try {

        const response =
            await fetch(
                "https://jsonplaceholder.typicode.com/todos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        title,
                        completed: false,
                        userId: 1
                    })
                }
            );

        const newTask =
            await response.json();

        tasks.unshift(newTask);

        renderTasks(tasks);

        taskInput.value = "";

        addBtn.disabled = true;

    } catch (error) {

        alert(
            "Не вдалося створити задачу"
        );

    } finally {

        hideLoader();
    }
}



async function toggleTask(id, completed) {

    try {

        await fetch(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    completed
                })
            }
        );

        tasks = tasks.map(task =>
            task.id === id
                ? { ...task, completed }
                : task
        );

        applyFilters();

    } catch (error) {

        alert(
            "Не вдалося оновити задачу"
        );
    }
}


async function deleteTask(id) {

    try {

        await fetch(
            `https://jsonplaceholder.typicode.com/todos/${id}`,
            {
                method: "DELETE"
            }
        );

        tasks =
            tasks.filter(task => task.id !== id);

        applyFilters();

    } catch (error) {

        alert(
            "Не вдалося видалити задачу"
        );
    }
}



function applyFilters() {

    let filtered = [...tasks];

    if (currentFilter === "active") {

        filtered =
            filtered.filter(
                task => !task.completed
            );
    }

    if (currentFilter === "completed") {

        filtered =
            filtered.filter(
                task => task.completed
            );
    }

    const searchValue =
        searchInput.value.toLowerCase();

    filtered =
        filtered.filter(task =>
            task.title
                .toLowerCase()
                .includes(searchValue)
        );

    renderTasks(filtered);
}



function debounce(func, delay) {

    let timeoutId;

    return (...args) => {

        clearTimeout(timeoutId);

        timeoutId =
            setTimeout(
                () => func(...args),
                delay
            );
    };
}



addBtn.addEventListener("click", () => {

    const title =
        taskInput.value.trim();

    if (!title) return;

    addTask(title);
});

taskInput.addEventListener("input", () => {

    addBtn.disabled =
        !taskInput.value.trim();
});

taskInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        addBtn.click();
    }

    if (event.key === "Escape") {

        taskInput.value = "";

        addBtn.disabled = true;
    }
});



taskList.addEventListener("click", event => {

    const taskItem =
        event.target.closest(".task-item");

    if (!taskItem) return;

    const id =
        Number(taskItem.dataset.id);

    if (
        event.target.classList.contains(
            "task-delete"
        )
    ) {

        deleteTask(id);
    }

    if (
        event.target.classList.contains(
            "task-checkbox"
        )
    ) {

        toggleTask(
            id,
            event.target.checked
        );
    }
});



searchInput.addEventListener(
    "input",

    debounce(() => {
        applyFilters();
    }, 300)
);



filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        currentFilter =
            button.dataset.filter;

        applyFilters();
    });
});



addBtn.disabled = true;

loadTasks();