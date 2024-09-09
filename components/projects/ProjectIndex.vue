<template>
  <div class="m-5">
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
}
// .project-card {
//   flex: 1 1 calc(20% - 1rem);
//   max-width: calc(20% - 1rem);

//   @media (max-width: 1200px) {
//     flex: 1 1 calc(25% - 1rem);
//     max-width: calc(25% - 1rem);
//   }

//   @media (max-width: 992px) {
//     flex: 1 1 calc(33.33% - 1rem);
//     max-width: calc(33.33% - 1rem);
//   }

//   @media (max-width: 768px) {
//     flex: 1 1 calc(50% - 1rem);
//     max-width: calc(50% - 1rem);
//   }

//   @media (max-width: 576px) {
//     flex: 1 1 100%;
//     max-width: 100%;
//   }
// }
</style>
