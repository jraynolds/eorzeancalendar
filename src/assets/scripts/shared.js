export default {
  toCamelCase(string, strip=true) {
    let disallowedCharacters = [":",">","<", ".", "!", "?", "'"];
    if (strip) {
      for (let char of disallowedCharacters) {
        string = string.replace(char, "");
      }
    }
    
    let split = string.split(" ");
    let camel = split[0].toLowerCase();
    for (let i=1; i<split.length; i++) camel += split[i][0].toUpperCase() + split[i].slice(1);
    return camel;
  },
  getNextDate(event, boundary="start") {
    if (event.startTime) { // This is a repeated event of form "HH:MM:SS-HH:MM"
      let now = new Date();
      let startDate = this.durationToDate(event.startTime);
      let endDate = this.durationToDate(event.endTime);
      let outDate = startDate;
      if (boundary == "end") outDate = endDate;
      let todayWeekday = now.getDay();
      if (event.daysOfWeek.includes(todayWeekday) && now > startDate && now < endDate) return outDate;
      let orderedDays = [...event.daysOfWeek].sort((a, b) => this.getDayDistance(todayWeekday, a, 7) - this.getDayDistance(todayWeekday, b, 7));
      outDate.setDate(outDate.getDate() + this.getDayDistance(todayWeekday, orderedDays[0], 7))
      return outDate;
    } else { // This is a solitary event of form "YYYY-MM-DDTHH:MM:SS-HH:MM"
      if (boundary == "start") return new Date(event.start);
      else if (boundary == "end") return new Date(event.end);
      return null;
    }
  },
  getDayDistance(d1, d2) {
    if (d2 > d1) return d2 - d1;
    else return (7 - d1) + d2;
  },
  isCurrentlyOccurring(event) {
    let now = new Date();
    if (event.startTime) { // This is a repeated event of form "HH:MM:SS-HH:MM"
      return event.daysOfWeek.includes(now.getDay()) && now > this.durationToDate(event.startTime) && now < this.durationToDate(event.endTime);
    } else { // This is a solitary event of form "YYYY-MM-DDTHH:MM:SS-HH:MM"
      return now > new Date(event.start) && now < new Date(event.end);
    }
  },
  durationToDate(duration, days=new Date().getDate(), month=new Date().getMonth() + 1, year=new Date().getFullYear()) {
    if (month.toString().length < 2) month = "0" + month;
    if (days.toString().length < 2) days = "0" + days;
    return new Date(`${year}-${month}-${days}T${duration}`)
  }
}