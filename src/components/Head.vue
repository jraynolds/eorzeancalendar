<template>
    <div id="head" class="whiteShadow">
        <span id="titleStart">Eorzean</span>
            <img src="@/assets/images/calendar.svg"/>
        <span id="titleEnd">Calendar</span>
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
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    height: 100%;
    margin-left: 20px;
    margin-right: 20px;
}

#titleStart, #titleEnd {
    font-size: 50pt;
}
</style>