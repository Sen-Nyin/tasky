'use: strict';

// ##########################################################

export default class Model {
  constructor() {
    this.tasks = [
      {
        id: 1,
        task: 'test task',
        duedate: '19 Aug 2022',
        project: 'fake project',
        complete: false,
      },
    ];
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
    this._commitChange(this.tasks);
    console.log(id, ' updated');
    console.log(this.tasks);
  }
}
