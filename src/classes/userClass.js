export class User {
  constructor(name) {
    this.name = name;
    this.reservedDays = [
      /*
      aaaa-mm-dd
      */
    ];
    this.assignedDays = [
      /*
        {
				weekNumber: int,
				day: aaaa-mm-dd
        }
        */
    ];
  }
  addToUserCalendar(day) {
    //day: dd / completeDate: aaaa-mm-dd
    let weekNumber = this.getWeekNumber(day);
    this.assignedDays.push({
      weekNumber,
      day
    });
    //console.log(this.assignedDays)
  }

  isWeekDone(day) {
    //check if already assigned to two days of the week
    //onsole.log('start ' + this.assignedDays)
    let weekNumber = this.getWeekNumber(day);
    let counter = 0;
    for (let i = 0; i < this.assignedDays.length; i++) {
      if (this.assignedDays[i].weekNumber === weekNumber) {
        counter++;
      }
    }
    return counter > 1; //true if user already assigned to 2 days
  }
  getWeekNumber(currentDate) {
    let startDate = new Date(new Date().getFullYear(), 0, 1);
    let days = Math.floor(
      (new Date(currentDate) - startDate) / (24 * 60 * 60 * 1000)
    );
    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
  }
  isVacation(dayToCheck) {
    //check if the user has vacation planned on that day
    return this.reservedDays.filter((day) => day === dayToCheck) > 0; //true if reserved
  }

  reserveDay(day) {
    this.reservedDays.push(day);
  }

  checkDay(day) {
    return !(this.isVacation(day) || this.isWeekDone(day)); //true if can add day
  }
}
