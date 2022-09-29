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
    this.view.eventDeleteProject(this.handleDeleteProject);
    this.view.eventClickToEditTask(this.handleGetEditTask);
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
  handleGetEditTask = (id) => this.model.getTaskToEdit(id);
  handleEditTask = (id) => this.model.editTask(id);
  handleDeleteTask = (id) => this.model.deleteTask(id);
  handleCompleteTask = (id) => this.model.completeTask(id);
  handleAddProject = (project) => this.model.addProject(project);
  handleDeleteProject = (id) => this.model.deleteProject(id);
}

const tasky = new Controller(new Model(), new View());
