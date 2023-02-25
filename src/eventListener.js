import { User } from "./classes/userClass.js";
import { Calendar } from "./classes/calendarClass.js";
import { days, getMonthDays } from "./index.js";

export const users = [];
document.querySelector(`#getUserForm`).addEventListener(`submit`, (e) => {
  e.preventDefault();
  let username = document.querySelector(`#username`).value.trim();
  if (username === ``) {
    return;
  }
  console.log("submitted");
  username = username[0].toUpperCase() + username.substring(1);
  users.push(new User(username));
  const calendar = new Calendar();
  calendar.addUser(users[users.length - 1], days);
});

document.querySelector(`#monthSelector`).addEventListener(`change`, (e) => {
  getMonthDays(e.currentTarget.value);
  //console.log(days);
});
