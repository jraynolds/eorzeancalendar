<template>
	<v-app>
		<span id="bg"></span>
		<v-app-bar
			color="rgba(255, 255, 255, 0.8)"
			class="mb-0"
			height="80px"
      style="box-shadow: 0 0 5px 10px rgba(255, 255, 255, 0.8);"
		>
			<!-- hide-on-scroll -->
			<Head/>
		</v-app-bar>
		<v-content 
			id="content"
		>
      <v-container>
        <v-row
          class="pt-7 justify-center"
        >
          <v-col
            class="flex-grow-1 flex-column"
            style="max-width: 1480px;"
          >
            <div id="calendarAndCategories" class="whiteShadow">
              <div id="calendarContainer">
                <FullCalendar :eventSources="getEventSources"/>
              </div>
              <Categories :categories="getActiveCategories" @showingToggle="setCookies"/>
            </div>
            <EventCards :events="getCurrentEvents" :categories="categories" @alarmToggle="setCookies" @showingToggle="setCookies"/>
          </v-col>
        </v-row>
      </v-container>
		</v-content>
	</v-app>
</template>

<script>
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies);

import Head from '@/components/Head.vue'
import FullCalendar from '@/components/FullCalendar.vue'
import Categories from '@/components/Categories.vue'
// import EventForm from '@/components/EventForm.vue'
import EventCards from '@/components/EventCards.vue'
// import Foot from '@/components/Foot.vue'

const fb = require('@/firebaseConfig.js')
import categories from '@/assets/data/categories.json'

import shared from '@/assets/scripts/shared.js'
import dbActions from '@/assets/scripts/dbActions.js'

export default {
  name: 'app',
  components: {
    Head,
    FullCalendar,
    Categories,
    // EventForm,
    EventCards,
    // Foot
  },
  data() {
    categories
    return {
      events: [],
      categories: categories,
      ticker: null,
      addEvent: false,
      includeTemporary: false
    }
  },
  computed: {
    getEventSources() {
      let sources = [];

      for (let key in this.categories) {
        let category = this.categories[key];
        if (!category.isShowing) continue;

        let source = {};
        source.title = category.title;
        source.backgroundColor = category.backgroundColor;
        source.borderColor = category.borderColor;
        source.textColor = category.textColor;
        source.events = [];
        sources.push(source);
      }

      let unhiddenEvents = [];
      eventLoop:
      for (let event of this.events) {
        for (let key of event.categories) {
          let category = this.categories[key];
          if (category.isHidden) continue eventLoop;
        }
        unhiddenEvents.push(event);
      }

      for (let event of unhiddenEvents) {
        for (let key of event.categories) {
          let category = this.categories[key];
          if (!category.isShowing) continue;
          else {
            for (let source of sources) {
              if (source.title.toLowerCase() == category.title.toLowerCase()) {
                source.events.push(event);
                break;
              }
            }
            break;
          } 
        }
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
        eventStart = shared.parseEventTime(event.startTime);
      } else if (event.start) { // This is a one-time event.
        eventStart = shared.parseEventTime(event.start);
      }
      return (now - eventStart >= 0 && now - eventStart < margin);
    },
    alarm(event) {
      let alarmString = `${event.title} is beginning!`;
      
      alert(alarmString);
      if (Notification.permission == "granted") new Notification(alarmString);

      event.hasRungToday = true;
    },
    setCookies() {
      // Set shown categories
      let shownCategories = {};
      for (let category in this.categories) shownCategories[category] = this.categories[category].isShowing;
      this.$cookies.set("categoriesShowing", shownCategories);
      
      // Set hidden categories
      let hiddenCategories = {};
      for (let category in this.categories) hiddenCategories[category] = this.categories[category].isHidden;
      this.$cookies.set("categoriesHidden", hiddenCategories);
      
      // Set alarmed events
      let alarmedEvents = {};
      for (let event of this.events.filter(e => e.isAlarmed)) alarmedEvents[event.title] = true;
      this.$cookies.set("alarmedEvents", alarmedEvents);
    },
    readCookies() {
      let categoriesShowing = this.$cookies.get("categoriesShowing");
      for (let category in categoriesShowing) this.categories[category].isShowing = categoriesShowing[category];

      let categoriesHidden = this.$cookies.get("categoriesHidden");
      for (let category in categoriesHidden) this.categories[category].isHidden = categoriesHidden[category];

      let alarmedEvents = this.$cookies.get("alarmedEvents");
      for (let alarmed in alarmedEvents) {
        for (let event of this.events) {
          if (event.title == alarmed) event.isAlarmed = alarmedEvents[alarmed];
        }
      }
    },
  },
  beforeMount() {
    let vm = this;
    fb.db.collection("events").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (!this.includeTemporary && doc.data().isTemporary) return;
        vm.events.push(dbActions.parseIntoEvent(doc.data(), this.includeTemporary));
      });
      this.addEventsToCategories();
      if (this.$cookies.keys().length == 0) this.setCookies();
      else this.readCookies();
      this.timeTicker();
    });
  },
  mounted() {
  }
}
</script>

<style>
/* STYLING CLASSES */
.whiteShadow {
	background-color: rgba(255, 255, 255, 0.8);
	box-shadow: 0 0 5px 10px rgba(255, 255, 255, 0.8);
	margin-bottom: 30px;
}

/* Body elements */

#bg {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	background-image: url("./assets/images/wallpaper.png");
	background-attachment: fixed;
}

header {
		height: 200px;
}

#calendarContainer {
	height: 790px;
}

.v-app-bar {
  position: unset;
}

/* FADE animation class */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>