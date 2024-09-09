<template>
  <div>
    <page-header :pageTitle="formTitle" />

    <b-card class="project-form-card d-flex justify-content-center align-items-center">
      <b-form class="project-form" @submit.prevent="handleSubmit" novalidate>
        <div class="row">
          <div class="project-form-group-wrapper col-12">
            <form-input label="Nome do projeto" id="project-name" v-model="formFields.name.value"
              :type="formFields.name.type" :required="formFields.name.required" :isSubmitted="isSubmitted" />
          </div>
          <div class="project-form-group-wrapper col-12">
            <form-input label="Cliente" id="client" v-model="formFields.client.value" :required="formFields.client.required"
              :type="formFields.client.type" :isSubmitted="isSubmitted" />
          </div>
          <div class="project-form-group-wrapper col-12 col-md-6">
            <form-input label="Data de início" id="start-date" v-model="formFields.start_date.value"
              :type="formFields.start_date.type" :required="formFields.start_date.required"
              :isSubmitted="isSubmitted" />
          </div>
          <div class="project-form-group-wrapper col-12 col-md-6">
            <form-input label="Data final" id="end-date" v-model="formFields.end_date.value"
              :type="formFields.end_date.type" :required="formFields.end_date.required" :isSubmitted="isSubmitted" />
          </div>
          <div class="project-form-group-wrapper col-12">
            <form-input label="Capa do projeto" id="img" :isSubmitted="isSubmitted" v-model="formFields.image.value"
            :type="formFields.image.type" :required="formFields.image.required" />
          </div>
        </div>
        <div class="d-grid">
          <b-button pill block variant="primary" size="lg" type="submit">Salvar projeto</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script setup lang="ts">
import FormInput from '../form/FormInput.vue'
import PageHeader from '../pages/PageHeader.vue'
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { validateForm } from '~/helpers/form'
import type { Project } from '~/types/project.d.ts'
import { useProjectsStore } from '~/stores/projects'
const { show: showToast } = useToast()
const projectsStore = useProjectsStore()


type FieldConfig = {
  value: ValueOf<Project>
  type: 'text' | 'date' | 'image' | 'boolean'
  required: boolean
}

type FormFields = {
  [F in keyof Project]: FieldConfig
}

const route = useRoute()
const router = useRouter()
const projectId: string = route.params.id as string
const formType = !projectId ? 'create' : 'update'

const props = defineProps({
  formType: {
    type: String,
    default: 'create'
  }
})

const formTitle = computed(() => props.formType === 'create' ? 'Novo Projeto' : 'Editar Projeto')
const isSubmitted = ref(false)

const formFields = ref<FormFields>({
  name: {
    value: '',
    type: 'text',
    required: true,
  },
  client: {
    value: '',
    type: 'text',
    required: true
  },

  start_date: {
    value: '',
    type: 'date',
    required: true,
  },
  end_date: {
    value: '',
    type: 'date',
    required: true,
  },
  image: {
    value: '',
    type: 'image',
    required: false
  },
  favorite: {
    value: false,
    type: 'boolean',
    required: false
  }
})

const getProject = async () => {
  try {
    if (!projectId) {
      return
    }

    const projectData = await projectsStore.getProject(projectId)

    Object.keys(projectData).forEach((key) => {
      const value = (projectData[key as keyof Project]) as ValueOf<Project>
      const field = formFields.value[key as keyof Project]

      if (field) {
        field.value = value
      }
    })

  } catch (error) {
    console.error('Erro ao buscar projeto:', error)
  }
}

const handleSubmit = async () => {
  isSubmitted.value = true

  const isInvalid = Object.keys(formFields.value).some((key) => {
    const data = formFields.value[key as keyof Project]

    if (data !== undefined) {
      return data.required && !validateForm(data.value, data.type)
    }
  })

  if (!isInvalid) {
    try {
      const formData = formFields.value

      const project: Project = {
        name: formData?.name ? formData.name.value as string : '',
        client: formData?.client ? formData.client.value as string : '',
        start_date: formData?.start_date ? formData.start_date.value as string : '',
        end_date: formData?.end_date ? formData.end_date.value as string : '',
        image: formData?.image ? formData.image.value as string : '',
        favorite: formData?.favorite ? formData.favorite.value as boolean : false,
      }

      switch (formType) {
        case 'create':
          await projectsStore.createProject(project)
          break
        case 'update':
          await projectsStore.updateProject(projectId, project)
          break
      }

      showToast?.({
        props: {
          variant: 'success',
          body: formType === 'create' ? 'Projeto criado com sucesso!' : 'Projeto atualizado com sucesso!',
        },
      })
      router.push('/')
    } catch (error) {
      showToast?.({
        props: {
          variant: 'danger',
          body: formType === 'create' ? 'Ocorreu um erro ao criar o projeto' : 'Ocorreu um erro ao atualizar o projeto',
        },
      })

      console.error('Erro ao criar o projeto:', error)
    }
  }
}

onMounted(() => {
  getProject()
})
</script>

<style lang="scss">
.project-form-card {
  background-color: transparent;

  .card-body {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3.25rem 3rem;

    .project-form {
      max-width: 44rem;
      width: 100%;
    }
  }

  .project-form-group-wrapper {
    margin-bottom: 2rem;
    padding-inline: 1.5rem;
  }
}

.form-input-image-card {
  .card-body {
    padding: unset !important;
  }
}

@media (max-width: 39rem) {
  .project-form-card {
    .card-body {
      padding: 2.375rem 1.5rem;
    }
  }
}
</style>
