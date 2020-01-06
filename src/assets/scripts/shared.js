export default {
    toCamelCase: (string, strip=true) => {
        let disallowedCharacters = [":",">","<", ".", "!", "?"];
        if (strip) {
            for (let char of disallowedCharacters) {
                string = string.replace(char, "");
            }
        }
        
        let split = string.split(" ");
        let camel = split[0].toLowerCase();
        for (let i=1; i<split.length; i++) camel += split[i][0].toUpperCase() + split[i].slice(1);
        return camel;
    }
}