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
  grid-template-columns: repeat(auto-fit, minmax(346px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(430px, 1fr));
  grid-gap: 32px;
  grid-auto-columns: 2 !important;

  @media (min-width: 808px) {
    grid-template-columns: repeat(2, minmax(346px, 1fr));
  }

  @media (min-width: 1186px) {
    grid-template-columns: repeat(3, minmax(346px, 1fr));
  }

  @media (min-width: 1564px) {
    grid-template-columns: repeat(4, minmax(346px, 1fr));
  }

  @media (min-width: 1942px) {
    grid-template-columns: repeat(5, minmax(346px, 1fr));
  }

  @media (min-width: 2320px) {
    grid-template-columns: repeat(6, minmax(346px, 1fr));
  }

  @media (min-width: 2698px) {
    grid-template-columns: repeat(7, minmax(346px, 1fr));
  }
}
</style>
