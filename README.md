# PROJECT TITLE

The title of this project is Daily Task Manager App

# PROJECT DESCRIPTION

The Daily Task Manager App is a simple web-based application that allows users to manage their daily tasks. With an intuitive interface, users can add new tasks with reference to time, edit existing ones, delete tasks, and mark tasks as completed. The app uses modals for both adding and editing tasks, employs SweetAlert2 for error notifications, and leverages localStorage to persist data across browser sessions.

# FEATURES IMPLEMENTED

- Add Task:
  Create new tasks with a title, start time, and end time via a dedicated modal.

- Edit Task:
  Update existing tasks using a separate modal designed for editing. Task data is pre-loaded for easy modification.

- Delete Task:
  Remove tasks from the list. Tasks are deleted from both the UI and localStorage.

- Mark as Completed:
  Mark tasks as completed with a checkbox. Once completed, the checkbox becomes disabled, and the task status is visually updated.

- Persistent Data:
  Tasks are stored in localStorage, ensuring that changes persist even after a page refresh.

- User-Friendly Alerts:
  SweetAlert2 is used to display error alerts when required fields are missing.

# HOW TO RUN THE PROJECT
- Step 1: Prerequisites
This project uses only HTML, CSS, and JavaScript, so no special software or libraries are required. However, ensure you have the following:

- A modern web browser (e.g., Chrome, Firefox, Edge, Safari).
- A code editor (e.g., VS Code, Sublime Text) for making changes if needed.

- Step 2: Clone the Repository
To get started, clone the project repository from GitHub using the following command:

git clone https://github.com/ojogoddy/Daily-Task-Manager.git

Since this is a static website, you don’t need to install any dependencies or run a server. Simply open the index.html file

- Option 1 : Double-click the index.html file in your file explorer to open it directly in your default browser.
- Option 2 : In your preferred code editor right-click the index.html file and select open with the "Live Server" extension.

- step 3: Explore the Features
Once the project is running, you can:

Add new tasks by clicking the "Add icon" button and filling out the modal form.
Edit existing tasks by clicking the "Edit" option in the task's tooltip that appears on click of the vertical ecllipse.
Delete tasks using the "Delete" option in the task's dropdown menu.
Mark tasks as completed using the checkbox.
