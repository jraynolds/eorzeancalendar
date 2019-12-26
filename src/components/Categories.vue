<template>
    <div id="categories" @mouseenter="categoriesIsHovered = true" @mouseleave="removeHover">
        <Category :category="category" :key="category.id" v-for="category in categories" :categoriesIsHovered="categoriesIsHovered"/>
    </div>    
</template>

<script>
import Category from "@/components/Category.vue"

export default {
    components: {
        Category
    },
    props: [ "categories" ],
    data() {
        return {
            categoriesIsHovered: false,
        }
    },
    methods: {
        removeHover() {
            this.categoriesIsHovered = false;
            for (let component of this.categories) {
                component.hoveredThisInstance = false;
            }
        }
    }
}
</script>

<style lang="scss">
#categories {
    margin-top: 10px;
    height: 30px;
    display: flex;
    width: 100%;

    align-items: center;
}

#categories > div {
    margin-right: 10px;
    overflow: hidden;
}
</style>