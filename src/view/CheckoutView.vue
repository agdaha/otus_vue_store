<template>
  <modal :title="'Оформление заказа'" @close="$emit('close')">
    <div class="wrapper">
    <div>
      <label>ФИО: </label>
      <input v-model="fio" v-bind="fioAttrs" type="text" />
    </div>
    <div>
      <label>Дата рождения:</label>
      <input type="date" v-model="birthday" v-bind="birthdayAttrs" />
    </div>
    <div>
      <label>Email: </label>
      <input v-model="email" v-bind="emailAttrs" type="text" />
    </div>
    <div>
      <label>Card: </label>
      <input v-model="card"  type="text">
    </div>
    <div>
      <label>Согасие на обработку ПД </label>
      <input type="checkbox"/>
    </div>
  </div>
    <pre>values: {{ values }}</pre>
    <pre>errors: {{ errors }}</pre>
    <button :disabled="!meta.valid" @click="resetForm()">send</button>
  </modal>
</template>

<script setup>
import Modal from "./base/Modal.vue";
import { useForm } from "vee-validate";
import * as yup from 'yup';

defineEmits(["close"]);

const { values, resetForm, meta, errors, defineField } = useForm({
  validationSchema: yup.object({
    fio: yup.string().required(),
    email: yup.string().email().required(),
    birthday: yup.date().required(),
    card: yup.string(),
  }),
});

const [fio, fioAttrs] = defineField("fio");
const [birthday, birthdayAttrs] = defineField("birthday");
const [email, emailAttrs] = defineField("email");
const [card] = defineField("card");
</script>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
