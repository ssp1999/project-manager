<template>
  <div>
    <page-header pageTitle="Projetos" :returnLink="false" :showCounter="true" :counter="projects.length"
      :showFilters="true" :showCreateButton="true" />
    <template v-if="projects.length === 0">
      <div class="text-center mt-4">
        <p>Não há projetos disponíveis.</p>
      </div>
    </template>
    <template v-else>
      <div class="project-cards-grid">
        <project-card v-for="project in projects" :key="project.id" :project="project" class="project-card" />
      </div>
    </template>
  </div>
  <project-remove />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import PageHeader from '../pages/PageHeader.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectRemove from './ProjectRemove.vue'
import { useProjectsStore } from '~/stores/projects'

const projectsStore = useProjectsStore()
const projects = computed(() => projectsStore.filteredProjects)

const fetchProjects = async () => {
  try {
    await projectsStore.fetchProjects()
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
  }
}

onMounted(() => {
  fetchProjects()
})

</script>

<style scoped lang="scss">
.project-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(26.875rem, 1fr));
  grid-gap: 2rem;
  grid-auto-columns: 2 !important;

  @media (min-width: 50.5rem) {
    grid-template-columns: repeat(2, minmax(21.625rem, 1fr));
  }

  @media (min-width: 74.125rem) {
    grid-template-columns: repeat(3, minmax(21.625rem, 1fr));
  }

  @media (min-width: 97.75rem) {
    grid-template-columns: repeat(4, minmax(21.625rem, 1fr));
  }

  @media (min-width: 121.375rem) {
    grid-template-columns: repeat(5, minmax(21.625rem, 1fr));
  }

  @media (min-width: 145rem) {
    grid-template-columns: repeat(6, minmax(21.625rem, 1fr));
  }

  @media (min-width: 168.625rem) {
    grid-template-columns: repeat(7, minmax(21.625rem, 1fr));
  }
}
</style>
