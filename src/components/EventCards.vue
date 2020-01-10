<template>
    <div id="eventCards">
        <EventCard :event="event" @alarmToggle="$emit('alarmToggle')" @showingToggle="$emit('showingToggle')" :categories="categories" :key="event.id" v-for="event of organizedEvents"/>
    </div>
</template>

<script>
import EventCard from "./EventCard.vue"

import shared from '@/assets/scripts/shared.js'

export default {
    props: [ "events", "categories" ],
    components: {
        EventCard
    },
    computed: {
        organizedEvents() {
            let today = new Date();
            let sorted = [...this.events].sort(function(a, b) {
                if (shared.isCurrentlyOccurring(a)) return -1;
                else if (shared.isCurrentlyOccurring(b)) return 1;
                else return (shared.getNextDate(a) - today) - (shared.getNextDate(b) - today)
            });
            return sorted;
        }
    }
}
</script>

<style scoped>
#eventCards {
    margin-top: 20px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;   
}
</style>