<template>
  <header>
    <div class="logo">
      <a href="#">
        <img
          alt="Store logo"
          src="./assets/img/logo.svg"
          width="64"
          height="64"
        />
      </a>
      <h1>Online Store</h1>
    </div>
    <div class="wrapper">
      <div class="nav">
        <cart :itemCount="0" :sumItemsPrice="0"></cart>
      </div>
    </div>
  </header>

  <aside style="float: left; width: 15%; min-width: 250px">
    <category-filter
      @toggle="toggleCategory"
      :categoryList="categories"
    ></category-filter>
  </aside>

  <main>
    <div class="products-header">
      <h2>Products</h2>
      <search-panel @onsearch="changeSearchString"></search-panel>
    </div>

    <div class="products">
      <card
        class="product-card"
        @selected="selectOne"
        :product="product"
        v-for="product in filteredProducts"
        :key="product.id"
      />
    </div>
  </main>

  <footer></footer>
</template>

<script setup>
  import { computed, reactive, ref } from "vue";
  import Card from "./components/Card.vue";
  import CategoryFilter from "./components/CategoryFilter.vue";
  import SearchPanel from "./components/SearchPanel.vue";
  import Cart from "./components/Cart.vue";
  import axios from "axios";

  const products = ref([]);
  axios
    .get("https://fakestoreapi.com/products")
    .then((response) => {
      products.value = response.data;
      const categorySet = new Set();
      for (let p of products.value) {
        categorySet.add(p.category);
      }
      for (let p of categorySet.values()) {
        categories.value.set(p, true);
      }
    })
    .catch((e) => console.log(e));

  const categories = ref(new Map());
  const searchString = ref("");


  const changeSearchString = function (name) {
    searchString.value = name;
  };

  const filteredProducts = computed(() => {
    return products.value
      .filter((p) => categories.value.has(p.category) && categories.value.get(p.category))
      .filter((itm) =>
        itm.title.toLowerCase().includes(searchString.value.toLowerCase())
      );
  });

  const toggleCategory = function (c) {
    if (categories.has(c[0])) categories.set(c[0], c[1]);
  };

  const selectOne = function (category) {
    for (let key of categories.keys()) {
      if (key === category) {
        categories.set(key, true);
      } else {
        categories.set(key, false);
      }
    }
  };
</script>


<style scoped lang="scss">
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
  align-items: center;
  justify-content: space-between;
}

.nav {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 0 40px;
}

.menu-list {
  display: flex;
  gap: 20px;
}

.menu-item {
  list-style: none;
}

h1 {
  font-size: 3em;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.categories {
  float: right;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: auto;
}

.products {
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  align-items: stretch;
  justify-content: flex-start;
  transform: translateZ(0);
}

.product-card {
  /* height: 100%; */
  width: 270px;
  align-items: stretch;
  border-top: 1px solid rgba(204, 214, 228, 0.6);
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