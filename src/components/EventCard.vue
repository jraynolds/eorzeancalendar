<template>
    <div class="eventCard" :class="event.categories" :id="toCamelCase(event.title)" v-if="!hasPassed(event)" :style="{ backgroundColor: event.categories[0].backgroundColor }">
        <div class="eventCard__header">
            <p class="eventCard__time">{{ event.stringTime }}</p>
            <p class="eventCard__categories">
                <span class="eventCard__category" :key="index" v-for="(category, index) in event.categories">
                    <span class="eventCard__catSplit" v-if="index != 0">, </span>
                    <a href="">{{ category.title }}</a>
                </span>
            </p>
        </div>
        <div class="eventCard__image" :style="{backgroundImage: 'url(' + require('@/assets/images/events/headers/' + event.header) + ')'}"></div>
        <h2 class="eventCard__title">{{ event.title }}</h2>
        <p class="eventCard__desc">{{ event.description }}</p>
        <p class="eventCard__loc">
            <span class="eventCard__world">{{ event.location.world }}: </span>
            <span class="eventCard__housing">{{ event.location.housing }}, </span>
            <span class="eventCard__ward">ward {{ event.location.ward }} </span>
            <span class="eventCard__plot">plot {{ event.location.plot }}</span>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        event
    },
    methods: {
        // categoryToString(cat) {
        //     let spaced = cat.replace("_", " ");
        //     let camelCased = this.toCamelCase(spaced);
        //     return camelCased.charAt(0).toUpperCase() + camelCased.slice(1);
        // },
        toCamelCase(str) {
            let split = str.split(" ");
            let camelCased = split[0].toLowerCase();
            for (let i=1; i<split.length; i++) camelCased += split[i][0].toUpperCase() + split[i].slice(1);
            return camelCased;
        },
        hasPassed(event) {
            let currentTime = new Date();
            if (event.endTime) { // This is a repeating event.
                if (!event.endRecur) { // This event doesn't end.
                    return false;
                }
                return Date.parse(event.endRecur) < currentTime.getTime()
            } else { // This is a one-time event.
                return Date.parse(event.end) < currentTime.getTime()
            }
        }
    },
}
</script>

<style lang="scss" scoped>
$cardBackColor: white;
$cardFontColor: #2c3e50;

.eventCard {
    background-color: $cardBackColor; 
    width: 320px;
    height: 400px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px;

    &__header {
        display: flex;
    }

    &__time {
        display: flex;
        flex-grow: 1;
    }

    &__time, &__categories, &__desc, &__loc {
        margin-top: 0px;
        margin-bottom: 0px;
    }

    &__categories {
        text-align: right;
        font-style: italic;
    }

    &__image {
        height: 200px;
        background-position: center;
    }

    &__title {
        margin-top: 5px;
        margin-bottom: 0px;
    }

    &__desc {
        display: flex;
        align-items: center;
        flex-grow: 1;
        margin-top: 4px;
        margin-bottom: 10px;
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

.art {
    background-color: palegoldenrod;
}
</style>