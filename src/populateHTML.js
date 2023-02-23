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
  let monthSelectorElement = document.querySelector(`#monthSelector`);
  let currentMonth = new Date().getMonth();
  for (let i = 0; i < 4; i++) {
    let option = document.createElement(`option`);
    option.text = `${monthNames[i + currentMonth]}`;
    monthSelectorElement.add(option);
  }
};
