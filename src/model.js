'use: strict';

// ####################[ IMPORTS ]####################

// ###################[END IMPORTS]###################

// ######################[ MODEL ]####################
// Controls data
//
// ###################################################

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
  addTaskProject(details, type) {
    if (type === 'task') {
      const task = {
        id:
          this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
        task: details.title,
        duedate: details.date,
        project: details.project,
        complete: false,
      };
      this.tasks.push(task);
      this._commitTaskChange(this.tasks);
    } else if (type === 'project') {
      const project = {
        id:
          this.projects.length > 0
            ? this.projects[this.projects.length - 1].id + 1
            : 1,
        name: details,
      };
      this.projects.push(project);
    }
  }
  editTask(id) {
    // stuff
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

  deleteProject(id) {
    const toDelete = this.projects.filter((project) => project.id === id);
    this.tasks = this.tasks.map((task) =>
      task.project === toDelete[0].name
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
