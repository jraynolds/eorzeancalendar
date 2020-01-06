<template>
    <div id="head" class="whiteShadow">
        <span class="spacer"/>
        <div id="title" style="flex-grow: 1;">
            <span id="titleStart">Eorzean</span>
            <img src="@/assets/images/calendar.svg"/>
            <span id="titleEnd">Calendar</span>
        </div>
        <span class="spacer">All times in PST. Crystal datacenter only, for now.</span>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
@font-face {
    font-family: "coolvetica";
    src: url("../assets/fonts/coolvetica rg.ttf") format('truetype');
    font-weight: normal;
    font-style: normal;
}

#head {
    font-family: 'coolvetica', Helvetica, Arial, sans-serif;
    height: 80px;
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 600px 1fr;
}

img {
    height: 80px;
    margin-left: 20px;
    margin-right: 20px;
}

#title {
    display: flex;
    align-items: center;
    font-size: 50pt;
}

.spacer {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    align-items: flex-end;
    padding-right: 20px;
}
</style>