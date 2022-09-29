'use: strict';
import sprite from './assets/sprite.svg';

// ####################[ IMPORTS ]####################

// ###################[END IMPORTS]###################

// ######################[ VIEW ]####################
// Controls the display
//
// ###################################################

export default class View {
  constructor() {
    this.elementHeader = this.findEle('header');
    this.elementNavContainer = this.findEle('[data-label="nav-container"]');
    this.elementNavbar = this.findEle('[data-label="nav-list"]');
    this.buttonNewTask = this.findEle('[data-label="new-task-header"]');
    this.buttonBurger = this.findEle('[data-label="toggle-navigation"]');
    this.elementSubnav = this.findEle('[data-label="sub-nav"]');

    // ########## [ TASK LIST]
    this.labelTaskListHeading = this.findEle('[data-label="task-list-title"]');
    this.elementTaskList = this.findEle('[data-label="task-list"]');

    // ##########[ MODAL ]
    // this.buttonCloseModal = this.findEle('#close-modal');
    this.labelModalTitle = this.findEle('[data-label="modal-title"]');
    // this.elementOverlay = this.findEle('[data-label="overlay"]');
    this.elementModal = this.findEle('[data-label="modal"]');
    // this.buttonFormSubmit = this.findEle('[data-label="submit"]');
    this.form = this.findEle('[data-label="modal-task-form"]');
    // this.formButtonContainer = this.findEle(
    //   '[data-label="form-button-container"]'
    // );
  }

  // #################### [ FORM EVALUATION ] ##################

  get _taskDetails() {
    const title = this.findEle('[data-label="modal-task-title"]');
    const date = this.findEle('[data-label="modal-task-date"]');
    const project = this.findEle('[data-label="modal-task-project"]');
    if (title.value && date.value && project.value) {
      return {
        title: title.value,
        date: date.value,
        project: project.value,
      };
    }
  }

  get _projectDetails() {
    const projectTitle = this.findEle('[data-label="project-title"]');
    return projectTitle.value;
  }

  // #################### [ UTILITY FUNCTIONS ] ##################

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

  // ####################[ DOM TOGGLES ] ##################

  eventToggleNav() {
    this.buttonBurger.addEventListener('click', (e) => {
      this.elementNavContainer.classList.toggle('nav-hidden');
    });
  }

  // ####################[ DOM CLEARING ] ##################

  clearTasks() {
    while (this.elementTaskList.firstElementChild)
      this.elementTaskList.firstElementChild.remove();
  }
  clearForm() {
    while (this.form.firstElementChild) this.form.firstElementChild.remove();
  }
  clearSubnav() {
    while (this.elementSubnav.firstElementChild)
      this.elementSubnav.firstElementChild.remove();
  }

  // ################## [ DOM INJECTION ] ##################

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
        const deleteIcon = this.createSVG('delete', 'tasklist-button-icon');
        const editIcon = this.createSVG('edit', 'tasklist-button-icon');

        const taskElement = this.createEle('li', 'tasklist-item');
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
        const buttonWrapper = this.createEle('div', 'tasklist-button-wrapper');
        const deleteButton = this.createEle(
          'button',
          'tasklist-btn',
          'red-btn'
        );
        deleteButton.append(deleteIcon);
        deleteButton.dataset.label = 'delete-button';

        const editButton = this.createEle(
          'button',
          'tasklist-btn',
          'yellow-btn'
        );
        editButton.append(editIcon);
        editButton.dataset.label = 'edit-button';

        buttonWrapper.append(editButton, deleteButton);

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
          buttonWrapper,
          taskDate,
          taskProject
        );
        this.elementTaskList.append(taskElement);
      });
    }
  }

  buildModal = (type, dataArr) => {
    this.clearForm();

    const buttonContainer = this.createEle(
      'div',
      'flex',
      'justify-end',
      'gap-2'
    );
    buttonContainer.dataset.label = 'form-button-container';

    const closeButton = this.createEle(
      'button',
      'form-button',
      'bg-red-400',
      'hover:bg-red-500'
    );
    closeButton.dataset.label = 'close-modal';
    closeButton.id = 'close-modal';
    closeButton.textContent = 'Cancel';

    const submitButton = this.createEle(
      'button',
      'form-button',
      'bg-emerald-400',
      'hover:bg-emerald-500'
    );
    submitButton.type = 'submit';
    submitButton.dataset.label = 'submit';
    submitButton.id = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.dataset.subtype = type;

    if (type === 'task' || type === 'edit') {
      this.labelModalTitle.textContent =
        type === 'task' ? 'New Task' : 'Edit Task';

      const taskTitleInputLabel = this.createEle('label', 'form-label');
      taskTitleInputLabel.textContent = 'Task title';
      taskTitleInputLabel.for = 'modal-task-title';
      const taskTitleInput = this.createEle('input', 'form-input');
      taskTitleInput.dataset.label = 'modal-task-title';
      taskTitleInput.type = 'text';
      taskTitleInput.id = 'modal-task-title';

      const taskDueDateInputLabel = this.createEle('label', 'form-label');
      taskDueDateInputLabel.textContent = 'Due date';
      taskDueDateInputLabel.for = 'modal-task-date';
      const taskDueDateInput = this.createEle('input', 'form-input');
      taskDueDateInput.dataset.label = 'modal-task-date';
      taskDueDateInput.type = 'date';
      taskDueDateInput.id = 'modal-task-date';

      const taskProjectInputLabel = this.createEle('label', 'form-label');
      taskProjectInputLabel.textContent = 'Project';
      taskProjectInputLabel.for = 'modal-project-select';
      const taskProjectInput = this.createEle('select', 'form-input');
      taskProjectInput.dataset.label = 'modal-task-project';
      taskProjectInput.id = 'modal-project-select';

      const projects = this.getProjects();
      projects.forEach((project) => {
        const option = this.createEle('option');
        option.value = project.name;
        option.textContent = project.name;
        taskProjectInput.append(option);
      });

      if (type === 'edit') {
        const [data] = dataArr;
        taskTitleInput.value = data.task;
        taskDueDateInput.value = data.duedate;
        taskProjectInput.value = data.project;
        submitButton.dataset.taskid = data.id;
      }

      this.form.prepend(
        taskTitleInputLabel,
        taskTitleInput,
        taskDueDateInputLabel,
        taskDueDateInput,
        taskProjectInputLabel,
        taskProjectInput
      );
    } else if (type === 'project') {
      this.labelModalTitle.textContent = 'New Project';
      const projectLabel = this.createEle('label', 'form-label');
      projectLabel.textContent = 'Project name';
      projectLabel.for = 'project-title';
      const projectTitle = this.createEle('input', 'form-input');
      projectTitle.dataset.label = 'project-title';
      projectTitle.type = 'text';
      projectTitle.id = 'project-title';
      this.form.append(projectLabel, projectTitle);
    }

    buttonContainer.append(closeButton, submitButton);
    this.form.append(buttonContainer);
    this.elementModal.showModal();
  };

  buildSubnav() {
    this.clearSubnav();
    const projects = this.getProjects();
    projects.forEach((project) => {
      const projectElement = this.createEle('li', 'project-item');
      projectElement.textContent = project.name;
      projectElement.dataset.projectid = project.id;
      if (project.id > 1) {
        projectElement.dataset.projecttype = 'custom';
        const deleteButton = this.createEle(
          'button',
          'p-1',
          'text-zinc-700',
          'rounded-full',
          'hover:bg-red-500',
          'hover:text-gray-50',
          'duration-300'
        );
        deleteButton.dataset.label = 'delete-button';
        const deleteIcon = this.createSVG(
          'close',
          'w-3',
          'h-3',
          'fill-current',
          'hover:scale-125',
          'duration-300'
        );
        deleteButton.append(deleteIcon);
        projectElement.append(deleteButton);
      }
      this.elementSubnav.append(projectElement);
    });
  }
  // ###############[ EVENTS ]###############

  eventForm() {
    this.form.addEventListener('click', (e) => {
      const target = e.target;
      if (target.dataset.label === 'close-modal') {
        this.elementModal.close();
      }
    });
  }
  eventNew() {
    this.elementHeader.addEventListener('click', (e) => {
      e.preventDefault();
      const datalabel = e.target.closest('button')?.dataset.label;

      if (datalabel) {
        const type =
          datalabel === 'new-task-header'
            ? 'task'
            : datalabel === 'new-project-header'
            ? 'project'
            : null;
        if (type) {
          this.buildModal(type);
        }
      }
    });
  }
  eventAddTaskProject(handler) {
    this.form.addEventListener('submit', (e) => {
      const type = e.submitter.dataset.subtype;
      if (type === 'task') {
        if (this._taskDetails) {
          handler(this._taskDetails, type);
        }
      } else if (type === 'project') {
        if (this._projectDetails) {
          handler(this._projectDetails, type);
          this.buildSubnav();
        }
      } else if (type === 'edit') {
        if (this._taskDetails) {
          const task = this._taskDetails;
          task.id = Number(e.submitter.dataset.taskid);
          handler(task, type);
        }
      }
    });
  }
  eventClickToEditTask(handler) {
    this.elementTaskList.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('button')?.dataset.label === 'edit-button') {
        const id = Number(target.closest('li').dataset.taskid);
        const task = handler(id);
        this.buildModal('edit', task);
      }
    });
  }
  eventDeleteTask(handler) {
    this.elementTaskList.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('button')?.dataset.label === 'delete-button') {
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
  eventDeleteProject(handler) {
    this.elementSubnav.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (button?.dataset.label === 'delete-button') {
        const id = button.closest('li').dataset.projectid;
        handler(Number(id));
        this.buildSubnav();
      }
    });
  }
}
