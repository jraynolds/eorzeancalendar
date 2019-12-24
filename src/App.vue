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
              logo: "lightwarden.png",
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
        },
        {
          name: "art",
          events: [
            {
              title: "A Stage Reborn",
              start: "2019-12-24T14:00:00-08:00",
              end: "2019-12-24T19:00:00-08:00",
              groupId: "StageReborn",
              header: "stageReborn.png",
              stringTime: "December 23rd from 2-7 PST",
              description: "A Stage Reborn is Eorzea's premier theatre troupe. All plays are performed in-game with the tools Square Enix provides to heighten the experience and draw the viewer in.",
              categories: ["art"],
              location: {
                datacenter: "Crystal",
                world: "Malboro",
                housing: "Lavender Beds",
                ward: 13,
                plot: 36
              }
            }
          ],
          backgroundColor: "paleGoldenRod",
          borderColor: "white",
          textColor: "black"
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
