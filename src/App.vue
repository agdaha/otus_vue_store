<script setup>
  import { computed, reactive, ref } from 'vue'
  import Card from './components/Card.vue';
  import CategoryFilter from './components/CategoryFilter.vue';

  const products = ref([]);
  const categories = reactive(new Map());
  const filteredProducts = computed(() => {
    return products.value.filter((p) => categories.has(p.category) && categories.get(p.category));
  })

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products.value = data;
      const categorySet = new Set();
      for (let p of products.value) {
        categorySet.add(p.category);
      }
      for (let p of categorySet.values()) {
        categories.set(p, true);
      }
    })

  const toggleCategory = function (c) {
    if (categories.has(c[0])) categories.set(c[0], c[1])
  }

  const selectOne = function (category) {
    for (let key of categories.keys()) {
      if (key === category) {
        categories.set(key, true)
      } else {
        categories.set(key, false)
      }
    }
  }
</script>

<template>
  <header>
    <div class="logo">
      <a href="#">
        <img alt="Store logo" src="./assets/logo.svg" width="64" height="64" />
      </a>
      <h1>Online Store</h1>
    </div>
    <div class="wrapper">
      <div class="nav"></div>
    </div>
  </header>

  <aside style="float: right; width: 15%">
    <category-filter @toggle="toggleCategory" :categoryList=categories></category-filter>
  </aside>

  <main style="width: 85%;">
    <h2>Products</h2>

    <div class="products">
      <card class="product-card" @selected="selectOne" :product="product" v-for="product in filteredProducts"
        :key="product.id" />
    </div>
  </main>

  <footer></footer>
</template>

<style scoped>
  .logo {
    display: flex;
    align-items: center;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  header {
    width: 100%;
    display: flex;
    justify-items: start;
    text-align: start;
  }

  h1 {
    font-size: 3em;
  }

  aside {
    margin: 0 30px
  }

  .categories {
    float: right;
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: auto;
  }

  .products {
    grid-gap: 10px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    justify-items: center;
    align-items: stretch;
    justify-content: flex-start;
    transform: translateZ(0);
  }

  .product-card {
    grid-column-start: span 3;
    height: 100%;
    width: 100%;
    align-items: stretch;
    border-top: 1px solid rgba(204, 214, 228, .6);
    box-sizing: border-box;
    color: #070707;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    justify-content: flex-start;
    justify-self: stretch;
    position: relative;
  }
</style>