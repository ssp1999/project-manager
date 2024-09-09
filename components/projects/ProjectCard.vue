<template>
  <b-card class="project-card">
    <template #img>
      <div class="project-card-image">
        <img :src="project.image || defaultImage" alt="Project Image">
        <div class="project-card-actions">
          <b-button variant="primary" class="btn-transparent project-card-actions-favorite" @click="toggleFavorite">
            <i class="bi" :class="project.favorite ? 'bi-star-fill text-warning' : 'bi-star'"></i>
          </b-button>
          <client-only>
            <b-dropdown class="project-card-actions-dropdown" no-caret>
              <template #button-content>
                <i class="bi bi-three-dots"></i>
              </template>
              <nuxt-link :to="`/project/${project.id}`" class="text-decoration-none">
                <b-dropdown-item>
                  <div class="d-flex align-items-center" style="gap: .75rem">
                    <i class="bi bi-pencil-square dropdown-icon"></i>
                    <span class="dropdown-text">Editar</span>
                  </div>
                </b-dropdown-item>
              </nuxt-link>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="openModalProjectRemove">
                <div class="d-flex gap-2">
                  <i class="bi bi-trash3 dropdown-icon"></i>
                  <span class="dropdown-text">Remover</span>
                </div>
              </b-dropdown-item>
            </b-dropdown>
          </client-only>
        </div>
      </div>
    </template>

    <template #header>
      <h5 class="project-card-title" v-html="highlightedName"></h5>
      <p class="project-card-client">
        <b>Cliente:</b>
        <span class="project-card-client-text">{{ project.client }}</span>
      </p>
    </template>

    <template #default>
      <hr class="hr-separator">
      <div class="project-body-container d-flex flex-column">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-calendar-event project-card-date-icon"></i>
          <span class="project-card-date-text">{{ formatDate(project.start_date) }}</span>
        </div>
        <div class="d-flex align-items-center">
          <i class="bi bi-calendar-check project-card-date-icon"></i>
          <span class="project-card-date-text">{{ formatDate(project.end_date) }}</span>
        </div>
      </div>
    </template>
  </b-card>
</template>

<script setup>
import defaultImage from '~/assets/images/project-card-placeholder.png'
import { useProjectsStore } from '~/stores/projects'
import { useModalProjectRemove } from '~/stores/modalProjectRemove'
const projectsStore = useProjectsStore()
const modalProjectRemoveStore = useModalProjectRemove()

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
    await projectsStore.fetchProjects()
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

const searchQuery = computed({
  get: () => projectsStore.filters.search_query,
  set: (value) => projectsStore.setFilters('search_query', value)
})

const highlightedName = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const name = props.project.name.toLowerCase()

  if (!query || !name.includes(query)) {
    return props.project.name
  }

  const parts = name.split(new RegExp(`(${query})`, 'gi'))
  return parts.map(part => (part.toLowerCase() === query ? `<span class="highlight">${part}</span>` : part)).join('')
})

</script>

<style lang="scss">
.project-card {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: 1px solid #DCDCDC;

  .project-card-image {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 16px 16px 0 0;

    img {
      width: 100%;
      height: 100%;
      max-height: 17.9375rem;
      object-fit: cover;
      border-radius: 16px 16px 0 0;
    }
  }

  .project-card-actions {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 1rem;
    gap: .75rem;
  }

  .project-card-actions-favorite {
    padding: .3125rem .3125rem;

    i {
      display: flex;
      font-size: 1.125rem;
    }
  }

  .dropdown-menu {
    min-width: 100%;
    padding: unset;
    border-radius: 8px;
    border-color: transparent;
    box-shadow: 0px .25rem .25rem 0px rgba(0, 0, 0, 0.25);

    li {

      button {
        padding: .875rem 1.25rem;
        color: #1C1930;
        font-feature-settings: 'liga' off, 'clig' off;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1rem;
      }

      .dropdown-divider {
        margin: unset;
        border-color: #F4F2FF;
        opacity: 1;
      }

      .dropdown-icon {
        display: flex;
        font-size: 1.5rem;
        color: $primary;
      }

      .dropdown-text {
        color: $primary;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1;
      }
    }
  }

  .project-card-actions-dropdown {
    .btn {
      background-color: #fff;
      border-radius: 100%;
      padding: .3125rem .3125rem;

      i {
        display: flex;
        color: $primary;
        font-size: 1.375rem;
      }
    }
  }

  .project-card-title {
    color: #1F1283;
    font-size: 1.25rem;
    font-weight: 700;
    line-height: normal;
  }

  .project-card-client {
    color: #717171;
    font-size: 1rem;
    font-weight: 700;
    line-height: normal;
    margin-bottom: unset;

    .project-card-client-text {
      margin-left: .375rem;
      color: #717171;
      font-size: 1rem;
      font-weight: 400;
      line-height: normal;
    }
  }

  .card-header {
    padding-block: 1rem 1.5rem;
    border-bottom: unset;
    background-color: #fff;
  }

  .card-body {
    padding-block: unset;
    padding-inline: 1.5rem;
  }

  .project-body-container {
    padding-block: 1rem;
  }

  .hr-separator {
    margin: unset;
    color: #ECECEC;
    opacity: 1;
  }

  .project-card-date-icon {
    font-size: 1.5rem;
  }

  .project-card-date-text {
    margin-left: 1rem;
    color: #717171;
    font-size: 1rem;
    font-weight: 400;
    line-height: normal;
  }
}

.highlight {
  background-color: yellow;
}
</style>
