// Cache DOM elements for reuse
const taskModal = document.getElementById("taskModal");
const modalOverlay = document.getElementById("modalOverlay");
const editModal = document.getElementById("taskModalEdit");
const editModalOverlay = document.getElementById("editModalOverlay");
const taskGroup = document.querySelector(".tasks-created-group");
const dateTimeElement = document.getElementById("dateTime");

// Event delegation for better performance
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();

  // Use event delegation for form submission
  document.body.addEventListener("submit", (event) => {
    if (event.target.matches("#taskModal form")) {
      event.preventDefault();
      saveTask();
    }
  });

  // Close tooltip menus when clicking outside
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".task-list-right")) {
      document.querySelectorAll(".tooltip-menu").forEach((menu) => menu.style.display = "none");
    }
  });

  // Update date/time immediately and then every second
  updateDateTime();
  setInterval(updateDateTime, 1000);
});

function openModal() {
  taskModal.style.display = "block";
  modalOverlay.style.display = "block";
}

function closeModal() {
  taskModal.style.display = "none";
  modalOverlay.style.display = "none";
}

function saveTask() {
  const taskTitle = document.getElementById("taskTitle").value.trim();
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  if (!taskTitle || !startTime || !endTime) {
    alert("Please fill in all fields.");
    return;
  }

  const task = {
    id: Date.now(),
    title: taskTitle,
    time: `${startTime} - ${endTime}`,
    completed: false,
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  addTaskToDOM(task);
  closeModal();

  // Clear form inputs
  document.getElementById("taskTitle").value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task));
}

function addTaskToDOM(task) {
  const taskHTML = `
    <div class="tasks-created" data-id="${task.id}">
      <div class="random-color"></div>
      <div class="task-list">
        <div class="task-list-left">
          <h3 class="task-title">${task.title}</h3>
          <div class="task-time-group">
            <div class="triple-line">
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
            </div>
            <p class="task-time">${task.time}</p>
          </div>
        </div>
        <div class="task-list-right">
          <div class="vertical-icon" onclick="toggleTooltip(this)">
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
          <div class="tooltip-menu">
            <ul>
              <li class="edit-task" onclick="editTask(this)">Edit</li>
              <li class="delete-task" onclick="deleteTask(${task.id}, this)">Delete</li>
            </ul>
          </div>
          <label class="task-checkbox-label">
            <input
              type="checkbox"
              class="task-checkbox"
              onclick="toggleTaskCompletion(${task.id}, this)"
              ${task.completed ? "checked disabled" : ""}
            />
            <span class="custom-checkbox"></span>
          </label>
        </div>
      </div>
    </div>
  `;
  taskGroup.insertAdjacentHTML("beforeend", taskHTML);

  if (task.completed) {
    markTaskAsCompleted(task.id);
  }
}

let editingTaskId = null;

function openEditModal() {
  editModal.style.display = "block";
  editModalOverlay.style.display = "block";
}

function closeEditModal() {
  editModal.style.display = "none";
  editModalOverlay.style.display = "none";
  editingTaskId = null;

  // Clear edit modal fields
  document.getElementById("editTaskTitle").value = "";
  document.getElementById("editStartTime").value = "";
  document.getElementById("editEndTime").value = "";
}

function editTask(element) {
    const taskElement = element.closest(".tasks-created");
    const taskId = parseInt(taskElement.dataset.id, 10);
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = tasks.find((task) => task.id === taskId);

    if (!taskToEdit) return;

    // Extract startTime and endTime from the task's time property
    const [start, end] = taskToEdit.time.split(" - ").map((time) => time.trim());

    // Pre-fill the edit modal fields
    document.getElementById("editTaskTitle").value = taskToEdit.title;
    document.getElementById("editStartTime").value = start; // Pre-fill startTime
    document.getElementById("editEndTime").value = end; // Pre-fill endTime

    editingTaskId = taskId;
    openEditModal();
  }

function saveEditTask() {
  const updatedTitle = document.getElementById("editTaskTitle").value;
  const updatedStartTime = document.getElementById("editStartTime").value;
  const updatedEndTime = document.getElementById("editEndTime").value;
  const updatedTime = `${updatedStartTime} - ${updatedEndTime}`;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) =>
    task.id === editingTaskId
      ? { ...task, title: updatedTitle, time: updatedTime }
      : task
  );

  localStorage.setItem("tasks", JSON.stringify(tasks));

  const taskElement = document.querySelector(`.tasks-created[data-id="${editingTaskId}"]`);
  if (taskElement) {
    taskElement.querySelector(".task-title").innerText = updatedTitle;
    taskElement.querySelector(".task-time").innerText = updatedTime;
  }

  closeEditModal();
}

function deleteTask(taskId, element) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  element.closest(".tasks-created").remove();
}

function toggleTaskCompletion(taskId, checkbox) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: checkbox.checked } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const taskElement = document.querySelector(`.tasks-created[data-id="${taskId}"]`);
  if (taskElement) {
    const randomColorElement = taskElement.querySelector(".random-color");
    if (checkbox.checked) {
      randomColorElement.classList.add("completed-task");
      randomColorElement.textContent = "Completed";
      checkbox.disabled = true;
    } else {
      randomColorElement.classList.remove("completed-task");
      randomColorElement.textContent = "";
      checkbox.disabled = false;
    }
  }
}

function toggleTooltip(icon) {
  const tooltipMenu = icon.nextElementSibling;
  document.querySelectorAll(".tooltip-menu").forEach((menu) => {
    if (menu !== tooltipMenu) {
      menu.style.display = "none";
    }
  });
  tooltipMenu.style.display = tooltipMenu.style.display === "block" ? "none" : "block";
}

function formatTimeForInput(timeStr) {
  const match = timeStr.match(/(\d+):(\d+)(AM|PM)/);
  if (!match) return "";
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3];
  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;
  return `${hours.toString().padStart(2, "0")}:${minutes}`;
}

function formatTimeForDisplay(timeStr) {
  let [hours, minutes] = timeStr.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  return `${hours}:${minutes.toString().padStart(2, "0")}${period}`;
}

function markTaskAsCompleted(taskId) {
  const taskElement = document.querySelector(`.tasks-created[data-id="${taskId}"]`);
  if (taskElement) {
    const randomColorElement = taskElement.querySelector(".random-color");
    randomColorElement.classList.add("completed-task");
    randomColorElement.textContent = "Completed";
    const checkbox = taskElement.querySelector(".task-checkbox");
    if (checkbox) {
      checkbox.checked = true;
      checkbox.disabled = true;
    }
  }
}

function updateDateTime() {
  dateTimeElement.textContent = new Date().toLocaleString();
}
