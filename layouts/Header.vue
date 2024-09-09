<template>
  <b-navbar class="header" :class="{ 'header-search-mode': showSearch }">
    <template v-if="!showSearch">
      <b-container class="d-flex justify-content-center align-items-center">
        <img src="~/assets/images/symbol.png" class="text-white" alt="logo">
        <span class="text-white mx-3 title">Gerenciador<br> de Projetos</span>
      </b-container>
      <b-button variant="primary" class="btn-transparent btn-search" @click="toggleSearch(true)">
        <i class="bi bi-search text-white icon-margin icon-search"></i>
      </b-button>
    </template>
    <template v-else>
      <b-button variant="secondary" class="btn-transparent" @click="toggleSearch(false)">
        <i class="bi bi-search text-primary icon-margin icon-search"></i>
      </b-button>
      <b-input type="search" class="h-100 search-input" size="lg" placeholder="Digite o nome do projeto..."
        v-model="searchQuery" />
    </template>
  </b-navbar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProjectsStore } from '~/stores/projects'

const showSearch = ref(false)
const store = useProjectsStore()

const searchQuery = computed({
  get: () => store.filters.search_query,
  set: (value) => store.setFilters('search_query', value)
})

function toggleSearch(search) {
  showSearch.value = search
}
</script>

<style lang="scss">
.header {
  min-height: 72px;
  background-color: #1C1930;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 4px 52px;

  .container-fluid {
    padding: unset;

  }

  .title {
    color: #FFF;
    font-size: 18px;
    font-weight: 400;
    line-height: normal;
  }

  .icon-search {
    font-size: 18px;
  }

  &.header-search-mode {
    background-color: #FFF;

    .search-input {
      min-height: 72px;
      border: none;
      outline: none;

      &:focus {
        box-shadow: none;
        border: none;
      }
    }
  }
}
</style>
