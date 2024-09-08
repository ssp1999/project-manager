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
    <div class="d-flex gap-2" v-if="showFilters || showCreateButton">
      <div class="d-flex gap-2 align-items-center" v-if="showFilters">
        <b-form-checkbox v-model="onlyFavorites" switch @change="emitFilterChanged">Apenas Favoritos</b-form-checkbox>
        <client-only>
          <b-dropdown text="Ordenar por" variant="light">
            <b-dropdown-item @click="emitSortChanged('alphabetical')">Ordem alfabética</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item @click="emitSortChanged('start_date')">Iniciados mais recentes</b-dropdown-item>
            <b-dropdown-divider />
            <b-dropdown-item @click="emitSortChanged('end_date')">Prazo mais próximo</b-dropdown-item>
          </b-dropdown>
        </client-only>
      </div>
      <div v-if="showCreateButton">
        <nuxt-link to="/project/create">
          <b-button variant="primary" pill>
            <div class="d-flex gap-1">
              Criar novo projeto
            </div>
          </b-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
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
  },
  showCreateButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['filter-changed', 'sort-changed'])
const onlyFavorites = ref(false)

const emitFilterChanged = () => {
  emit('filter-changed', { favorite: onlyFavorites.value })
}

const emitSortChanged = (order) => {
  emit('sort-changed', order)
}
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
