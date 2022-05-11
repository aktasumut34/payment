<template>
  <div class="px-32">
    <div class="grid grid-cols-2">
      <div class="flex flex-col gap-6">
        <div class="text-lg text-slate-500">
          You're about to paying for Fuel Media.
        </div>
        <div class="text-3xl uppercase text-slate-700">Payment Details</div>

        <div class="flex flex-col gap-8">
          <RadioGroup v-model="selected">
            <RadioGroupLabel
              ><div class="text-xl text-slate-900 mb-2 uppercase">
                Select Payment Method
              </div></RadioGroupLabel
            >
            <div class="space-x-4 grid grid-cols-2">
              <RadioGroupOption
                as="template"
                v-for="method in methods"
                :key="method.name"
                :value="method"
                v-slot="{ active, checked }"
              >
                <div
                  :class="[
                    active
                      ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                      : '',
                    checked
                      ? 'bg-sky-900 bg-opacity-75 text-white '
                      : 'bg-white ',
                  ]"
                  class="relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"
                >
                  <div class="flex w-full items-center justify-between">
                    <div class="flex items-center">
                      <div class="text-sm">
                        <RadioGroupLabel
                          as="p"
                          :class="checked ? 'text-white' : 'text-gray-900'"
                          class="font-medium"
                        >
                          {{ method.name }}
                        </RadioGroupLabel>
                        <RadioGroupDescription
                          as="span"
                          :class="checked ? 'text-sky-100' : 'text-gray-500'"
                          class="inline"
                        >
                          <span> {{ method.description }}</span>
                        </RadioGroupDescription>
                      </div>
                    </div>
                    <div v-show="checked" class="shrink-0 text-white">
                      <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none">
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill="#fff"
                          fill-opacity="0.2"
                        />
                        <path
                          d="M7 13l3 3 7-7"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </RadioGroupOption>
            </div>
          </RadioGroup>
          <div class="flex flex-col gap-2">
            <div class="text-xl text-slate-900 mb-2 uppercase">
              Payment Details
            </div>
            <div class="grid grid-cols-5 space-x-10">
              <div class="flex flex-col gap-4 col-span-2">
                <div class="float-label-container">
                  <input
                    class="float-label-control outline-none focus:shadow-outline border w-full px-4 py-2 rounded-md"
                    type="text"
                    id="card-name"
                    name="card-name"
                    placeholder="Cardholder's name"
                    v-model="ccFields.cardName"
                    data-card-field
                  /><label
                    class="float-label-self bg-white text-gray-500"
                    for="card-name"
                    >Cardholder's Name</label
                  >
                </div>
                <div class="float-label-container">
                  <input
                    class="float-label-control outline-none focus:shadow-outline border w-full px-4 py-2 rounded-md"
                    type="text"
                    placeholder="Card number"
                    id="card-number"
                    name="card-number"
                    v-model="cardNumber"
                    autocomplete="off"
                    data-card-field
                    v-mask="cardMask"
                  />
                  <label
                    class="float-label-self bg-white text-gray-500"
                    for="card-name"
                    >Card Number</label
                  >
                </div>
                <div class="grid grid-cols-3 gap-x-4">
                  <div class="float-label-container">
                    <input
                      class="float-label-control outline-none focus:shadow-outline border w-full px-4 py-2 rounded-md"
                      type="text"
                      id="card-month"
                      name="card-month"
                      placeholder="Month"
                      v-model="ccFields.cardMonth"
                      data-card-field
                      v-mask="monthMask"
                    /><label
                      class="float-label-self bg-white text-gray-500"
                      for="card-month"
                      >Month</label
                    >
                  </div>
                  <div class="float-label-container">
                    <input
                      class="float-label-control outline-none focus:shadow-outline border w-full px-4 py-2 rounded-md"
                      type="text"
                      id="card-year"
                      name="card-year"
                      placeholder="Year"
                      v-model="ccFields.cardYear"
                      data-card-field
                      v-mask="yearMask"
                    />
                    <label
                      class="float-label-self bg-white text-gray-500"
                      for="card-year"
                      >Year</label
                    >
                  </div>
                  <div class="float-label-container">
                    <input
                      class="float-label-control outline-none focus:shadow-outline border w-full px-4 py-2 rounded-md"
                      type="text"
                      id="card-cvv"
                      name="card-cvv"
                      v-model="ccFields.cardCvv"
                      data-card-field
                      v-mask="cvvMask"
                      placeholder="CVV"
                    />
                    <label
                      class="float-label-self bg-white text-gray-500"
                      for="card-cvv"
                      >CVV</label
                    >
                  </div>
                </div>
                <div class="text-sm pl-1 text-slate-500">
                  We don't hold any credit card information.
                </div>
                <div>
                  <img class="w-full" src="./assets/cards.png" alt="" />
                </div>
              </div>
              <div class="col-span-3">
                <vue-paycard
                  :value-fields="ccFields"
                  :background-image="20"
                  :input-fields="ccEls"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import VuePaycard from "./components/VuePaycard.vue";
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupDescription,
  RadioGroupOption,
} from "@headlessui/vue";
const methods = [
  { name: "Credit Card", description: "Mastercard, Visa, Amex", value: "cc" },
];
const selected = ref(methods[0]);
const cardMask = ref("{{1111}} {{1111}} {{1111}} {{1111}}");
const monthMask = ref("{{11}}");
const yearMask = ref("{{1111}}");
const cvvMask = ref("{{1111}}");
const ccFields = reactive({
  cardName: "",
  cardNumber: "",
  cardMonth: "",
  cardYear: "",
  cardCvv: "",
});
const ccEls = reactive({
  cardName: "card-name",
  cardNumber: "card-number",
  cardMonth: "card-month",
  cardYear: "card-year",
  cardCvv: "card-cvv",
});
const cardNumber = ref("");
watch(cardNumber, () => {
  ccFields.cardNumber = "";
  for (let i = 0; i < cardNumber.value.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      ccFields.cardNumber += " ";
    }
    ccFields.cardNumber += cardNumber.value[i];
  }
});
</script>

<style scoped></style>
