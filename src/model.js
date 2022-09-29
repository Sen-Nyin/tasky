'use: strict';

// ######################[ MODEL ]####################

export default class Model {
  constructor() {
    this.tasks = [];
    this.projects = [{ id: 1, name: 'uncategorised' }];
  }

  get _projects() {
    return this.projects;
  }

  getTaskToEdit(id) {
    const edittask = this.tasks.filter((task) => task.id === id);
    return edittask;
  }

  eventOnTaskChange(handler) {
    this.onTaskChange = handler;
  }
  _commitTaskChange(tasks) {
    this.onTaskChange(tasks);
  }
  updateLists(details, type) {
    if (type === 'task') {
      this.addTask(details);
    } else if (type === 'project') {
      this.addProject(details);
    } else if (type === 'edit') {
      this.editTask(details);
    }
  }

  addTask(newTask) {
    const task = {
      id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
      task: newTask.title,
      duedate: newTask.date,
      project: newTask.project,
      complete: false,
    };
    this.tasks.push(task);
    this._commitTaskChange(this.tasks);
  }

  editTask(editedTask) {
    this.tasks = this.tasks.map((task) =>
      task.id === editedTask.id
        ? {
            id: task.id,
            task: editedTask.title,
            duedate: editedTask.date,
            project: editedTask.project,
            complete: task.complete,
          }
        : task
    );
    this._commitTaskChange(this.tasks);
  }
  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this._commitTaskChange(this.tasks);
  }

  completeTask(id) {
    this.tasks = this.tasks.map((task) =>
      task.id === id
        ? {
            id: task.id,
            task: task.task,
            duedate: task.duedate,
            project: task.project,
            complete: !task.complete,
          }
        : task
    );
    this._commitTaskChange(this.tasks);
  }
  addProject(newProject) {
    const project = {
      id:
        this.projects.length > 0
          ? this.projects[this.projects.length - 1].id + 1
          : 1,
      name: newProject,
    };
    this.projects.push(project);
  }
  deleteProject(id) {
    const [toDelete] = this.projects.filter((project) => project.id === id);
    this.tasks = this.tasks.map((task) =>
      task.project === toDelete.name
        ? {
            id: task.id,
            task: task.task,
            duedate: task.duedate,
            project: 'uncategorised',
            complete: task.complete,
          }
        : task
    );
    this.projects = this.projects.filter((project) => project.id !== id);
    this._commitTaskChange(this.tasks);
  }
}
