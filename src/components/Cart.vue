<template>
  <div class="cart">
    <div class="cart-img">
      <img src="../assets/img/cart.svg" width="48" height="48" />
    </div>
    <div class="cart-info">
      <span> {{ itemCount }} items</span>
      <span> {{ sumItemsPrice }} $</span>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  defineProps(["itemCount", "sumItemsPrice"])
</script>
    

<style scoped>
.cart {
  display: flex;
  align-items: flex-end;
}

.cart-info {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
}
</style>