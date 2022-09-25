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
    this.view.eventAddTask(this.handleAddTask);
    this.view.eventDeleteTask(this.handleDeleteTask);
    this.model.eventOnChange(this.onChange);
    this.onChange(this.model.tasks);
  }

  onChange = (tasks) => {
    this.view.displayTasks(tasks);
  };

  handleAddTask = (task) => this.model.addTask(task);
  handleDeleteTask = (id) => this.model.deleteTask(id);
  handleCompleteTask(id) {}
  handleAddProject = (project) => this.model.addProject(project);
  handleEditProject() {}
  handleDeleteProject = (project) => this.model.deleteProject(project);
}

const tasky = new Controller(new Model(), new View());
