<template>
	<div class="category-outline" :class="{ hovered: category.hoveredThisInstance }">
		<div class="category-container" :class="{ hovered: category.hoveredThisInstance }">
			<div class="category-button" :style="computedStyle" @click="categoryClick" @mouseenter="category.isHovered = true; category.hoveredThisInstance = true" @mouseleave="category.isHovered = false">
				<transition name="fade">
					<span class="category-x" :style="{ textShadow: `1px 1px 0 black` }" v-if="category.isHidden">X</span>
				</transition>
			</div>
		</div>
		<span class="category-title" :style="{ color: category.backgroundColor, textShadow: `1px 1px 0 black` }">{{ category.title }}</span>
	</div>
</template>

<script>
export default {
	props: [ "category", "categoriesHovered" ],
	computed: {
		computedStyle() {
			if (this.category.isShowing) {
				return {
					color: this.category.backgroundColor,
					border: '2px solid ' + this.category.backgroundColor, 
					backgroundColor: this.category.backgroundColor
				}
			} else if (this.category.isHidden) {
				return {
					color: this.category.backgroundColor,
					border: '2px solid ' + this.category.backgroundColor
				}
			} else {
				return {
					color: this.category.backgroundColor,
					border: '2px solid ' + this.category.backgroundColor
				}
			}
		}
	},
	methods: {
		categoryClick() {
			if (this.category.isShowing) {
				this.category.isShowing = false;
			} else if (this.category.isHidden) {
				this.category.isShowing = true;
				this.category.isHidden = false;
			} else {
				this.category.isHidden = true;
			}

			this.$emit('showingToggle');
		}
	}
}
</script>

<style lang="scss" scoped>
.category-outline {
	height: 100%;
	max-width: 30px;
	display: grid;
	grid-template-columns: 30px 1fr;
}

.category-container, .category-outline {
	height: 100%;
	max-width: 30px;

	transition: .5s all;
}

.category-container.hovered, .category-outline.hovered {
	max-width: 200px;
}

.category-button {
	height: 100%;
	width: 30px;
	border-radius: 5px;
	transition: 1s all;
	box-sizing: border-box;
	cursor: pointer;

	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.4em;
}

.category-title {
	height: 100%;
	width: auto;
	display: flex;
	align-items: center;
	font-size: 1.5em;
}

.category-title {
	margin-left: 10px;
}
</style>