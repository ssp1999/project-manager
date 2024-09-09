<template>
  <div class="m-5">
    <page-header pageTitle="Projetos" :returnLink="false" :showCounter="true" :counter="projects.length"
      :showFilters="true" :showCreateButton="true" @filter-changed="handleFilterChanged" @sort-changed="handleSortChanged" />
    <div v-if="projects.length === 0" class="text-center mt-4">
      <p>Não há projetos disponíveis.</p>
      <nuxt-link to="/project/create">
        <b-button variant="primary" pill>
          <div class="d-flex gap-1">
            <i class="bi bi-plus"></i>
            Criar novo projeto
          </div>
        </b-button>
      </nuxt-link>
    </div>
    <div v-else class="d-flex flex-wrap gap-3 justify-content-start">
      <project-card v-for="project in projects" :key="project.id" :project="project" class="project-card"
        @update:favorite="updateFavorite" @openModalProjectRemove="openModalProjectRemove($event)"/>
    </div>
  </div>
  <project-remove ref="project-remove" @removedProject="removedProject"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageHeader from '../pages/PageHeader.vue'
import ProjectCard from './ProjectCard.vue'
import projectService from '~/services/projectService.ts'
import ProjectRemove from './ProjectRemove.vue'

const projects = ref([])
const sortOrder = ref('')
const filterFavorites = ref(false)
const projectRemoveRef = useTemplateRef('project-remove');

const handleFetchedProjects = (fetchedProjects) => {
  if (filterFavorites.value) {
    fetchedProjects = fetchedProjects.filter(project => project.favorite)
  }

  if (sortOrder.value) {
    switch (sortOrder.value) {
      case 'alphabetical':
        fetchedProjects.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        break;
      case 'start_date':
        fetchedProjects.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
        break;
      case 'end_date':
        fetchedProjects.sort((a, b) => new Date(a.end_date) - new Date(b.end_date))
        break;
    }
  }

  projects.value = fetchedProjects
}

const fetchProjects = async () => {
  try {
    let fetchedProjects = await projectService.getProjects()

    handleFetchedProjects(fetchedProjects)
    
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
  }
}


const handleFilterChanged = ({ favorite }) => {
  filterFavorites.value = favorite
  fetchProjects()
}

const handleSortChanged = (order) => {
  sortOrder.value = order
  fetchProjects()
}

const updateFavorite = async (updatedProject) => {
  try {
    const index = projects.value.findIndex(p => p.id === updatedProject.id)
    if (index !== -1) {
      projects.value[index] = updatedProject
    }
  } catch (error) {
    console.error('Error updating favorite status:', error)
  }
}

const openModalProjectRemove = (modalData) => {
  projectRemoveRef.value.openModal(modalData)
}

const removedProject = () => {
  fetchProjects()
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
