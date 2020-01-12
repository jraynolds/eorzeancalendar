const fb = require('@/firebaseConfig.js')

export default {
    parseIntoEvent(data) {
        let event = data;

        if (data.daysOfWeek) { // This is a recurring event.
            event.startRecur = data.startDate;
            if (data.endDate) event.endRecur = data.endDate;
            delete event.startDate;
            delete event.endDate;
        } else { // This is a one-time event.
            event.start = [data.startDate, data.startTime].join("T");
            event.end = [data.endDate, data.endTime].join("T");
            delete event.startTime;
            delete event.startEnd;
            delete event.endTime;
            delete event.endEnd;
        }

        return event;
    },
    pushEvent(event) {
        event.isTemporary = true;

        fb.db.collection("events").add(event);
    }
}