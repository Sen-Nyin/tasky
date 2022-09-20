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
  constructor(model, view) {}
  handleAddTask() {}
  handleEditTask() {}
  handleDeleteTask() {}
  handleCompleteTask() {}
  handleAddProject() {}
  handleEditProject() {}
  handleDeleteProject() {}
}

const tasky = new Controller(new Model(), new View());
