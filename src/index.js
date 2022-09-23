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
  }

  handleAddTask = (task) => this.model.addTask(task);
}

const tasky = new Controller(new Model(), new View());
