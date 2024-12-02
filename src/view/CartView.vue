<template>
  <modal :title="'Ваша корзина'" @close="$emit('close')">
    <table>
      <thead>
        <tr>
          <td>Наименование</td>
          <td>Цена</td>
          <td>Кол-во</td>
          <td>Сумма</td>
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
              v-model="item.cnt"
              @change="changeCount(item)"
            />
          </td>
          <td class="td-money">${{ (item.price * item.cnt).toFixed(2) }}</td>
        </tr>
        <tr>
          <td class="td-title">Итого</td>
          <td></td>
          <td></td>
          <td class="td-money">${{ sumCart }}</td>
        </tr>
      </tbody>
    </table>

    <div class="buttons">
      <button v-if="props.cart.length>0" @click="$emit('checkout')">Оформить заказ</button>
      <button @click="$emit('close')">Закрыть</button>
    </div>
  </modal>
</template>

<script setup>
import Modal from "../components/Modal.vue";
import { computed } from "vue";
const props = defineProps(["cart"]);
defineEmits(["close","checkout"]);

const sumCart = computed(() => {
  let sum = 0;
  for (let item of props.cart) {
    sum += item.cnt * item.price;
  }
  return sum.toFixed(2);
});

const changeCount = function (item) {
  if (item.cnt == 0) {
    const idx = props.cart.findIndex((el) => el.id == item.id);
    props.cart.splice(idx, 1);
  }
};
</script>

<style scoped>
td {
  padding: 6px;
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
</style>
