import { displayTasks } from './taskFunctions.js';
import * as taskEvents from './tasksEvents.js';
import { populateUnassigned, populateSidebarProjects } from '../today/todayFunctions.js';

taskEvents;

populateSidebarProjects();
populateUnassigned();

displayTasks();