<template>
  <template v-if="showModal">
    <b-modal ref="modalProjectRemove" id="modal-project-remove" centered class="text-center modal-project-remove" :model-value="showModal">
      <template #header>
        <div class="modal-icon-container">
          <i class="bi bi-trash3 modal-icon"></i>
        </div>
        <h5 class="modal-title">Remover projeto</h5>
      </template>
      <template #default>
        <hr class="modal-hr-separator">
        <div class="modal-body-container">
          <p class="modal-text">Essa ação removerá definitivamente o projeto:</p>
          <p class="modal-project-name">{{ project.name }}</p>
        </div>
      </template>
      <template #footer>
        <div class="modal-footer-buttons d-flex justify-content-center gap-2">
          <b-button pill variant="outline-primary" class="modal-button modal-button-cancel" @click="closeModal">Cancelar</b-button>
          <b-button pill variant="primary" class="modal-button modal-button-confirm" @click="confirmRemove">Confirmar</b-button>
        </div>
      </template>
    </b-modal>
  </template>
</template>

<script setup>
import projectService from '~/services/projectService.ts'
import { ref, defineExpose } from 'vue'

const project = ref({})
const showModal = ref(false);

const closeModal = () => {
  showModal.value = false
}

const confirmRemove = async () => {
  try {
    await projectService.deleteProject(project.value.id)

    closeModal()
  } catch (error) {
    console.error('Error removing project:', error)
  }
}

const openModal = (modalData) => {
  project.value = modalData.project

  showModal.value = true
}

defineExpose({
  openModal
})
</script>


<style lang="scss">
.modal-project-remove {
  .modal-content {
    min-width: 582px;
    padding: 32px;
  }

  .modal-header {
    min-height: 72px;
    display: flex;
    align-items: center;
    padding: unset;
    width: 100%;
    justify-content: center;
    border-bottom: unset;
  }
  
  .modal-body {
    padding: unset;
  }

  .modal-body-container {
    padding-block: 32px;
  }

  .modal-hr-separator {
    margin: unset;
    color: #8C8B93;
    opacity: 1;
  }

  .modal-title {
    color: #1F1283;
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
  }

  .modal-text {
    color: #717171;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 13px;
  }

  .modal-project-name {
    color: #1C1930;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    margin-bottom: unset;
  }

  .modal-footer-buttons {
    width: 100%;
    margin: unset;
  }

  .modal-button {
    min-height: 52px;
    width: 100%;
  }

  .modal-button-cancel {
    font-size: 20px;
    font-weight: 400;
    line-height: 22px;
  }

  .modal-button-confirm {
    color: #FFF;
    font-size: 20px;
    font-weight: 400;
    line-height: 22px;
  }

  .modal-icon-container {
    position: absolute;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -32px; 
  }

  .modal-icon {
    width: 64px;
    height: 64px;
    background: #695CCD;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .modal-footer {
    border-top: unset;
    padding: unset;
  }
}
</style>
