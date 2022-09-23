'use: strict';

// ##########################################################

export default class Model {
  constructor() {
    this.tasks = [];
    this.projects = [];
  }

  _changed() {
    // do stuff
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

    // this._changed;
  }
}
