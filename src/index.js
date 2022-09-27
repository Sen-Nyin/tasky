'use: strict';

// ####################[ IMPORTS ]####################

import './styles.css';
import Model from './model';
import View from './view';

// ###################[END IMPORTS]###################

// ###################[ CONTROLLER ]##################
// Connects user input & logic with display
// @param : model
// @param : view
// ###################################################

class Controller {
  constructor(model, view) {
    this.view = view;
    this.model = model;
    this.view.eventAddTaskProject(this.handleAddTaskProject);
    this.view.eventDeleteTask(this.handleDeleteTask);
    this.view.eventCompleteTask(this.handleCompleteTask);
    this.view.getProjects = this.handleProjectsRequest;
    this.model.eventOnTaskChange(this.onTaskChange);
    this.onTaskChange(this.model.tasks);
    this.view.eventToggleNav();
    this.view.eventForm();
    this.view.eventNew();
    this.view.buildSubnav();
  }

  onTaskChange = (tasks) => this.view.displayTasks(tasks);
  handleProjectsRequest = () => this.model._projects;
  handleAddTaskProject = (item, type) => this.model.addTaskProject(item, type);
  handleDeleteTask = (id) => this.model.deleteTask(id);
  handleCompleteTask = (id) => this.model.completeTask(id);
  handleAddProject = (project) => this.model.addProject(project);
}

const tasky = new Controller(new Model(), new View());
