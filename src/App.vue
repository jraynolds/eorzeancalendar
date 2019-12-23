<template>
  <div id="app">
    <Head/>
    <div id="content">
      <div id="calendarContainer">
        <FullCalendar :eventSources="eventSources"/>
      </div>
      <EventCards :events="getAllEvents"/>
    </div>
    <Foot/>
  </div>
</template>

<script>
import FullCalendar from './components/FullCalendar.vue'
import Head from './components/Head.vue'
import EventCards from './components/EventCards.vue'
import Foot from './components/Foot.vue'

export default {
  name: 'app',
  components: {
    FullCalendar,
    Head,
    EventCards,
    Foot
  },
  data() {
    return {
      eventSources: [
        {
          name: "clubs",
          events: [
            {
              title: "Lightwarden Club",
              startTime: "19:00:00-08:00",
              endTime: "23:00:00-08:00",
              daysOfWeek: [3,4,5,6,0],
              groupId: "Lightwarden",
              header: "lightwarden.png",
              stringTime: "7-11 PST, Weds-Sun",
              description: "There's a place for every sinner. Come bathe yourself in the light that eradicates all sins--and spend time with others who indulge themselves.",
              categories: ["club", "nsfw"],
              location: {
                datacenter: "Crystal",
                world: "Malboro",
                housing: "Lavender Beds",
                ward: 13,
                plot: 36
              }
            }
          ],
          backgroundColor: "paleVioletRed",
          borderColor: "darkRed"
        }
      ]
    }
  },
  computed: {
    getAllEvents() {
      let events = [];
      for (let source of this.eventSources) {
        events = events.concat(source.events)
      }
      return events;
    }
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

  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

body, #app, #content {
  background-color: $backgroundColor;
}

#content {
  padding: 10px;
}

#calendarContainer {
  background-color: $maingroundColor;
  height: 750px;
}
</style>
