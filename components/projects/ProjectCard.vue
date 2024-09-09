<template>
  <b-card class="project-card">
    <template #img>
      <div class="project-card-image">
        <img :src="project.image || defaultImage" alt="Project Image">
        <div class="project-card-actions">
          <b-button variant="primary" class="btn-transparent" @click="toggleFavorite">
            <i class="bi" :class="project.favorite ? 'bi-star-fill text-warning' : 'bi-star'"></i>
          </b-button>
          <client-only>
            <b-dropdown variant="link" no-caret>
              <template #button-content>
                <b-button pill variant="light">
                  <i class="bi bi-three-dots"></i>
                </b-button>
              </template>
              <nuxt-link :to="`/project/${project.id}`" class="text-decoration-none">
                <b-dropdown-item>
                  <div class="d-flex gap-2">
                    <i class="bi bi-pencil-square"></i>
                    Editar
                  </div>
                </b-dropdown-item>
              </nuxt-link>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="openModalProjectRemove">
                <div class="d-flex gap-2">
                  <i class="bi bi-trash3"></i>
                  Remover
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </client-only>
        </div>
      </div>
    </template>

    <template #header>
      <h5 class="project-card-title">{{ project.name }}</h5>
      <p class="project-card-text">
        <b>Cliente:</b>
        {{ project.client }}
      </p>
    </template>

    <div class="project-card-text d-flex flex-column">
      <div class="d-flex align-items-center mb-2">
        <i class="bi bi-calendar-event me-2"></i>
        <span>{{ formatDate(project.start_date) }}</span>
      </div>
      <div class="d-flex align-items-center">
        <i class="bi bi-calendar-check me-2"></i>
        <span>{{ formatDate(project.end_date) }}</span>
      </div>
    </div>
  </b-card>
</template>

<script setup>
import defaultImage from '~/assets/images/image.png'
import { useProjectsStore } from '~/stores/projects'
import { useModalProjectRemove } from '~/stores/modalProjectRemove'
const projectsStore = useProjectsStore()
const modalProjectRemoveStore = useModalProjectRemove();

const props = defineProps({
  project: {
    type: Object,
    required: true,
    default: () => ({
      id: undefined,
      name: '',
      client: '',
      start_date: '',
      end_date: '',
      image: '',
      favorite: false
    })
  },

})

const formatDate = (dateString) => {
  if (!dateString) return ''
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  return new Date(`${dateString}T00:00:00`).toLocaleDateString('pt-BR', options)
}

const toggleFavorite = async () => {
  try {
    const updatedProject = {
      favorite: !props.project.favorite
    }

    await projectsStore.updateProject(props.project.id, updatedProject)
    await projectsStore.fetchProjects();
  } catch (error) {
    console.error('Error toggling favorite status:', error)
  }
}

const openModalProjectRemove = () => {
  modalProjectRemoveStore.setModalData({
    project: props.project
  })

  modalProjectRemoveStore.setShowModal(true)
}
</script>

<style scoped lang="scss">
.project-card {
  max-width: 346px;
  max-height: 430.479px;
  overflow: hidden;
}

.project-card-image {
  position: relative;
  width: 100%;
}

.project-card-actions {
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  right: 0;
}

.project-card-title {
  color: #1F1283;
  font-size: 20px;
  font-weight: 700;
}

.project-card-text {
  color: #717171;
  font-size: 16px;
}
</style>
