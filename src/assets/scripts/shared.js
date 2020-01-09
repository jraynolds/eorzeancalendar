export default {
    toCamelCase: (string, strip=true) => {
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
    parseEventTime: (timeStr) => {
        if (!timeStr.includes("T")) { // This is a repeated event of form "HH:MM:SS-HH:MM"
          let today = new Date();
          let timeArr = timeStr.split("-")[0].split(":"); // Does not handle + or timezones!
          today.setHours(timeArr[0], timeArr[1], timeArr[2]);
          return today
        } else { // This is a solitary event of form "YYYY-MM-DDTHH:MM:SS-HH:MM"
          return new Date(timeStr);
        }
      },
}