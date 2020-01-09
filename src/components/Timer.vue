<template>
	<v-img 
		:src="require('@/assets/images/bell.png')"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
		:class="{hovered: isHovered}"
		@click="timerClick"
		:style="[event.isAlarmed ? {opacity: 1} : {}]"
		height="20px"
		width="20px"
	/>
</template>

<script>
export default {
	props: [ "event" ],
	methods: {
		timerClick() {
			if (this.event.isAlarmed) {
				this.event.isAlarmed = false;
			} else {
				if(!("Notification" in window)) {
					alert("This browser does not support notifications.");
					return;
				}
				if (Notification.permission != "granted") {
					Notification.requestPermission().then(function() {
						if (Notification.permission != "granted") return;
					});
				}
				this.event.isAlarmed = true;
			}

			this.$emit('alarmToggle')
		}
	},
	data() {
		return {
			isHovered: false
		}
	}
}
</script>

<style lang="scss" scoped>
.v-image {
	cursor: pointer;
	opacity: .4;

	margin-bottom: -2px
}

.hovered {
	opacity: .6;
}
</style>