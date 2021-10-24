import { displayTodayTasks } from '../tasks/taskFunctions.js';
import { populateUnassigned, populateSidebarProjects } from './todayFunctions.js';
import * as taskEvents from '../tasks/tasksEvents.js';
import * as todayEvents from './todayEvents.js';

taskEvents;
todayEvents;

populateSidebarProjects();
populateUnassigned();

// TODO: implement auto-rotate

displayTodayTasks();