<template>
  <div class="m-5">
    <page-header :pageTitle="formTitle" />

    <b-card class="card-form d-flex justify-content-center align-items-center">
      <form class="my-5 px-4 min-form-width" @submit.prevent="handleSubmit">
        <form-input label="Nome do projeto" id="project-name" v-model="project.name" required
          :isSubmitted="isSubmitted" />
        <form-input label="Cliente" id="client" v-model="project.client" required :isSubmitted="isSubmitted" />
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <form-input label="Data de início" id="start-date" type="date" v-model="project.start_date" required
              :isSubmitted="isSubmitted" />
          </div>
          <div class="col-12 col-md-6 mb-3">
            <form-input label="Data final" id="end-date" type="date" v-model="project.end_date" required
              :isSubmitted="isSubmitted" />
          </div>
        </div>
        <form-input label="Capa do projeto" id="img" type="file" :isSubmitted="isSubmitted" />
        <div class="d-grid">
          <b-button pill block variant="primary" size="lg" type="submit">Salvar projeto</b-button>
        </div>
      </form>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import FormInput from '../form/FormInput.vue'
import PageHeader from '../pages/PageHeader.vue'
import { ref, computed } from 'vue'
import projectService from '~/services/projectService'

const props = defineProps({
  formType: {
    type: String,
    default: 'create'
  }
})

const formTitle = computed(() => props.formType === 'create' ? 'Novo Projeto' : 'Editar Projeto')
const isSubmitted = ref(false)
const project = ref({
  name: '',
  client: '',
  start_date: '',
  end_date: '',
  image: null,
  favorite: false
})

// const handleFileUpload = (event: Event) => {
//   const file = (event.target as HTMLInputElement).files?.[0]
//   if (file) {
//     project.value.image = file
//   }
// }

const handleSubmit = async () => {
  isSubmitted.value = true

  console.log('Dados do projeto antes de enviar:', project.value)

  try {
    const newProject = await projectService.createProject({
      ...project.value,
      image: null
      // project.value.image ? await convertImageToBase64(project.value.image) : 
    })

    console.log('Projeto criado com sucesso:', newProject)
  } catch (error) {
    console.error('Erro ao criar o projeto:', error)
  }
}

// const convertImageToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.onloadend = () => resolve(reader.result)
//     reader.onerror = reject
//     reader.readAsDataURL(file)
//   })
// }
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
