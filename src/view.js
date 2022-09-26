'use: strict';
import sprite from './assets/sprite.svg';

// ##########################################################

export default class View {
  constructor() {
    this.elementNavContainer = this.findEle('[data-label="nav-container"]');
    this.elementNavbar = this.findEle('[data-label="nav-list"]');
    this.buttonNewTask = this.findEle('[data-label="new-task-header"]');
    this.buttonBurger = this.findEle('[data-label="toggle-navigation"]');

    // ########## [ TASK LIST]
    this.labelTaskListHeading = this.findEle('[data-label="task-list-title"]');
    this.elementTaskList = this.findEle('[data-label="task-list"]');

    // ##########[ MODAL ]
    this.buttonCloseModal = this.findEle('#close-modal');
    this.elementModal = this.findEle('[data-label="modal"]');
    this.buttonFormSubmit = this.findEle('[data-label="submit-task"]');
    this.formNewTask = this.findEle('[data-label="modal-task-form"]');
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
      const message = this.createEle('p', 'no-tasks-message');
      message.textContent = 'No tasks, go take a walk';
      this.elementTaskList.append(message);
    } else {
      tasks.forEach((task) => {
        const alarmIcon = this.createSVG('alarm', 'tasklist-icon');
        const labelIcon = this.createSVG('label', 'tasklist-icon');
        const deleteIcon = this.createSVG('delete', 'tasklist-delete-icon');
        deleteIcon.dataset.label = 'delete-button';

        const taskElement = this.createEle('li');
        taskElement.classList.add('tasklist-item');
        taskElement.dataset.taskid = task.id;

        const taskText = this.createEle('span', 'tasklist-text');
        taskText.textContent = task.task;

        const taskDate = this.createEle('span', 'tasklist-date');
        taskDate.textContent = task.duedate;
        taskDate.prepend(alarmIcon);

        const taskProject = this.createEle('span', 'tasklist-project');
        taskProject.textContent = task.project;
        taskProject.prepend(labelIcon);

        const checkbox = this.createEle(
          'input',
          'col-start-1',
          'row-start-1',
          'mr-6'
        );
        checkbox.type = 'checkbox';

        const deleteButton = this.createEle('button', 'tasklist-delete-btn');
        deleteButton.append(deleteIcon);

        if (task.complete) {
          taskElement.classList.add('bg-emerald-100');
          checkbox.checked = true;
          checkbox.classList.add('accent-emerald-400');
          taskText.classList.add('task-complete');
          taskDate.textContent = 'Complete';
          taskDate.classList.add('text-gray-500');
        }

        taskElement.append(
          checkbox,
          taskText,
          deleteButton,
          taskDate,
          taskProject
        );
        this.elementTaskList.append(taskElement);
      });
    }
  }
  toggleModal = () => {
    this.formNewTask.reset();
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
  eventCompleteTask(handler) {
    this.elementTaskList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const id = Number(e.target.parentElement.dataset.taskid);
        handler(id);
      }
    });
  }
}
