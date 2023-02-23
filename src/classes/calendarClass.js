export class Week {
  contructor(day) {}
}

export class Day {
  constructor(day) {
    this.date = day; // aaaa-mm-dd
    this.occupiedBy = []; // array with names
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
