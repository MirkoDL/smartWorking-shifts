import { Day } from "./classes/calendarClass.js";
import { users } from "./eventListener.js";
const randomizeUsers = () => {
  let startUser = Math.floor(Math.random() * (users.length - 0) + 0);
  //move the selected user to the beginning as extracted prior
  users.unshift(users[startUser]);
  users.splice(startUser + 1, 1);
};

export const days = [];
export const getMonthDays = (month) => {
  days.length = 0;
  //userInput truncate to lenth 3
  let monthNumber =
    "GenFebMarAprMagGiuLugAgoSetOttNovDic".indexOf(month.substring(0, 3)) / 3 +
    1; //get month number 0-11
  let lastDayOfMonth = new Date(
    new Date().getFullYear(),
    monthNumber,
    0
  ).getDate();
  const remainingDay = () => {
    if (new Date().getMonth() === monthNumber - 1) {
      return lastDayOfMonth - new Date().getDate();
    } else {
      return lastDayOfMonth;
    }
  };
  let remainingDays = remainingDay();
  for (let i = 1; i <= remainingDays; i++) {
    days.push(
      new Day(
        `${new Date().getFullYear()}-${
          monthNumber < 9 ? `0${monthNumber}` : monthNumber
        }-${
          new Date().getMonth() !== monthNumber - 1
            ? i
            : new Date().getDate() + i
        }`
      )
    );
  }
};

export const assignDays = () => {
  days.forEach((day) => {
    let currentDay = day.date;

    for (let i = 0; i < Math.round(users.length / 2); i++) {
      //check and assign day to user
      users.forEach((user) => {
        if (user.checkDay(currentDay) && day.isFree(users.length)) {
          day.assign(user);
          user.addToUserCalendar(currentDay);
        }
      });
    }
    randomizeUsers();
  });
};
