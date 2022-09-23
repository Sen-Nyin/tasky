'use: strict';
import sprite from './assets/sprite.svg';

// ##########################################################

export default class View {
  constructor() {
    this.elementNavContainer = this.findEle('[data-label="navcontainer"]');
    this.elementNavbar = this.findEle('[data-label="navbar"]');
    this.buttonNewTask = this.findEle('[data-label="addTaskMain"]');
    this.buttonBurger = this.findEle('[data-label="navtoggle"]');
    this.labelTaskListHeading = this.findEle('[data-label="tasklistHeading"]');
    this.elementTaskList = this.findEle('[data-label="tasklist"]');
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
  createSVG(...args) {
    const [icon, ...styles] = args;
    const w3ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(w3ns, 'svg');
    const use = document.createElementNS(w3ns, 'use');
    use.setAttribute('href', `${sprite}#icon-${icon}`);
    styles.forEach((style) => svg.classList.add(style));
    svg.append(use);
    return svg;
  }
  findEle(selector) {
    const element = document.querySelector(selector);
    return element;
  }
  clearTasks() {
    while (this.elementTaskList.firstElementChild)
      this.elementTaskList.firstElementChild.remove();
  }
  displayTasks(tasks) {
    this.clearTasks();

    if (!tasks.length) {
      const message = this.createEle(
        'p',
        'font-thin',
        'text-2xl',
        'text-gray-600',
        'text-center',
        'mt-4'
      );
      message.textContent = 'No tasks, go take a walk';
      this.elementTaskList.append(message);
    } else {
      tasks.forEach((task) => {
        const taskElement = this.createEle('li');
        const taskText = this.createEle('span', 'flex-1');
        const taskDate = this.createEle('span');
        const taskProject = this.createEle('span');

        const dateContainer = this.createEle(
          'div',
          'flex',
          'gap-2',
          'items-center'
        );
        const projectContainer = this.createEle(
          'div',
          'flex',
          'gap-2',
          'items-center'
        );
        const deleteButton = this.createEle('button');

        const alarmIcon = this.createSVG('alarm', 'fill-current', 'w-4', 'h-4');
        const labelIcon = this.createSVG('label', 'fill-current', 'w-4', 'h-4');
        const deleteIcon = this.createSVG(
          'delete',
          'fill-current',
          'w-4',
          'h-4'
        );

        taskElement.classList.add('tasklist-item');

        taskElement.dataset.taskid = task.id;
        deleteIcon.dataset.label = 'delete-button';

        taskText.textContent = task.task;
        taskDate.textContent = task.duedate;
        taskProject.textContent = task.project;

        deleteButton.append(deleteIcon);
        dateContainer.append(alarmIcon, taskDate);
        projectContainer.append(labelIcon, taskProject);

        taskElement.append(
          taskText,
          dateContainer,
          projectContainer,
          deleteButton
        );
        this.elementTaskList.append(taskElement);
      });
    }
  }
  toggleModal = () => {
    this.inputNewTaskDate.value = '';
    this.inputNewTaskTitle.value = '';
    this.inputNewTaskProject.value = '';
    this.elementModal.classList.toggle('hidden');
  };
  // ###############[ HANDLERS ]###############
  // consider combining common event handlers into single functions
  // i.e., eventAddTask and eventAddProject both trigger on submit event
  // ##########################################

  eventCloseModal() {
    this.buttonCloseModal.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleModal();
    });
  }
  eventToggleNav() {
    this.buttonBurger.addEventListener('click', (e) => {
      this.elementNavContainer.classList.toggle('nav-hidden');
    });
  }
  eventNewTask() {
    this.buttonNewTask.addEventListener('click', (e) => {
      this.toggleModal();
    });
  }
  eventAddTask(handler) {
    this.formNewTask.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this._taskDetails) {
        handler(this._taskDetails);
        this.toggleModal();
      }
    });
  }

  eventDeleteTask(handler) {
    this.elementTaskList.addEventListener('click', (e) => {
      const target = e.target;
      if (target.dataset.label === 'delete-button') {
        const id = Number(target.closest('li').dataset.taskid);
        handler(id);
      }
    });
  }
}
