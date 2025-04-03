document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
      taskList.innerHTML = "<p>No tasks yet.</p>";
      return;
    }

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task";
      if (task.completed) {
        li.classList.add("completed");
      }

      li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <input type="checkbox" ${task.completed ? "checked" : ""}>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

      const checkbox = li.querySelector("input");
      checkbox.addEventListener("change", function () {
        task.completed = this.checked;
        saveTasks();
        displayTasks();
      });

      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function () {
        tasks = tasks.filter((t) => t.id !== task.id);
        saveTasks();
        displayTasks();
      });

      taskList.appendChild(li);
    });
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  addBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({
        id: Date.now(),
        text: text,
        completed: false,
      });
      saveTasks();
      displayTasks();
      taskInput.value = "";
    }
  });

  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });

  displayTasks();
});
