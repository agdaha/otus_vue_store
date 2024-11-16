<template>
    <div class="card">
        <div class="image" :style="bgImg">
        </div>
        <div class="price">
            <span> Price </span>
            <span>{{ product.price }}$</span>
        </div>
        <div class="title tooltip">
            <a href="#">
                {{ product.title }}
            </a>
            <span class="tooltiptext">{{ product.description }}</span>
        </div>
        <div class="category"><i>Category:&nbsp; </i>
            <div class="category-item" @click="emit('selected', product.category)"><b>{{ product.category }}</b></div>
        </div>

        <!-- <div>{{ product.description }}</div> -->
        <div class="rate">
            <div>
                {{ product.rating.rate }} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="q2"
                    style="color: rgb(255, 168, 0);">
                    <path fill="currentColor"
                        d="M8 2a1 1 0 0 1 .87.508l1.538 2.723 2.782.537a1 1 0 0 1 .538 1.667L11.711 9.58l.512 3.266A1 1 0 0 1 10.8 13.9L8 12.548 5.2 13.9a1 1 0 0 1-1.423-1.055l.512-3.266-2.017-2.144a1 1 0 0 1 .538-1.667l2.782-.537 1.537-2.723A1 1 0 0 1 8 2">
                    </path>
                </svg>
            </div>

            <div> feedbacks: {{ product.rating.count }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue"
const emit = defineEmits(['selected'])
const props = defineProps(['product'])
const bgImg = computed(() => {
    return `background-image: url("${props.product.image}")`
})
</script>

<style scoped>
.card {
    padding: 15px;
    background-color: white;
    border-radius: 30px;
}

.image {
    /* margin: 20px; */
    aspect-ratio: 1 / 1;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
}

img {
    width: 90%;
    height: auto;
    align-self: center;
}

.title,
.category,
.price,
.rate {
    padding: 10px 0;
}

.category {
    display: flex;
    font-weight: 300;
    font-size: small;
}

.category-item:hover {
    cursor: pointer;
}

.price,
.rate {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.price {
    font-size: larger;
}

.rate {
    font-size: medium;
}

a,
a:visited {
    color: #0f0f0fde;
}

a:hover {
    color: #535bf2;
}

.tooltip {
    position: relative;
    display: inline-block;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 300px;
    background-color: rgb(77, 73, 73);
    color: #ffffff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    font-size: small;
    position: absolute;
    z-index: 1;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>