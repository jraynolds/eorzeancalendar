<template>
    <div id="eventCards">
        <EventCard :event="event" @alarmToggle="$emit('alarmToggle')" :categories="categories" :key="event.id" v-for="event of this.events"/>
    </div>
</template>

<script>
import EventCard from "./EventCard.vue"

export default {
    props: [ "events", "categories" ],
    components: {
        EventCard
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