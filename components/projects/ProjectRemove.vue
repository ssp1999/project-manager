<template>
  <b-modal id="modal-center" centered class="text-center" hide-header hide-footer>
    <div class="modal-icon-container">
      <i class="bi bi-trash3 modal-icon"></i>
    </div>
    <h5 class="modal-title">Remover projeto</h5>
    <hr>
    <p class="modal-text">Essa ação removerá definitivamente o projeto:</p>
    <p class="modal-project-name">Nome do projeto</p>

    <div class="d-flex justify-content-center gap-2">
      <b-button pill size="lg" variant="outline-primary" class="modal-button">Cancelar</b-button>
      <b-button pill size="lg" variant="primary" class="modal-button">Confirmar</b-button>
    </div>
  </b-modal>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped>
.modal-content {
  min-width: 582px;
  /* height: 321px; */
}

.modal-title {
  color: #1F1283;
  font-size: 22px;
}

.modal-text {
  color: #717171;
  font-size: 16px;
}

.modal-project-name {
  color: #1C1930;
  font-size: 24px;
  font-weight: 500;
}

.modal-button {
  min-width: 260px;
}

.modal-icon-container {
  position: relative;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
