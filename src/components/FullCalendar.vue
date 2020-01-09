<template>
  <FullCalendar defaultView="timeGridWeek" nowIndicator="true" :scrollTime="getCurrentHour" :plugins="calendarPlugins" :eventSources="eventSources" height="parent" :eventRender="eventRender"/>
</template>

<script>
import JQuery from 'jquery'
let $ = JQuery
import Dotdotdot from 'dotdotdot-js'

import FullCalendar from '@fullcalendar/vue'
import timeGridPlugin from '@fullcalendar/timegrid'

import shared from '@/assets/scripts/shared.js'

export default {
    components: {
        FullCalendar
    },
    props: [ "eventSources" ],
    data() {
        return {
            calendarPlugins: [ timeGridPlugin ],
            eventRender: function(info) {
                let extendedProps = info.event.extendedProps;

                let strip = true;
                let string = info.event.title;
                let disallowedCharacters = [":",">","<", ".", "!", "?"];
                if (strip) {
                    for (let char of disallowedCharacters) {
                        string = string.replace(char, "");
                    }
                }
                let split = string.split(" ");
                let camelCased = split[0].toLowerCase();
                for (let i=1; i<split.length; i++) camelCased += split[i][0].toUpperCase() + split[i].slice(1);
                
                $(info.el).addClass("event-" + camelCased)
                $(info.el).click(function() {
                    $('html, body').animate({
                        scrollTop: $("#" + camelCased).offset().top
                    }, 1000)
                });
                
                // Add a logo
                let hasLogo = false;
                if (extendedProps.logo) {
                    hasLogo = true;
                    let img = $(document.createElement("div"));
                    img.addClass("fc-logo");
                    img.addClass("flex-grow-1");
                    let backgroundImage = 'url(' + require('@/assets/images/events/logos/' + extendedProps.logo) + ')';
                    let backgroundColor = $(info.el).css("background-color");
                    img.css(
                        {backgroundImage: backgroundImage, backgroundColor: backgroundColor,
                        boxShadow: "0 0 8px 8px " + backgroundColor + " inset"}
                    );
                    $(info.el).css("background-color")
                    $(info.el).find(".fc-content").append(img);
                }

                // Add a description
                if (extendedProps.description) {
                    let desc = $(document.createElement("span"));
                    desc.addClass("fc-desc");
                    if (!hasLogo) desc.addClass("flex-grow-1");
                    let text = extendedProps.description;
                    if (extendedProps.truncatedDesc) text = extendedProps.truncatedDesc;
                    desc.text(text);
                    $(info.el).find(".fc-content").append(desc);
                    new Dotdotdot(desc[0], {watch: true, height: "watch"});
                }

                // Add a location
                if (extendedProps.location) {
                    let location = $(document.createElement("span"));
                    let locationData = extendedProps.location;
                    location.addClass("fc-loc");
                    let housing = locationData.housing.slice(0, 1);
                    if (locationData.housing.includes(" ")) {
                        let split = locationData.housing.split(" ");
                        housing += split[1].charAt(0).toUpperCase();
                    }
                    location.text(`${locationData.world} ${housing}, ${locationData.ward}/${locationData.plot}`);
                    $(info.el).find(".fc-content").append(location);
                }
            },
        }
    },
    computed: {
        getCurrentHour() {
            return new Date().getHours() + ":00:00";
        }
    },
    created() {
        this.toCamelCase = shared.toCamelCase
    }
}
</script>

<style lang='scss'>
@import '~@fullcalendar/core/main.css';
@import '~@fullcalendar/daygrid/main.css';
@import '~@fullcalendar/timegrid/main.css';
@import 'https://static.fontawesome.com/css/fontawesome-app.css';

.fc-content {
    padding: 4px;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
}

.fc-logo {
    background-position: center;
    background-size: cover;
    box-shadow: 0 0 8px 8px white inset;
}

.fc-desc {
    font-style: italic;
    font-size: smaller;
    width: 100%;
    overflow: hidden;

    display: flex;
    align-items: center;
}

.fc-loc {
    font-size: small;
}

.flex-grow-1 {
    display: flex;
    flex-grow: 1;
}

.fc-icon::before {
    vertical-align: top;
}
</style>