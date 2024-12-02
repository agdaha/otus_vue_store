<template>
  <modal :title="'Оформление заказа'" @close="$emit('close')">
    <!-- <div>
      <label>ФИО: </label>
      <input />
    </div>
    <div>
      <label>Дата рождения:</label>
      <input type="date" />
    </div>
    <div>
      <label>Адрес: </label>
      <input />
    </div>
    <div>
      <label>Согасие на обработку ПД </label>
      <input type="checkbox"/>
    </div> -->

    <input v-model="email" v-bind="emailAttrs" type="text" />

    <pre>values: {{ values }}</pre>
  </modal>
</template>

<script setup>
import Modal from "../components/Modal.vue";
import { useForm } from "vee-validate";

defineEmits(["close"]);
const { values, defineField } = useForm();

const [email, emailAttrs] = defineField("email");
</script>

<style scoped></style>
