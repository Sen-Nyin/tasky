'use: strict';

// ##########################################################

export default class View {
  constructor() {
    this.elementNavContainer = this.findEle('[data-label="navcontainer"]');
    this.elementNavbar = this.findEle('[data-label="navbar"]');
    this.buttonNewTask = this.findEle('[data-label="addTaskMain"]');
    this.buttonBurger = this.findEle('[data-label="navtoggle"]');
    this.labelTaskListHeading = this.findEle('[data-label="tasklistHeading"]');
    this.tasklist = this.findEle('[data-label="tasklist"]');
    this.buttonCloseModal = this.findEle('#close-modal');
    this.elementModal = this.findEle('[data-label="modal"]');
    this.buttonFormSubmit = this.findEle('[data-label="addtask"]');
    this.formNewTask = this.findEle('[data-label="new-task-form"]');
    this.inputNewTaskTitle = this.findEle('[data-label="modal-task-title"]');
    this.inputNewTaskDate = this.findEle('[data-label="modal-task-date"]');
    this.inputNewTaskProject = this.findEle(
      '[data-label="modal-task-project"]'
    );

    // ##########[ Immediate Calls ]##########
    this.eventToggleNav();
    this.eventCloseModal();
    this.eventNewTask();
  }
  get _taskDetails() {
    if (
      this.inputNewTaskTitle.value &&
      this.inputNewTaskDate.value &&
      this.inputNewTaskProject.value
    ) {
      return {
        title: this.inputNewTaskTitle.value,
        date: this.inputNewTaskDate.value,
        project: this.inputNewTaskProject.value,
      };
    }
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
  closeModal = () => {
    this.inputNewTaskDate.value = '';
    this.inputNewTaskTitle.value = '';
    this.inputNewTaskProject.value = '';
    this.elementModal.classList.add('hidden');
  };
  // ###############[ HANDLERS ]###############
  // consider combining common event handlers into single functions
  // i.e., eventAddTask and eventAddProject both trigger on submit event
  // ##########################################
  eventCloseModal() {
    this.buttonCloseModal.addEventListener('click', (e) => {
      e.preventDefault();
      this.closeModal();
    });
  }
  eventToggleNav() {
    this.buttonBurger.addEventListener('click', (e) => {
      this.elementNavContainer.classList.toggle('nav-hidden');
    });
  }
  eventNewTask() {
    this.buttonNewTask.addEventListener('click', (e) => {
      this.elementModal.classList.toggle('hidden');
    });
  }
  eventAddTask(handler) {
    this.formNewTask.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this._taskDetails) {
        handler(this._taskDetails);
        this.closeModal();
      }
    });
  }
}
