<template>
  <div>
    <b-form-group :id="id" :description="description" :label="label" :label-for="id" :invalid-feedback="invalidFeedback"
      :state="computedState">
      <template #label>
        <div class="d-flex align-items-center">
          <h5 class="form-input-label mb-0">{{ label }}</h5>
          <span class="form-input-required ms-1" v-if="required">(Obrigatório)</span>
        </div>
      </template>
      <template v-if="type === 'image'">
        <form-input-image v-model="model"/>
      </template>
      
      <b-form-input v-else :id="id" v-model="model" trim :type="type" :state="computedState" />
    </b-form-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormInputImage from './FormInputImage.vue'
import { validateForm } from '~/helpers/form'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    default: ''
  },
  isSubmitted: {
    type: Boolean,
    default: false
  },
})

const model = defineModel()

const computedState = computed(() => {
  if (!props.isSubmitted) return null
  if (props.required) {
    return validateForm(model.value, props.type)
  }
  return true
})

const invalidFeedback = computed(() => {
  if (!props.isSubmitted) return ''
  if (props.required && !validateForm(model.value, props.type)) {
    if (props.type === 'date') {
      return 'Selecione uma data válida'
    }

    if (model.value.length === 0) {
      return 'Por favor, digite ao menos duas palavras'
    }
  }
  return ''
})
</script>


<style scoped>
.form-input-label {
  color: #695CCD;
  font-size: 1.125rem;
}

.form-input-required {
  color: #717171;
  font-size: .875rem;
}

.form-input-image {
  background-color: #F4F2FF;
  color: #717171;
  font-size: 1rem;

  .icon {
    font-size: 1.5rem;
  }
}
</style>
