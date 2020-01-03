<template>
    <img :src="require('@/assets/images/bell.png')" @mouseenter="isHovered = true" @mouseleave="isHovered = false" :class="{hovered: isHovered}" @click="timerClick" :style="[isClicked ? {opacity: 1} : {}]"/>
</template>

<script>
export default {
    props: [ "event" ],
    methods: {
        timerClick() {
            if (this.isClicked) {
                this.isClicked = false;
                this.event.isAlarmed = false;
            } else {
                if(!("Notification" in window)) {
                    alert("This browser does not support notifications.");
                    this.isClicked = false;
                    return;
                }
                // eslint-disable-next-line no-console
                console.log(Notification.permission);
                if (Notification.permission != "granted") {
                    Notification.requestPermission().then(function() {
                        if (Notification.permission != "granted") return;
                    });
                }
                this.event.isAlarmed = true;
                this.isClicked = true;
            }

            this.$emit('alarmToggle')
        }
    },
    data() {
        return {
            isHovered: false,
            isClicked: false
        }
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 20px;
    height: 20px;

    margin-top: -2px;
    margin-left: -2px;

    cursor: pointer;
    opacity: .4;
}

.hovered {
    opacity: .6;
}
</style>