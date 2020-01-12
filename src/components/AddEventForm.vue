<template>
	<v-dialog v-model="dialog" persistent max-width="600px">
		<template v-slot:activator="{ on }">
			<v-btn color="blue-grey darken-3" dark v-on="on">Event+</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="headline">Submit a new Event</span>
			</v-card-title>
			<v-card-text>
			<v-container>
				
				<v-row>
					<v-col cols="12"><span class="title">Basic Info</span></v-col>

					<v-col cols="12" sm="6" md="6">
						<v-text-field label="Title of event*" required v-model="event.title"/>
					</v-col>
					<v-col cols="12" sm="6" md="6">
						<v-text-field label="Organization name*" required v-model="event.org"/>
					</v-col>
					<v-col cols="12">
						<v-textarea 
							label="Event description*" 
							counter="160" 
							:rules="[v => v.length <= 160 || 'Max 160 characters.']" 
							value=""
							rows=2 
							required
							v-model="event.description"
							no-resize
						/>
					</v-col>
					
					<v-col cols="12" sm="6" md="4">
						<v-text-field label="Website" v-model="event.link"></v-text-field>
					</v-col>
					
					<v-col cols="12" sm="6" md="4">
						<v-text-field label="Event pic link" v-model="event.header"></v-text-field>
					</v-col>
					
					<v-col cols="12" sm="6" md="4">
						<v-text-field label="Logo link" v-model="event.logo"></v-text-field>
					</v-col>

					<v-col class="title pb-0" cols="12">Scheduling</v-col>

					<v-col class="pt-0" cols="12">
						<v-radio-group v-model="isRecurring">
							<v-row>
								<v-col cols="6" align="center">
									<v-radio label="One-time Event" :value="false" />
								</v-col>
								<v-col cols="6">
									<v-radio label="Recurring Event" :value="true" />
								</v-col>
							</v-row>
						</v-radio-group>
					</v-col>

					<v-col cols="6" align="center">
						<span class="subtitle">Event beginning*</span>
						<v-time-picker width="190" required v-model="event.startTime"/>
					</v-col>
					<v-col cols="6" align="center">
						<span class="subtitle">Event end*</span>
						<v-time-picker width="190" required v-model="event.endTime"/>
					</v-col>

					<v-row justify="center">
						<v-col cols="12" md="6">
							<span v-if="!isRecurring">Date of event*</span>
							<span v-if="isRecurring">Date of next event*</span>
							<v-date-picker show-current width="auto" required v-model="event.startDate"/>
						</v-col>
						<v-col v-if="isRecurring" cols="12" md="6">
							<span>Date of final event</span>
							<v-date-picker show-current width="auto" required v-model="event.endDate"/>
						</v-col>
					</v-row>

					<v-row v-if="isRecurring">
						<v-col class="pb-0" cols="12">
							<span class="subtitle">Days occurring</span>
						</v-col>
						<v-row cols="12">
							<v-col class="pt-0" v-for="day of event.daysOfWeek" :key="day.title">
								<v-checkbox :label="day.title" v-model="day.isChecked"/>
							</v-col>
						</v-row>
					</v-row>

					<v-col class="title pb-0" cols="12">Location</v-col>
					<v-row>
						<v-col cols="4">
							<v-select
								:items="event.location.datacenter.items"
								v-model="event.location.datacenter.value"
								label="Datacenter*"
								disabled
							/>
						</v-col>
						<v-col cols="4">
							<v-select
								:items="event.location.world.items"
								v-model="event.location.world.value"
								label="World*"
							/>
						</v-col>
						<v-col cols="4">
							<v-select
								:items="event.location.housing.items"
								v-model="event.location.housing.value"
								label="Housing*"
							/>
						</v-col>
						<v-col cols="2">
							<v-select
								:items="event.location.plot.items"
								v-model="event.location.plot.value"
								label="Plot*"
								required
							/>
						</v-col>
						<v-col cols="2">
							<v-select
								:items="event.location.ward.items"
								v-model="event.location.ward.value"
								label="Ward*"
							/>
						</v-col>
					</v-row>

					<v-col class="title pb-0" cols="12">Categories</v-col>
					<v-col class="pb-0" cols="12">Select all that apply.</v-col>
					<v-row cols="12">
						<v-col class="pt-0" cols="2" v-for="category of event.categories" :key="category.title">
							<v-checkbox :label="category.title" v-model="category.isChecked"/>
						</v-col>
					</v-row>

				</v-row>
			</v-container>
			<small>*indicates required field</small>
			</v-card-text>
			<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="blue-grey darken-3" text @click="dialog = false">Close</v-btn>
			<v-btn color="blue-grey darken-3" text :disabled="!isReadyToSubmit" @click="dialog = false; submitNewEvent()">Submit</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import dbActions from '@/assets/scripts/dbActions.js'

export default {
	data() {
		return {
			dialog: false,
			isRecurring: false,
			event: {
				isTemporary: true,
				title: "",
				org: "",
				description: "",
				link: "",
				header: "",
				logo: "",
				startDate: "",
				startTime: "",
				endTime: "",
				endDate: "",
				daysOfWeek: [
					{
						title: "Su",
						isChecked: false
					},
					{
						title: "M",
						isChecked: false
					},
					{
						title: "T",
						isChecked: false
					},
					{
						title: "W",
						isChecked: false
					},
					{
						title: "Th",
						isChecked: false
					},
					{
						title: "F",
						isChecked: false
					},
					{
						title: "Sa",
						isChecked: false
					},
				],
				location: {
					datacenter: {
						items: ["Crystal"],
						value: "Crystal"
					},
					world:  {
						items: ["Balmung", "Brynhildr", "Coeurl", "Diabolos", "Goblin", "Malboro", "Mateus", "Zalera"],
						value: "",
					},
					housing:  {
						items: ["Mist", "Lavender Beds", "Goblet", "Shirogane"],
						value: "",
					},
					ward: {
						items: Array.from({length:40},(v,k)=>k+1),
						value: "",
					},
					plot: {
						items: Array.from({length:40},(v,k)=>k+1),
						value: "",
					},
				},
				categories: [
					{
						title: "club",
						isChecked: false
					},
					{
						title: "spa",
						isChecked: false
					},
					{
						title: "bar",
						isChecked: false
					},
					{
						title: "art",
						isChecked: false
					},
					{
						title: "fc",
						isChecked: false
					},
					{
						title: "prizes",
						isChecked: false
					},
					{
						title: "games",
						isChecked: false
					},
					{
						title: "nsfw",
						isChecked: false
					},
				]
			}
		}
	},
	computed: {
		isReadyToSubmit() {
			let event = this.event;

			if (this.isRecurring && event.daysOfWeek.filter(d => d.isChecked).length == 0) return false;
			let isReady = event.title != "" && event.org != "" && event.description != "" && event.startTime != "" && event.endTime != "" && event.startDate != "" && event.location.datacenter.value != "" && event.location.world.value != "" && event.location.housing.value != "" && event.location.plot.value != "" && event.location.ward.value != "";
			// eslint-disable-next-line no-console
			console.log(isReady);
			return isReady;
		}
	},
	methods: {
		submitNewEvent() {
			let event = {};
			event.title = this.event.title;
			event.org = this.event.org;
			event.description = this.event.description;
			event.link = this.event.link;
			event.header = this.event.header;
			event.startDate = this.event.startDate;
			event.startTime = this.event.startTime;
			event.endTime = this.event.endTime;
			event.endDate = this.event.endDate;

			if (this.isRecurring) {
				// eslint-disable-next-line no-console
				console.log(this.event.daysOfWeek);
				event.daysOfWeek = [];
					// eslint-disable-next-line no-console
					console.log(this.event.daysOfWeek);
				for (let i=0; i<this.event.daysOfWeek.length; i++) {
					// eslint-disable-next-line no-console
					console.log(this.event.categories[i]);
					if (this.event.daysOfWeek[i].isChecked) event.daysOfWeek.push(i);
				}
			}

			event.categories = [];
					// eslint-disable-next-line no-console
					console.log(this.event.categories);
			for (let i=0; i<this.event.categories.length; i++) {
			// eslint-disable-next-line no-console
				console.log(this.event.categories[i]);
				if (this.event.categories[i].isChecked) event.categories.push(this.event.categories[i].title);
			}

			event.location = {};
					// eslint-disable-next-line no-console
					console.log(this.event.location);
			for (let key in this.event.location) {
				event.location[key] = this.event.location[key].value;
			}

			// eslint-disable-next-line no-console
			console.log(event);

			dbActions.pushEvent(event);
		}
	}
}
</script>