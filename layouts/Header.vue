<template>
  <b-navbar class="header" :class="{ 'header-search-mode': showSearchInput }">
    <template v-if="!showSearchInput">
      <div class="d-flex justify-content-center align-items-center w-100">
        <img src="~/assets/images/symbol.png" class="text-white header-logo" alt="logo">
        <span class="text-white mx-3 title">Gerenciador<br> de Projetos</span>
      </div>
      <template v-if="showSearchButton">
        <b-button variant="primary" class="btn-transparent btn-search" @click="toggleSearchInput(true)">
          <i class="bi bi-search text-white icon-margin icon-search"></i>
        </b-button>
      </template>
    </template>
    <template v-else>
      <b-button variant="secondary" class="btn-transparent" @click="toggleSearchInput(false)">
        <i class="bi bi-search text-primary icon-margin icon-search"></i>
      </b-button>
      <b-input type="search" class="h-100 search-input" size="lg" placeholder="Digite o nome do projeto..."
        v-model="searchQuery" />
    </template>
  </b-navbar>
</template>

<script setup>
import { ref, computed, onMounted  } from 'vue'
import { useProjectsStore } from '~/stores/projects'

const showSearchInput = ref(false)
const showSearchButton = ref(false)
const store = useProjectsStore()

const searchQuery = computed({
  get: () => store.filters.search_query,
  set: (value) => store.setFilters('search_query', value)
})

const route = useRoute();

const validateSearchButton = () => {
  const show = [ 'index' ].includes(route.name);

  showSearchButton.value = show
  showSearchInput.value = false
  searchQuery.value = ''

  if (!show) {
    searchQuery.value = ''
  }
}

watch(
  () => route.name,
  () => {
    validateSearchButton();
  }
);

onMounted(() => {
  validateSearchButton()
})

function toggleSearchInput(search) {
  showSearchInput.value = search
}
</script>

<style lang="scss">
.header {
  min-height: 4.5rem;
  background-color: #1C1930;
  box-shadow: 0px .25rem .25rem 0px rgba(0, 0, 0, 0.25);
  padding: .25rem 3.25rem;

  .container-fluid {
    padding: unset;
  }

  .header-logo {
    height: 4.5rem;
    width: 4.5rem;
  }

  .title {
    color: #FFF;
    font-size: 1.125rem;
    font-weight: 400;
    line-height: normal;
  }

  .icon-search {
    font-size: 1.125rem;
  }

  &.header-search-mode {
    background-color: #FFF;

    .search-input {
      min-height: 4.5rem;
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
