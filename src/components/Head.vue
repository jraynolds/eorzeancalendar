<template>
    <div id="head">
        <img src="@/assets/images/calendar.svg"/>
        <span id="pageTitle">Eorzean Calendar</span>
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
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    background-color: slategray;
}

img {
    height: 100%;
    margin-left: 20px;
    margin-right: 20px;
}

#pageTitle {
    font-size: 50pt;
}
</style>