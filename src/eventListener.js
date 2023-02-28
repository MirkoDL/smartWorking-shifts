import { User } from "./classes/userClass.js";
import { Calendar } from "./classes/calendarClass.js";
import { days, getMonthDays, assignDays } from "./index.js";
import { printCalendar } from "./populateHTML.js";

export const users = [];
export const calendar = new Calendar();
document.querySelector(`#submitForm`).addEventListener(`click`, (e) => {
  e.preventDefault();
  let username = document.querySelector(`#username`).value.trim();
  if (username === ``) {
    return;
  } else{
    username = username[0].toUpperCase() + username.substring(1);
    users.push(new User(username));
    assignDays()
    calendar.addUser(users[users.length - 1], days);
    document.querySelector(`#createCalendarButton`).removeAttribute(`disabled`);
    document
      .querySelector(`#userList`)
      .appendChild(
        document
          .createElement("li")
          .appendChild(document.createTextNode(`${username} `))
      );
    //document.querySelector(`#username`).value = ``
  }
});

document.querySelector(`#monthSelector`).addEventListener(`change`, (e) => {
  getMonthDays(e.currentTarget.value);
  calendar.rows = [];
  assignDays()
  users.forEach((user) => {
    calendar.addUser(user, days);
  });
  printCalendar(calendar);
});

document.querySelector(`#createCalendarButton`).addEventListener(`click`, (e) => {
  //TODO elaborate calendar days
  
  printCalendar(calendar);
});


document.querySelector(`#username`).addEventListener(`input`, e => {
  const element = e.currentTarget
  if(users.filter(user => user.name.toLowerCase() === element.value).length > 0){
    element.style.color = `red`
    document.querySelector(`#submitForm`).disabled = true
  }
  else{
    element.style.color = `black`
    document.querySelector(`#submitForm`).disabled = false
  }
})