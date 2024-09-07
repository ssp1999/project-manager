<template>
  <nuxt-link to="/" class="text-decoration-none" v-if="returnLink">
    <i class="bi bi-arrow-left"></i>
    <span class="px-2">Voltar</span>
  </nuxt-link>
  <div class="d-flex justify-content-between align-items-center w-100">
    <div class="d-flex align-items-center">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <span class="counter" v-if="showCounter">({{ counter }})</span>
    </div>
    <div class="d-flex gap-2 align-items-center" v-if="showFilters">
      <b-form-checkbox switch>Apenas Favoritos</b-form-checkbox>
      <client-only>
        <b-dropdown text="Ordem alfabética" variant="light">
          <b-dropdown-item>Ordem alfabética</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item>Iniciados mais recentes</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item>Prazo mais próximo</b-dropdown-item>
        </b-dropdown>
      </client-only>
    </div>
  </div>
</template>

<script setup>
defineProps({
  pageTitle: {
    type: String,
    default: 'create'
  },
  returnLink: {
    type: Boolean,
    default: true
  },
  counter: {
    type: Number,
    default: 0
  },
  showCounter: {
    type: Boolean,
    default: false
  },
  showFilters: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.page-title {
  color: #1F1283;
  font-size: 24px;
  font-weight: 600;
}

.counter {
  color: #695CCD;
  font-size: 17px;
}
</style>
