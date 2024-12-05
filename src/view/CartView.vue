<template>
  <modal :title="'Ваша корзина'" @close="$emit('close')">
    <table v-if="sumCart>0">
      <thead>
        <tr>
          <td class="td-title htext">Наименование</td>
          <td class="htext">Цена</td>
          <td class="htext">Кол-во</td>
          <td class="htext">Сумма</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in props.cart" :key="item.id">
          <td class="td-title">{{ item.title }}</td>
          <td class="td-money">${{ item.price.toFixed(2) }}</td>
          <td>
            <input
              class="counter"
              type="number"
              min="0"
              v-model="item.cntInCart"
            />
          </td>
          <td class="td-money">${{ (item.price * item.cntInCart).toFixed(2) }}</td>
          <td class="td-del" @click="item.cntInCart=0">×</td>
        </tr>
        <tr>
          <td class="td-title td-under" colspan="3">Итого</td>
          
          <td class="td-money td-under">${{ sumCart }}</td>
        </tr>
      </tbody>
    </table>

    <h2 v-else> Пусто </h2>

    <div class="buttons">
      <button v-if="props.cart.length>0" @click="$emit('checkout')">Оформить заказ</button>
      <button @click="$emit('close')">Закрыть</button>
    </div>
  </modal>
</template>

<script setup>
import Modal from "./base/Modal.vue";
import { computed } from "vue";
const props = defineProps(["cart"]);
defineEmits(["close","checkout"]);

const sumCart = computed(() => {
  let sum = 0;
  for (let item of props.cart) {
    sum += item.cntInCart * item.price;
  }
  return sum.toFixed(2);
});


</script>

<style scoped>

.td-under{
  border-top: 1px solid rgb(55, 133, 107);
}

.htext{
  font-weight: bold;
}

table {
  min-width: 550px;
}

td {
  padding: 4px;
}

.td-money {
  text-align: end;
}

.td-title {
  text-align: start;
}

.counter {
  width: 60px;
}

.buttons {
  display: flex;
  gap: 20px;
  justify-content: end;
}

.td-del {
  padding: auto;
  cursor: pointer;
}
</style>
