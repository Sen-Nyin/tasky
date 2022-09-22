'use: strict';

// ##########################################################

export default class View {
  constructor() {
    this.elementNavContainer = this.findEle('[data-label="navcontainer"]');
    this.elementNavbar = this.findEle('[data-label="navbar"]');
    this.buttonAddTaskMain = this.findEle('[data-label="addTaskMain"]');
    this.buttonBurger = this.findEle('[data-label="navtoggle"]');
    this.labelTaskListHeading = this.findEle('[data-label="tasklistHeading"]');
    this.tasklist = this.findEle('[data-label="tasklist"]');
    this.buttonCloseModal = this.findEle('#close-modal');
    this.elementModal = this.findEle('[data-label="modal"]');

    // ##########[ Immediate Calls ]##########
    this.eventToggleNav();
    this.eventCloseModal();
    this.eventNewTask();
  }
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
  clearTasks() {
    while (this.tasklist.firstChild) this.tasklist.firstChild.remove();
  }
  displayTasks(tasks) {
    this.clearTasks();
  }

  // ###############[ HANDLERS ]###############
  // consider combining common event handlers into single functions
  // i.e., eventAddTask and eventAddProject both trigger on submit event
  // ##########################################
  eventCloseModal() {
    this.buttonCloseModal.addEventListener('click', (e) => {
      this.elementModal.classList.add('hidden');
    });
  }
  eventToggleNav() {
    this.buttonBurger.addEventListener('click', (e) => {
      this.elementNavContainer.classList.toggle('nav-hidden');
    });
  }
  eventNewTask() {
    this.buttonAddTaskMain.addEventListener('click', (e) => {
      this.elementModal.classList.toggle('hidden');
    });
  }
  eventAddTask(handler) {}
  eventEditTask(handler) {}
  eventDeleteTask(handler) {}
  eventCompleteTask(handler) {}
  eventAddProject(handler) {}
  eventEditProject(handler) {}
  eventDeleteProject(handler) {}
}
