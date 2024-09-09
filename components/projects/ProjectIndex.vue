<template>
  <div class="m-5">
    <page-header pageTitle="Projetos" :returnLink="false" :showCounter="true" :counter="projects.length"
      :showFilters="true" :showCreateButton="true" />
    <div v-if="projects.length === 0" class="text-center mt-4">
      <p>Não há projetos disponíveis.</p>
    </div>
    <div v-else class="d-flex flex-wrap gap-3 justify-content-start">
      <project-card v-for="project in projects" :key="project.id" :project="project" class="project-card" />
    </div>
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
.project-card {
  flex: 1 1 calc(20% - 1rem);
  max-width: calc(20% - 1rem);

  @media (max-width: 1200px) {
    flex: 1 1 calc(25% - 1rem);
    max-width: calc(25% - 1rem);
  }

  @media (max-width: 992px) {
    flex: 1 1 calc(33.33% - 1rem);
    max-width: calc(33.33% - 1rem);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 1rem);
    max-width: calc(50% - 1rem);
  }

  @media (max-width: 576px) {
    flex: 1 1 100%;
    max-width: 100%;
  }
}
</style>
