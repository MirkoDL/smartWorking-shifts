export class Calendar {
  constructor(month) {
    this.month = month;
    this.rows = [];
  }
  addUser(user, days) {
    let buttons = days.map((day) => {
      if (day.occupiedBy.filter((e) => e === user.name) > 0) {
        return `<button class="btn btn-success calendarDayBtn px-2" id="">${day.printForCalendar(day.date)}</button>`;
      } else if (day.isReserved()) {
        return `<button class="btn btn-dark calendarDayBtn px-2" id="" disabled>${day.printForCalendar(day.date)}</button>`;
      } else {
        return `<button class="btn btn-warning calendarDayBtn px-2" id="">${day.printForCalendar(day.date)}</button>`;
      }
    });
    this.rows.push(`<div class="row mt-5 text-center" id=${user.name}>
        <div class="col-md-1">
          <b>${user.name}</b>
        </div>
        <div class="col-md-11">
        ${buttons.join(``)}
        </div>
    </div>`);
    //console.log(this.rows);
  }
}

export class Day {
  constructor(day) {
    this.date = day; // aaaa-mm-dd
    this.occupiedBy = []; // array with names
  }
  printForCalendar(day){
    return (`${day[9] ? day[8] + `` + day[9] : `0` + day[8]}/${day[5]}${day[6]}`)
  }
  isNextDayAvaiable() {
    //check if the next day is: weekend - holiday - free
    //TODO soon
  }

  isReserved() {
    //return true if reserved by policy/weekend

    //check weekend
    let day = new Date(this.date).getDay();
    let isWeekend = day === 6 || day === 0; // 6 = Saturday, 0 = Sunday
    return isWeekend;
  }
  isFree(people) {
    //check for 1 sit, return false if already assigned to half the crew(mandatory half the crew to be in office everyday)
    //false if weekend
    return (
      this.occupiedBy.length < Math.round(people / 2) && !this.isReserved()
    );
  }
  assign(user) {
    this.occupiedBy.push(user);
  }
}
