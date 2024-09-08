<template>
  <b-navbar v-if="!showSearch" class="header">
    <b-container class="d-flex justify-content-center align-items-center">
      <img src="~/assets/images/symbol.png" class="text-white" alt="logo">
      <span class="text-white mx-3 title">Gerenciador<br> de Projetos</span>
    </b-container>
    <b-button variant="primary" class="btn-transparent" @click="toggleSearch">
      <i class="bi bi-search text-white icon-margin"></i>
    </b-button>
  </b-navbar>
  <b-navbar v-else class="header-search-mode">
    <b-button variant="secondary" class="btn-transparent" @click="hideSearch">
      <i class="bi bi-search text-primary icon-margin"></i>
    </b-button>
    <b-input type="search" class="h-100 search-input" size="lg" placeholder="Digite o nome do projeto..."
      v-model="searchQuery" @input="handleSearch" />
  </b-navbar>
</template>

<script setup>
import { ref, watch } from 'vue'
import projectService from '~/services/projectService.ts'

const showSearch = ref(false)
const searchQuery = ref('')

function toggleSearch() {
  showSearch.value = true
}

function hideSearch() {
  showSearch.value = false
  searchQuery.value = ''
}

watch(searchQuery, (newQuery) => {
  if (newQuery.length >= 3) {
    handleSearch()
  }
})

async function handleSearch() {
  try {
    console.log('Searching for projects with query:', searchQuery.value);
    const projects = await projectService.searchProjects(searchQuery.value);
    console.log('Search results:', projects);
  } catch (error) {
    console.error('Error searching projects:', error);
  }
}

</script>

<style lang="scss">
.header {
  background-color: #1C1930;
  height: 80px;
}

.header-search-mode {
  background-color: #FFF;
  height: 80px;

  .search-input {
    border: none;
    outline: none;

    &:focus {
      box-shadow: none;
      border: none;
    }
  }
}

.title {
  font-size: 18px;
}

.icon-margin {
  margin: 0px 32px;
}
</style>
