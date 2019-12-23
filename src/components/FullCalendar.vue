<template>
  <FullCalendar defaultView="timeGridWeek" nowIndicator="true" :scrollTime="getCurrentHour" :plugins="calendarPlugins" :eventSources="eventSources" height="parent" :eventRender="eventRender"/>
</template>

<script>
import JQuery from 'jquery'
let $ = JQuery

import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
    components: {
        FullCalendar
    },
    props: [ "eventSources" ],
    data() {
        return {
            calendarPlugins: [ timeGridPlugin ],
            eventRender: function(info) {
                if (info.event.extendedProps.description) {
                    let desc = $(document.createElement("span"));
                    desc.addClass("fc-desc");
                    let text = info.event.extendedProps.description;
                    if (info.event.extendedProps.truncatedDesc) text = info.event.extendedProps.truncatedDesc;
                    desc.text(text);
                    $(info.el).find(".fc-content").append(desc);
                }

                if (info.event.extendedProps.location) {
                    let location = $(document.createElement("span"));
                    let locationData = info.event.extendedProps.location;
                    location.addClass("fc-loc");
                    let housing = locationData.housing.slice(0, 1);
                    if (locationData.housing.includes(" ")) {
                        let split = locationData.housing.split(" ");
                        housing += split[1].charAt(0).toUpperCase();
                    }
                    location.text(`${locationData.world} ${housing}, ${locationData.ward}/${locationData.plot}`);
                    $(info.el).find(".fc-content").append(location);
                }
            }
        }
    },
    computed: {
        getCurrentHour() {
            return new Date().getHours() + ":00:00";
        }
    }
}
</script>

<style lang='scss'>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';

.fc-content {
    padding: 2px;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.fc-desc {
    font-style: italic;
    font-size: smaller;
    width: 100%;
    flex-grow: 1;

    display: flex;
    align-items: center;
}

.fc-loc {
    font-size: small;
}
</style>