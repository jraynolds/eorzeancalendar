<template>
    <transition name="fade">
        <div class="eventCard" :class="event.categories" :id="toCamelCase(event.title)" :style="{ backgroundColor: getActiveCategory.backgroundColor }" v-if="isShowing">
            <div class="eventCard__header">
                <Timer :event="event" @alarmToggle="$emit('alarmToggle')"/>
                <p class="eventCard__time">{{ event.stringTime }}</p>
                <p class="eventCard__categories">
                    <span class="eventCard__category" :key="index" v-for="(category, index) of event.categories">
                        <span class="eventCard__catSplit" v-if="index != 0">, </span>
                        <a @click="toggleAllOthers(category)">{{ category }}</a>
                    </span>
                </p>
            </div>
            <a :href="event.link" target="_blank">
                <div class="eventCard__image" :style="{backgroundImage: 'url(' + require('@/assets/images/events/headers/' + event.header) + ')'}"></div>
                <h2 class="eventCard__title">{{ event.title }}</h2>
            </a>
            <p class="eventCard__desc">{{ event.description }}</p>
            <p class="eventCard__loc">
                <span class="eventCard__world">{{ event.location.world }}: </span>
                <span class="eventCard__housing">{{ event.location.housing }}, </span>
                <span class="eventCard__ward">ward {{ event.location.ward }} </span>
                <span class="eventCard__plot">plot {{ event.location.plot }}</span>
            </p>
        </div>
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
    width: 320px;
    height: 400px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 20px;

    text-align: center;

    // transition: 1s background-color;

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

        a {
          cursor: pointer;  
        }
    }

    &__image {
        height: 200px;
        background-position: center;
        background-size: cover;
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

    &__loc {
        text-align: left;
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