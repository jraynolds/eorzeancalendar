<template>
	<div id="head" style="height: 80px; width: 100%; display: grid; grid-template-columns: 1fr 600px 1fr;">
		<div style="display: flex; align-items: flex-end;">
			<div class="disclaimer">All times in PST. Crystal datacenter only, for now.</div>
		</div>
		<v-row
			justify="center"
		>
			<span class="headTitle">Eorzean</span>
			<v-img
				alt="Calendar Logo"
				class="shrink mx-6"
				contain
				src="@/assets/images/calendar.svg"
				transition="scale-transition"
				height="80"
				width="80"
			/>
			<span class="headTitle">Calendar</span>
		</v-row>
		<div class="justify-end" style="display: flex; align-items: flex-end;">
			<AddEventForm/>
		</div>
	</div>
</template>

<script>
import AddEventForm from '@/components/AddEventForm.vue'

export default {
	components: {
		AddEventForm
	}	
}
</script>

<style scoped>
@font-face {
	font-family: "coolvetica";
	src: url("../assets/fonts/coolvetica rg.ttf") format('truetype');
	font-weight: normal;
	font-style: normal;
}

.headTitle {
	font-family: 'coolvetica', Helvetica, Arial, sans-serif;
	font-size: 50pt;
	height: 80px;

	display: flex;
	align-items: center;
}

.disclaimer {
	font-size: 10pt;
}
</style>