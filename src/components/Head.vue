<template>
    <v-row no-gutters
        height="80px"
    >
        <v-col cols="1">
        </v-col>
        <v-col cols="10">
            <v-row
                justify="center"
                align="center"
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
        <v-col
            class="flex-wrap"
            cols="1"
            align="end"
            align-self="end"
        >
            <div class="disclaimer">All times in PST. Crystal datacenter only, for now.</div>
            <a href="https://forms.gle/2m5XAdM8dFCuRh638">
                <div class="disclaimer">
                    Click to submit your own.
                </div>
            </a>
        </v-col>
      </v-row>
</template>

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