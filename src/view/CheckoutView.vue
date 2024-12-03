<template>
  <modal :title="'Оформление заказа'" @close="$emit('close')">
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
      <label>Согасие на обработку ПД </label>
      <input type="checkbox"/>
    </div>

    <pre>values: {{ values }}</pre>
    <pre>errors: {{ errors }}</pre>
    <button :disabled="!meta.valid" @click="resetForm()">send</button>
  </modal>
</template>

<script setup>
import Modal from "../components/Modal.vue";
import { useForm } from "vee-validate";
import * as yup from 'yup';

defineEmits(["close"]);

const { values,resetForm, meta, errors, defineField } = useForm({
  validationSchema: yup.object({
    fio: yup.string().required(),
    email: yup.string().email().required(),
    birthday: yup.date().required(),
  }),
});

const [fio, fioAttrs] = defineField("fio");
const [birthday, birthdayAttrs] = defineField("birthday");
const [email, emailAttrs] = defineField("email");

</script>

<style scoped></style>
