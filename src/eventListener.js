import { User } from "./classes/userClass.js";
import { Calendar } from "./classes/calendarClass.js";
import { days, getMonthDays } from "./index.js";
import { printCalendar } from "./populateHTML.js";

export const users = [];
export const calendar = new Calendar();
document.querySelector(`#getUserForm`).addEventListener(`submit`, (e) => {
  e.preventDefault();
  let username = document.querySelector(`#username`).value.trim();
  if (username === ``) {
    return;
  }
  username = username[0].toUpperCase() + username.substring(1);
  users.push(new User(username));
  calendar.addUser(users[users.length - 1], days);
  document.querySelector(`#createCalendarButton`).removeAttribute(`disabled`);
});

document.querySelector(`#monthSelector`).addEventListener(`change`, (e) => {
  getMonthDays(e.currentTarget.value);
  calendar.rows = []
});

document.querySelector(`.createCalendarDiv`).addEventListener(`click`, (e) => {
  //TODO elaborate calendar days
  printCalendar(calendar)
});
