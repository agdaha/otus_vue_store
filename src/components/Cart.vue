<template>
  <div class="cart">
    <div class="cart-img">
      <img src="../assets/img/cart.svg" width="64" height="64" />
    </div>
    <div class="cart-info">
      <span> {{ itemCount }} items</span>
      <span> {{ sumItems }} $</span>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  const itemCount = ref(0);
  const sumItems = ref(0);
</script>
    

<style scoped>
.cart {
  display: flex;
  align-items: center;
}

.cart-info {
    display: flex;
    flex-direction: column;
}
</style>