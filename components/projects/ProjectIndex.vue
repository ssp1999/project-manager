<template>
  <div class="m-5">
    <page-header pageTitle="Projetos" :returnLink="false" :showCounter="true" :showFilters="true" />
    <div v-if="projects.length === 0" class="text-center mt-4">
      <p>Não há projetos disponíveis.</p>
      <nuxt-link to="/project-create">
        <b-button variant="primary" pill>
          <div class="d-flex gap-1">
            <i class="bi bi-plus"></i>
            Criar novo projeto
          </div>
        </b-button>
      </nuxt-link>
    </div>
    <div v-else class="d-flex flex-wrap gap-3 justify-content-start">
      <project-card v-for="project in projects" :key="project.id" :project="project" class="project-card" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageHeader from '../pages/PageHeader.vue'
import ProjectCard from './ProjectCard.vue'
import projectService from '~/services/projectService.ts'

const projects = ref([])

onMounted(async () => {
  try {
    projects.value = await projectService.getProjects()
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
  }
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