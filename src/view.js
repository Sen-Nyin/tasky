'use: strict';

// ##########################################################

export default class View {
  constructor() {}
  createEle(...args) {
    const [ele, ...styles] = args;
    const element = document.createElement(ele);
    styles.forEach((style) => element.classList.add(style));
    return element;
  }
  findEle(selector) {
    const element = document.querySelector(selector);
    return element;
  }
  clearTasks() {}
  displayTasks(tasks) {
    this.clearTasks();
  }

  // ###############[ HANDLERS ]###############
  // consider combining common event handlers into single functions
  // i.e., eventAddTask and eventAddProject both trigger on submit event
  // ##########################################

  eventAddTask(handler) {}
  eventEditTask(handler) {}
  eventDeleteTask(handler) {}
  eventCompleteTask(handler) {}
  eventAddProject(handler) {}
  eventEditProject(handler) {}
  eventDeleteProject(handler) {}
}
