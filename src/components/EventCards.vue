<template>
    <div id="eventCards">
        <EventCard :event="event" :categories="categories" :key="event.id" v-for="event of getUniqueEvents"/>
    </div>
</template>

<script>
import EventCard from "./EventCard.vue"

export default {
    props: [ "events", "categories" ],
    components: {
        EventCard
    },
    computed: {
        getUniqueEvents() {
            let uniqueEvents = [];
            for (let event of this.events) {
                if (!uniqueEvents.includes(event)) {
                    uniqueEvents.push(event);
                }
            }
            return uniqueEvents;
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