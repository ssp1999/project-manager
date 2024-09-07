<template>
  <div class="m-5">
    <nuxt-link to="/" class="text-decoration-none">
      <i class="bi bi-arrow-left"></i>
      <span class="px-2">Voltar</span>
    </nuxt-link>
    <h1 class="page-title">{{ formTitle }}</h1>

    <b-card class="card-form d-flex justify-content-center align-items-center text-center">
      <form class="my-5 px-4 min-form-width">
        <form-input label="Nome do projeto" id="project-name" required />
        <form-input label="Cliente" id="client" required />
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <form-input label="Data de início" id="start-date" type="date" required />
          </div>
          <div class="col-12 col-md-6 mb-3">
            <form-input label="Data final" id="end-date" type="date" required />
          </div>
        </div>
        <form-input label="Capa do projeto" id="img" type="file" />
        <div class="d-grid">
          <b-button pill block variant="primary" size="lg" disabled>Salvar projeto</b-button>
        </div>
      </form>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import FormInput from '../form/FormInput.vue'
import { computed } from 'vue'

const props = defineProps({
  formType: {
    type: String,
    default: 'create'
  }
})

const formTitle = computed(() => props.formType === 'create' ? 'Novo Projeto' : 'Editar Projeto')
</script>

<style scoped>
.card-form {
  background-color: #F4F2FF;
}

.min-form-width {
  min-width: 702px;
  width: 100%;
}

@media (max-width: 768px) {
  .min-form-width {
    min-width: 100%;
  }
}

</style>
