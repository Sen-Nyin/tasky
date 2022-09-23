'use: strict';

// ##########################################################

export default class Model {
  constructor() {
    this.tasks = [];
    this.projects = [];
  }

  eventOnChange(handler) {
    this.onChange = handler;
  }
  _commitChange(tasks) {
    this.onChange(tasks);
  }

  addTask(taskDetails) {
    const task = {
      id: this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1,
      task: taskDetails.title,
      duedate: taskDetails.date,
      project: taskDetails.project,
      complete: false,
    };
    this.tasks.push(task);

    this._commitChange(this.tasks);
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    this._commitChange(this.tasks);
  }
}
