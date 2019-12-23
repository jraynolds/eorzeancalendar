<template>
    <div id="eventCards">
        <EventCard :event="event" :key="event.id" v-for="event in events"/>
    </div>
</template>

<script>
import EventCard from "./EventCard.vue"

export default {
    props: [ "events" ],
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
    justify-content: center;
    align-items: center;   
}
</style>