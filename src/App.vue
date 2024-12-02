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
        <cart-icon
          @onclick="showCart()"
          :itemCount="itemCount"
          :sumCart="sumCart"
        ></cart-icon>
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
      <search-panel @onsearch="(name)=>searchString=name"></search-panel>
    </div>

    <div class="products">
      <card
        class="product-card"
        @selected="selectOne"
        @addCart="addCart"
        :product="product"
        v-for="product in filteredProducts"
        :key="product.id"
      />
    </div>
  </main>

  <cart-view v-show="isCartShow" :cart="cart" @close="isCartShow = false" @checkout="checkout"/>
  <checkout-view v-show="isCheckoutShow" @close="isCheckoutShow = false"/>
  <footer></footer>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import Card from "./components/Card.vue";
import CategoryFilter from "./components/CategoryFilter.vue";
import SearchPanel from "./components/SearchPanel.vue";
import CartIcon from "./components/CartIcon.vue";
import CartView from "./view/CartView.vue";
import CheckoutView from "./view/CheckoutView.vue";
import axios from "axios";

// Каталог товаров
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

// Фильтрованый каталог товаро
const filteredProducts = computed(() => {
  return products.value
    .filter(
      (p) =>
        categories.value.has(p.category) && categories.value.get(p.category)
    )
    .filter((itm) =>
      itm.title.toLowerCase().includes(searchString.value.toLowerCase())
    );
});

// Категории товаров
const categories = ref(new Map());
const toggleCategory = function (c) {
  if (categories.value.has(c[0])) categories.value.set(c[0], c[1]);
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

//Поисковая строка
const searchString = ref("");

//Корзина
const cart = ref([]);
const isCartShow = ref(false);

const showCart = function () {
  isCartShow.value = true;
};
const itemCount = computed(() => {
  let cnt = 0;
  for (let item of cart.value) {
    cnt += item.cnt;
  }
  return cnt;
});
const sumCart = computed(() => {
  let sum = 0;
  for (let item of cart.value) {
    sum += item.cnt * item.price;
  }
  return sum.toFixed(2);
});
const addCart = function (product) {
  const f = cart.value.find((e) => e.id == product.id);
  if (f) {
    f.cnt += 1;
  } else {
    product.cnt = 1;
    cart.value.push(product);
  }
};


//Оформление заказа
const isCheckoutShow = ref(false);
const checkout = function () {
  isCartShow.value = false;
  isCheckoutShow.value = true;
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
