<template>
  <div>
    <b-form-group :id="id" :description="description" :label="label" :label-for="id" :invalid-feedback="invalidFeedback"
      :state="computedState" class="mb-3">
      <template #label>
        <div class="d-flex align-items-center">
          <h5 class="form-input-label mb-0">{{ label }}</h5>
          <span class="form-input-required ms-1" v-if="required">(Obrigatório)</span>
        </div>
      </template>
      <template v-if="type === 'file'">
        <form-input-file />
      </template>
      
      <b-form-input v-else :id="id" v-model="inputValue" trim :type="type" :state="computedState"
        @input="updateValue" />
    </b-form-group>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FormInputFile from './FormInputFile.vue'

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
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

const updateValue = (value) => {
  inputValue.value = value
  emit('update:modelValue', value)
}

const computedState = computed(() => {
  if (!props.isSubmitted) return null
  if (props.required) {
    if (props.type === 'date') {
      return inputValue.value && !isNaN(Date.parse(inputValue.value))
    }
    return inputValue.value.length > 0
  }
  return true
})

const invalidFeedback = computed(() => {
  if (!props.isSubmitted) return ''
  if (props.required) {
    if (props.type === 'date') {
      if (!inputValue.value || isNaN(Date.parse(inputValue.value))) {
        return 'Selecione uma data válida'
      }
    }
    else if (inputValue.value.length === 0) {
      return 'Por favor, digite ao menos duas palavras'
    }
  }
  return ''
})

// const handleFileChange = (file: File) => {
//   emit('update:modelValue', file)
// }
</script>


<style scoped>
.form-input-label {
  color: #695CCD;
  font-size: 18px;
}

.form-input-required {
  color: #717171;
  font-size: 14px;
}

.form-input-file {
  background-color: #F4F2FF;
  color: #717171;
  font-size: 16px;
  /* min-height: 174px; */

  .icon {
    font-size: 24px;
  }
}
</style>
