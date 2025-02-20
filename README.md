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

On load of the URL, the first step to take is adding a task.
Adding a task can be achieved via onClick of the add icon which appears twice on the webpage for ease. Click the add icon button to open the add task modal. Fill in the task details (Task Title, Start Time, End Time) and click Save to submit. The task will then be added to the task list and also saved to local Storage to persist on page refresh.

Click the vertical ellipsis icon on a task to reveal the tooltip, then click "Edit" to open the edit modal. Update the task details and click "Update" to save your changes.
