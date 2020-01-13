<template>
	<div id="head" style="width:100%;">
		<v-row>
			<v-col cols="2" style="align-self: flex-end">
				<DatacenterPicker v-on:server-selected="$emit('server-selected', $event)"/>
			</v-col>
			<v-col cols="8">
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
			</v-col>
			<v-col cols="2" align="end" style="align-self: flex-end;">
				<AddEventForm/>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import AddEventForm from '@/components/AddEventForm.vue'
import DatacenterPicker from '@/components/DatacenterPicker.vue'

export default {
	components: {
		AddEventForm,
		DatacenterPicker
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

	color: #37474F;

	display: flex;
	align-items: center;
}

.disclaimer {
	font-size: 10pt;
}
</style>