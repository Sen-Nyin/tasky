'use: strict';
import sprite from './assets/sprite.svg';

// ######################[ VIEW ]####################

export default class View {
  constructor() {
    this.header = this.findEle('header');
    this.navContainer = this.findEle('[data-label="nav-container"]');
    this.sidebar = this.findEle('[data-label="nav-list"]');
    this.burgerBtn = this.findEle('[data-label="toggle-navigation"]');
    this.projectList = this.findEle('[data-label="sub-nav"]');

    // buttons
    this.newProjectBtn = this.findEle('[data-label="add-project-btn"]');
    this.newTaskBtn = this.findEle('[data-label="add-task-btn"]');

    // ########## [ TASK LIST]
    this.labelTaskListHeading = this.findEle('[data-label="task-list-title"]');
    this.taskList = this.findEle('[data-label="task-list"]');

    // ##########[ MODAL ]
    this.modalTitle = this.findEle('[data-label="modal-title"]');
    this.modal = this.findEle('[data-label="modal"]');
    this.form = this.findEle('[data-label="modal-task-form"]');
  }

  // #################### [ FORM EVALUATION ] ##################

  get _taskDetails() {
    const title = this.findEle('[data-label="modal-task-title"]');
    const date = this.findEle('[data-label="modal-task-date"]');
    const project = this.findEle('[data-label="modal-task-project"]');
    const priorities = this.findEles('input[name="priority"]');
    let selectedPriority;
    priorities.forEach((priority) => {
      if (priority.checked) {
        selectedPriority = priority.closest('label').textContent;
      }
    });
    if (title.value && date.value && selectedPriority && project.value) {
      return {
        title: title.value,
        date: date.value,
        priority: selectedPriority,
        project: project.value,
      };
    }
  }

  get _projectDetails() {
    const projectTitle = this.findEle('[data-label="project-title"]');
    if (projectTitle.value) return projectTitle.value;
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
  findEles(selector) {
    const element = document.querySelectorAll(selector);
    return element;
  }
  capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // ####################[ DOM TOGGLES ] ##################
  eventToggleNav() {
    this.burgerBtn.addEventListener('click', (e) => {
      this.navContainer.classList.toggle('nav-hidden');
    });
  }

  // ####################[ DOM CLEARING ] ##################
  clear = (target) => {
    while (target.firstElementChild) target.firstElementChild.remove();
  };

  // ################## [ DOM INJECTION ] ##################
  displayTasks(tasks) {
    this.clear(this.taskList);

    if (!tasks.length) {
      const message = this.createEle('p', 'no-tasks-message');
      message.textContent = 'No tasks, go take a walk';
      this.taskList.append(message);
    } else {
      tasks.forEach((task) => {
        const alarmIcon = this.createSVG('alarm', 'tasklist-icon');
        const labelIcon = this.createSVG('label', 'tasklist-icon');
        const deleteIcon = this.createSVG('delete', 'tasklist-button-icon');
        const editIcon = this.createSVG('edit', 'tasklist-button-icon');

        const taskElement = this.createEle('li', 'tasklist-item');
        taskElement.dataset.taskid = task.id;

        if (task.priority === 'High')
          taskElement.classList.add('high-priority');
        if (task.priority === 'Medium')
          taskElement.classList.add('medium-priority');
        if (task.priority === 'Low') taskElement.classList.add('low-priority');

        const taskText = this.createEle('span', 'tasklist-text');
        taskText.textContent = task.task;

        const taskDate = this.createEle('span', 'tasklist-date');
        if (new Date().toDateString() > new Date(task.duedate).toDateString()) {
          const days = Math.round(
            Math.abs(
              (new Date() - new Date(task.duedate)) / (1000 * 60 * 60 * 24)
            )
          );
          taskDate.textContent = `${days} ${days > 1 ? 'days' : 'day'} overdue`;
          taskDate.classList.add('text-red-500');
        } else if (
          new Date().toDateString() === new Date(task.duedate).toDateString()
        ) {
          taskDate.textContent = 'Today!';
        } else {
          const days = Math.round(
            Math.abs(
              (new Date(task.duedate) - new Date()) / (1000 * 60 * 60 * 24)
            )
          );
          if (days === 0) {
            taskDate.textContent = 'Due tomorrow';
          } else {
            taskDate.textContent = task.duedate;
          }
        }

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
          taskElement.classList.remove('bg-gray-200');
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
        this.taskList.append(taskElement);
      });
    }
  }

  buildModal = (type, dataArr) => {
    this.clear(this.form);

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
      this.modalTitle.textContent = type === 'task' ? 'New Task' : 'Edit Task';

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

      const priorityBox = this.createEle(
        'div',
        'flex',
        'gap-2',
        'justify-center',
        'mb-4'
      );
      const priorityLabel = this.createEle('p', 'form-label');
      priorityLabel.textContent = 'Priority';
      const labelHighPrio = this.createEle(
        'label',
        'max-w-max',
        'rounded-md',
        'p-2',
        'red-btn'
      );
      labelHighPrio.for = 'priority';
      labelHighPrio.textContent = 'High';
      const radioHighPrio = this.createEle('input', 'w-0', 'h-0');
      radioHighPrio.type = 'radio';
      radioHighPrio.name = 'priority';
      radioHighPrio.value = 'High';
      labelHighPrio.append(radioHighPrio);

      const labelMediumPrio = this.createEle(
        'label',
        'max-w-max',
        'rounded-md',
        'p-2',
        'yellow-btn'
      );
      labelMediumPrio.for = 'priority';
      labelMediumPrio.textContent = 'Medium';
      const radioMediumPrio = this.createEle('input', 'w-0', 'h-0');
      radioMediumPrio.type = 'radio';
      radioMediumPrio.name = 'priority';
      radioMediumPrio.value = 'Medium';
      labelMediumPrio.append(radioMediumPrio);

      const labelLowPrio = this.createEle(
        'label',
        'max-w-max',
        'rounded-md',
        'p-2',
        'green-btn'
      );
      labelLowPrio.for = 'priority';
      labelLowPrio.textContent = 'Low';
      const radioLowPrio = this.createEle('input', 'w-0', 'h-0');
      radioLowPrio.type = 'radio';
      radioLowPrio.name = 'priority';
      radioLowPrio.value = 'Low';
      labelLowPrio.append(radioLowPrio);

      priorityBox.append(labelHighPrio, labelMediumPrio, labelLowPrio);

      if (type === 'edit') {
        const [data] = dataArr;
        taskTitleInput.value = data.task;
        taskDueDateInput.value = data.duedate;
        taskProjectInput.value = data.project;
        submitButton.dataset.taskid = data.id;
        console.log(data);
        if (data.priority === 'High') radioHighPrio.checked = true;
        if (data.priority === 'Medium') radioMediumPrio.checked = true;
        if (data.priority === 'Low') radioLowPrio.checked = true;
      }

      this.form.prepend(
        taskTitleInputLabel,
        taskTitleInput,
        taskDueDateInputLabel,
        taskDueDateInput,
        priorityLabel,
        priorityBox,
        taskProjectInputLabel,
        taskProjectInput
      );
    } else if (type === 'project') {
      this.modalTitle.textContent = 'New Project';
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
    this.modal.showModal();
  };

  displayProjects(projects) {
    this.clear(this.projectList);
    projects.forEach((project) => {
      const projectElement = this.createEle('li', 'project-item');
      const projectName = this.createEle('p');
      projectName.textContent = project.name;
      projectElement.dataset.projectid = project.id;
      projectElement.dataset.label = 'filter';
      projectElement.dataset.filter = project.name;
      projectElement.append(projectName);
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
      this.projectList.append(projectElement);
    });
  }
  // ###############[ EVENTS ]###############

  eventCloseModal() {
    this.form.addEventListener('click', (e) => {
      const target = e.target;
      if (target.dataset.label === 'close-modal') {
        this.modal.close();
      }
    });
  }
  eventNewTask() {
    this.newTaskBtn.addEventListener('click', (e) => {
      this.buildModal('task');
    });
  }
  eventNewProject() {
    this.newProjectBtn.addEventListener('click', (e) => {
      this.buildModal('project');
    });
  }
  eventUpdateLists(handler) {
    this.form.addEventListener('submit', (e) => {
      const type = e.submitter.dataset.subtype;
      if (type === 'task') {
        if (this._taskDetails) {
          handler(this._taskDetails, type);
        }
      } else if (type === 'project') {
        if (this._projectDetails) {
          handler(this._projectDetails, type);
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
    this.taskList.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('button')?.dataset.label === 'edit-button') {
        const id = Number(target.closest('li').dataset.taskid);
        const task = handler(id);
        this.buildModal('edit', task);
      }
    });
  }
  eventDeleteTask(handler) {
    this.taskList.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('button')?.dataset.label === 'delete-button') {
        const id = Number(target.closest('li').dataset.taskid);
        handler(id);
      }
    });
  }
  eventCompleteTask(handler) {
    this.taskList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const id = Number(e.target.parentElement.dataset.taskid);
        handler(id);
      }
    });
  }
  eventDeleteProject(handler) {
    this.projectList.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (button?.dataset.label === 'delete-button') {
        const id = button.closest('li').dataset.projectid;
        handler(Number(id));
      }
    });
  }
  eventFilter(handler) {
    this.sidebar.addEventListener('click', (e) => {
      if (e.target.closest('li')?.dataset.label === 'filter') {
        const filter = e.target.closest('li').dataset.filter;
        this.labelTaskListHeading.textContent = this.capitalise(filter);
        handler(filter);
      }
    });
  }
}
