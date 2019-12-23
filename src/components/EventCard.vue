<template>
    <div class="eventCard" :class="event.categories">
        <div class="eventCard__image" :style="{backgroundImage: 'url(' + require('@/assets/images/events/' + event.header) + ')'}"></div>
        <h2 class="eventCard__title">{{ event.title }}</h2>
        <p class="eventCard__time">{{ event.stringTime }}</p>
        <p class="eventCard__desc">{{ event.description }}</p>
        <p class="eventCard__loc">
            <span class="eventCard__world">{{ event.location.world }}: </span>
            <span class="eventCard__housing">{{ event.location.housing }}, </span>
            <span class="eventCard__ward">ward {{ event.location.ward }} </span>
            <span class="eventCard__plot">plot {{ event.location.plot }}</span>
        <p class="eventCard__categories">
            <span class="eventCard__category" :key="category" v-for="(category, index) in event.categories">
                <span class="eventCard__catSplit" v-if="index != 0">, </span>
                <a href="">{{ categoryToString(category) }}</a>
            </span>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        event
    },
    methods: {
        categoryToString(cat) {
            let spaced = cat.replace("_", " ");
            return this.toCamelCase(spaced);
        },
        toCamelCase(str) {
            let splits = str.split(" ");
            let joined = "";
            for(let s of splits) joined += s.charAt(0).toUpperCase() + s.substring(1) + " ";
            return joined.slice(0, -1);
        }
    }
}
</script>

<style lang="scss" scoped>
$cardBackColor: white;
$cardFontColor: #2c3e50;

.eventCard {
    background-color: $cardBackColor; 
    width: 300px;
    padding: 10px;

    &__image {
        height: 200px;
        background-position: center;
    }

    &__title {
        margin-top: 10px;
        margin-bottom: 0px;
    }

    &__time {
        margin-top: 0px !important;
    }

    p {
        margin-top: 4px;
        margin-bottom: 4px;
    }

    &__time, &__loc {
        font-style: italic;
    }

    a {
        font-weight: bold;
        text-decoration: none;
        color: $cardFontColor;
    }
}

.club {
    background-color: lightpink;
}

.nsfw {
    background-color: palevioletred;
}
</style>