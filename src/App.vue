<template>
  <div id="app">
    <Head/>
    <div id="content">
      <div id="calendarContainer">
        <FullCalendar :eventSources="categories"/>
      </div>
      <Categories :categories="getActiveCategories"/>
      <EventCards :events="getAllEvents"/>
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
    return {
      categories: {
        club: {
          title: "Club",
          backgroundColor: "mistyrose",
          borderColor: "darkred",
          textColor: "black",
          isShowing: true,
          isHovering: false,
          hoveredThisInstance: false,
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
              location: {
                datacenter: "Crystal",
                world: "Malboro",
                housing: "Lavender Beds",
                ward: 13,
                plot: 36
              }
            }
          ],
        },
        art: {
          title: "Art",
          backgroundColor: "palegoldenrod",
          borderColor: "white",
          textColor: "black",
          isShowing: true,
          isHovering: false,
          hoveredThisInstance: false,
          events: [
            {
              title: "A Stage Reborn",
              start: "2019-12-24T14:00:00-08:00",
              end: "2019-12-24T19:00:00-08:00",
              groupId: "StageReborn",
              header: "stageReborn.png",
              stringTime: "December 23rd from 2-7 PST",
              description: "A Stage Reborn is Eorzea's premier theatre troupe. All plays are performed in-game with the tools Square Enix provides to heighten the experience and draw the viewer in.",
              location: {
                datacenter: "Crystal",
                world: "Malboro",
                housing: "Lavender Beds",
                ward: 13,
                plot: 36
              }
            }
          ]
        },
        nsfw: {
          title: "NSFW",
          backgroundColor: "palevioletred",
          borderColor: "darkred",
          textColor: "white",
          isShowing: false,
          isHovering: false,
          hoveredThisInstance: false,
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
              location: {
                datacenter: "Crystal",
                world: "Malboro",
                housing: "Lavender Beds",
                ward: 13,
                plot: 36
              }
            }
          ],
        },
      }
    }
  },
  computed: {
    getAllEvents() {
      let events = [];
      // eslint-disable-next-line no-console
      console.log(this.categories)
      for (let category in this.categories) {
        category = this.categories[category];
        // eslint-disable-next-line no-console
        console.log(category);
        for (let event of category.events) {
          if (category.isShowing) events = events.concat(event)
        }
      }
      // eslint-disable-next-line no-console
      console.log(events);
      return events;
    },
    getActiveCategories() {
      let categories = [];
      for (let category of categories) {
        if (category.isShowing && category.events.length > 0) {
          categories.push(category);
        }
      }
      return categories;
    }
  },
  methods: {
    eventIsShowing(event) {
      // eslint-disable-next-line no-console
      console.log(event);
      for (let category in event.categories) {
        // eslint-disable-next-line no-console
        console.log(event.categories[category]);
        if (event.categories[category].isShowing) return true;
      }
      return false;
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
