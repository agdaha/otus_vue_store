<template>
    <h2>Category</h2>
    <div class="filter">
        <div v-for="c in categoryList" :key="c">
            <input type="checkbox" :name=c[0] v-model="c[1]" @change="emit('toggle', c)"><span>{{ c[0] }}</span>
        </div>
    </div>
</template>

<script setup>
    const emit = defineEmits(['toggle'])
    const props = defineProps(['categoryList']);
</script>

<style scoped>
.filter {
    margin: 0 20px;
}
</style>