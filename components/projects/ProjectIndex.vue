<template>
  <div class="m-5">
    <page-header pageTitle="Projetos" :returnLink="false" :showCounter="true" :showFilters="true" />
    <b-card class="project-card">
      <template #img>
        <div class="project-card-image">
          <img src="~/assets/images/image.png" alt="Image">
          <div class="project-card-actions">
            <b-button variant="primary" class="btn-transparent">
              <i class="bi bi-star"></i>
            </b-button>
            <client-only>
              <b-dropdown variant="link" no-caret>
                <template #button-content>
                  <b-button pill variant="light">
                    <i class="bi bi-three-dots"></i>
                  </b-button>
                </template>
                <nuxt-link to="/project-edit" class="text-decoration-none">
                  <b-dropdown-item>
                    <div class="d-flex gap-2">
                      <i class="bi bi-pencil-square"></i>
                      Editar
                    </div>
                  </b-dropdown-item>
                </nuxt-link>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item v-b-modal.modal-center>
                  <div class="d-flex gap-2">
                    <i class="bi bi-trash3"></i>
                    Remover
                  </div>
                  <project-remove />
                </b-dropdown-item>
              </b-dropdown>
            </client-only>
          </div>
        </div>
      </template>

      <template #header>
        <h5 class="project-card-title">Project 1</h5>
        <p class="project-card-text">
          <b>Cliente:</b>
          Clicksign
        </p>
      </template>

      <div class="project-card-text d-flex flex-column">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-calendar-event me-2"></i>
          <span>01 de setembro de 2024</span>
        </div>
        <div class="d-flex align-items-center">
          <i class="bi bi-calendar-check me-2"></i>
          <span>25 de dezembro de 2024</span>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script setup>
import ProjectRemove from './ProjectRemove.vue'
import PageHeader from '../pages/PageHeader.vue'

</script>

<style scoped lang="scss">
.project-card {
  max-width: 346px;
  max-height: 430.479px;
  overflow: hidden;
}

.project-card-image {
  position: relative;
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
