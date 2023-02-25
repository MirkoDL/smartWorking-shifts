import { days, getMonthDays } from "./index.js";

const monthNames = [
  `Gennaio`,
  `Febbraio`,
  `Marzo`,
  `Aprile`,
  `Maggio`,
  `Giugno`,
  `Luglio`,
  `Agosto`,
  `Settembre`,
  `Ottobre`,
  `Novembre`,
  `Dicembre`,
];
window.onload = () => {
  //add the next 4 month to the month selector
  let monthSelectorElement = document.querySelector(`#monthSelector`);
  let currentMonth = new Date().getMonth();
  for (let i = 0; i < 4; i++) {
    if (i === 0) {
      getMonthDays(monthNames[i + currentMonth]);
    }
    let option = document.createElement(`option`);
    option.text = `${monthNames[i + currentMonth]}`;
    monthSelectorElement.add(option);
  }
  console.log(days);
};

//create Calendar GUI
