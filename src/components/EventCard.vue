<template>
	<transition name="fade">
		<v-card 
			class="eventCard flex-column mr-4 mb-4"
			height="420px"
			width="320px"
			style="overflow: hidden;"
			:class="event.categories" 
			:id="toCamelCase(event.title)" 
			:style="{ backgroundColor: getActiveCategory.backgroundColor }" 
			v-if="isShowing"
		>
			<v-row class="pb-0 font-italic flex-grow-0">
				<v-col class="flex-grow-0 pr-0 pt-0 pb-0">
					<Timer :event="event" @alarmToggle="$emit('alarmToggle')"/>
				</v-col>
				<v-col class="text-left pl-0 pt-0 pb-0 flex-grow-1">
					{{ timeString }}
				</v-col>
				<v-col class="text-right pt-0 pb-0 pr-4 flex-grow-0" style="display: flex;">
					<span :key="index" v-for="(category, index) of event.categories" style="display: flex;">
						<span v-if="index != 0" style="margin-right: 2px;">,</span>
						<a @click="toggleAllOthers(category)">{{ category }}</a>
					</span>
				</v-col>
			</v-row>
			<a :href="event.link" target="_blank">
				<v-img
					height="200px"
					:alt="event.title + ' Header'"
					:src="require('@/assets/images/events/headers/' + event.header)"
				/>
				<h2>{{ event.title }}</h2>
			</a>
			<v-col align-center class="flex-grow-1 py-0 align-center" style="font-size: .9em;">{{ event.description }}</v-col>
			<v-col class="font-italic py-0 px-1 flex-grow-0 text-left" style="font-size: .8em;">{{ locationString }}</v-col>
		</v-card>
	</transition>
</template>

<script>
import Timer from './Timer.vue'

import shared from '@/assets/scripts/shared.js'

export default {
	props: [ "event", "categories", "notificationsEnabled" ],
	components: {
		Timer
	},
	computed: {
		getActiveCategory() {
			for (let category of this.event.categories) {
				if (this.categories[category].isShowing) return this.categories[category];
			}
			return null;
		},
		isShowing() {
			let isShowing = false;
			for (let category of this.event.categories) {
				if (this.categories[category].isHidden) return false;
				if (this.categories[category].isShowing) isShowing = true;
			}
			return isShowing;
		},
		timeString() {
			if (this.event.stringTime) return this.event.stringTime;
			let start = null;
			let end = null;
			let m = "AM";
			let endString = "";
			if (this.event.startTime) { // This is a recurring event.
				start = shared.parseEventTime(this.event.startTime);
				end = shared.parseEventTime(this.event.endTime);
				let daysOfWeek = this.event.daysOfWeek;
				if (daysOfWeek.length == 2 && daysOfWeek.includes(0) && daysOfWeek.includes(6)) {
					endString = "Weekends";
				} else if (daysOfWeek.length == 2 && daysOfWeek.includes(1) && daysOfWeek.includes(2) && daysOfWeek.includes(3) && daysOfWeek.includes(4) && daysOfWeek.includes(5)) {
					endString = "Weekdays";
				} else if (daysOfWeek.length == 7) {
					endString = "Daily";
				} else {
					const dayNames = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
					for (let day of this.event.daysOfWeek) endString += dayNames[day] + ", ";
					endString = endString.slice(0, endString.length-2);
				}
			} else { // This is a one-time event.
				start = shared.parseEventTime(this.event.start);
				end = shared.parseEventTime(this.event.end);
				const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
				endString = monthNames[start.getMonth()] + " " + start.getDay();
			}

			if (end.getHours() > 12) m = "PM";

			return `${start.getHours() - 12}-${Math.abs(end.getHours() - 12)} ${m}, ${endString}`
		},
		locationString() {
			return `${this.event.location.world}: ${this.event.location.housing}, ward ${this.event.location.ward} plot ${this.event.location.plot}`
		}
	},
	methods: {
		toggleAllOthers(catKey) {
			for (let key in this.categories) {
				this.categories[key].isShowing = false;
			}
			this.categories[catKey].isShowing = true;
			this.$emit('showingToggle');
		}
	},
	created() {
			this.toCamelCase = shared.toCamelCase
	}
}
</script>

<style lang="scss" scoped>
$cardBackColor: white;
$cardFontColor: #2c3e50;

.eventCard {
	background-color: $cardBackColor; 
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding: 10px;
	text-align: center;

	a {
		cursor: pointer;  
		font-weight: bold;
		text-decoration: none;
		color: $cardFontColor;
	}
}
</style>