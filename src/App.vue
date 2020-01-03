<template>
  <div id="app">
    <Head/>
    <div id="content">
      <div id="calendarContainer">
        <FullCalendar :eventSources="getEventSources"/>
      </div>
      <Categories :categories="getActiveCategories"/>
      <EventCards :events="getCurrentEvents" :categories="categories"/>
    </div>
    <Foot/>
  </div>
</template>

<script>
import FullCalendar from '@/components/FullCalendar.vue'
import Head from '@/components/Head.vue'
import Categories from '@/components/Categories.vue'
import EventCards from '@/components/EventCards.vue'
import Foot from '@/components/Foot.vue'

export default {
  name: 'app',
  components: {
    FullCalendar,
    Head,
    Categories,
    EventCards,
    Foot
  },
  data() {
    let categories = {
      club: {
        title: "Club",
        backgroundColor: "mistyrose",
        borderColor: "darkred",
        textColor: "black",
        isShowing: true,
        isHovering: false,
        hoveredThisInstance: false,
        events: []
      },
      art: {
        title: "Art",
        backgroundColor: "palegoldenrod",
        borderColor: "white",
        textColor: "black",
        isShowing: true,
        isHovering: false,
        hoveredThisInstance: false,
        events: []
      },
      nsfw: {
        title: "NSFW",
        backgroundColor: "palevioletred",
        borderColor: "darkred",
        textColor: "white",
        isShowing: false,
        isHovering: false,
        hoveredThisInstance: false,
        events: []
      }
    }
    return {
      events: [
        {
          title: "Lightwarden Club",
          startTime: "19:00:00-08:00",
          endTime: "23:00:00-08:00",
          daysOfWeek: [3,4,5,6,0],
          groupId: "LightWarden",
          header: "lightwarden.png",
          logo: "lightwarden.png",
          stringTime: "7-11 PST, Weds-Sun",
          description: "There's a place for every sinner. Come bathe yourself in the light that eradicates all sins--and spend time with others who indulge themselves.",
          location: {
            datacenter: "Crystal",
            world: "Malboro",
            housing: "Lavender Beds",
            ward: 13,
            plot: 36
          },
          categories: ["club", "nsfw"],
          isAlarmed: false,
          hasRungToday: false
        },
        {
          title: "A Stage Reborn",
          start: "2020-01-03T14:00:00-08:00",
          end: "2020-01-03T19:00:00-08:00",
          groupId: "StageReborn",
          header: "stageReborn.png",
          stringTime: "2-7 PST, Jan 2nd",
          description: "A Stage Reborn is Eorzea's premier theatre troupe. All plays are performed in-game with the tools Square Enix provides to heighten the experience and draw the viewer in.",
          location: {
            datacenter: "Crystal",
            world: "Malboro",
            housing: "Lavender Beds",
            ward: 13,
            plot: 36
          },
          categories: ["art"],
          isAlarmed: false,
          hasRungToday: false
        },
      ],
      categories: categories,
      ticker: null
    }
  },
  computed: {
    getEventSources() {
      let sources = [];

      let uniqueEvents = [];
      for (let key in this.categories) {
        let category = this.categories[key];
        if (!category.isShowing) continue;

        let source = {};
        source.title = category.title;
        source.backgroundColor = category.backgroundColor;
        source.borderColor = category.borderColor;
        source.textColor = category.textColor;
        source.events = [];

        for (let event of this.events) {
          if (event.categories[0] != key) continue;
          if (uniqueEvents.includes(event)) continue;
          else {
            source.events.push(event);
            uniqueEvents.push(event);
          }
        }
        sources.push(source);
      }

      return sources;
    },
    getActiveCategories() {
      let actives = [];
      for (let key in this.categories) {
        let category = this.categories[key];
        if (category.events.length > 0) {
          actives.push(category);
        }
      }
      return actives;
    },
    getCurrentEvents() {
      return this.events.filter(event => !this.isFinished(event));
    },
  },
  methods: {
    eventIsShowing(event) {
      for (let category in event.categories) {
        if (event.categories[category].isShowing) return true;
      }
      return false;
    },
    addEventsToCategories() {
      for (let event of this.events) {
        for (let category of event.categories) {
          this.categories[category].events.push(event);
        }
      }
    },
    isFinished(event) {
        let currentTime = new Date();
        if (event.endTime) { // This is a repeating event.
            if (!event.endRecur) { // This event doesn't end.
                return false;
            }
            return Date.parse(event.endRecur) < currentTime.getTime()
        } else { // This is a one-time event.
            return Date.parse(event.end) < currentTime.getTime()
        }
    },
    timeTicker() {
      let vm = this;

      this.ticker = setInterval(function() {
        for (let event of vm.events.filter(event => event.isAlarmed)) {
          if (!vm.isFinished(event) && !event.hasRungToday && vm.justStarted(event)) {
            vm.alarm(event);
          }
        }
      }, 5000);
    },
    justStarted(event) {
      let margin = 10000; // How late are we willing to be on time?
      let now = Date.now();
      let eventStart = null;
      if (event.startTime) { // This is a repeated event.
        eventStart = this.parseTime(event.startTime);
      } else if (event.start) { // This is a one-time event.
        eventStart = this.parseTime(event.start);
      }
      return (now - eventStart >= 0 && now - eventStart < margin);
    },
    parseTime(timeStr) {
      if (!timeStr.includes("T")) { // This is a repeated event of form "HH:MM:SS-HH:MM"
        let today = new Date();
        let timeArr = timeStr.split("-")[0].split(":");
        return today.setHours(timeArr[0], timeArr[1], timeArr[2]);
      } else { // This is a solitary event of form "YYYY-MM-DDTHH:MM:SS-HH:MM"
        return new Date(timeStr);
      }
    },
    alarm(event) {
      let alarmString = `${event.title} is beginning!`;
      
      alert(alarmString);
      if (Notification.permission == "granted") new Notification(alarmString);

      event.hasRungToday = true;
    }
  },
  beforeMount() {
    this.addEventsToCategories();
    this.timeTicker();
  },
  mounted() {
    // this.alarm(this.events[0]);
  }
}
</script>

<style lang="scss">
$backgroundColor: black;
$maingroundColor: white;

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  align-items: center;
  display: flex;
  flex-direction: column;
}

body, #app, #content {
  background-color: $backgroundColor;
}

#content {
  max-width: 1280px;
  padding: 10px;
   
  background-color: $maingroundColor;
}

#calendarContainer {
  height: 750px;
}
</style>
