<template>
	<div class="category-container" :class="{ hovered: category.hoveredThisInstance }" >
		<div class="category-button" :style="[category.isShowing ? {border: '2px solid ' + category.backgroundColor, backgroundColor: category.backgroundColor} : {border: '2px solid ' + category.backgroundColor}]" @click="category.isShowing = !category.isShowing" @mouseenter="category.isHovered = true; category.hoveredThisInstance = true" @mouseleave="category.isHovered = false"/>
		<span class="category-title" :style="{ color: category.backgroundColor }">{{ category.title }}</span>
	</div>
</template>

<script>
export default {
	props: [ "category", "categoriesHovered" ],
	data() {
		return {
		}
	}
}
</script>

<style lang="scss" scoped>
.category-container {
	display: grid;
	grid-template-columns: 30px 1fr;
	height: 100%;
	max-width: 30px;

	transition: .5s all;
}

.category-container.hovered {
	max-width: 100px;
}

.category-button {
  height: 100%;
  width: 30px;
  border-radius: 5px;
  transition: 1s all;
  box-sizing: border-box;
}

.category-title {
	height: 100%;
	width: auto;
	display: flex;
	align-items: center;
}

.category-title {
	margin-left: 10px;
}
</style>