import * as projectEvents from "./projectEvents.js";
import { displayProjects } from "./projectFunctions.js";
import { populateUnassigned, populateSidebarProjects } from '../today/todayFunctions.js';

projectEvents;

populateSidebarProjects();
populateUnassigned();

displayProjects();