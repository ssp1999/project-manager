<template>
  <div>
    <b-form-group :label-for="id" class="mb-3">
      <template #label>
        <div class="d-flex align-items-center">
          <h5 class="form-input-label mb-0">{{ label }}</h5>
          <span class="form-input-required ms-1" v-if="required">(Obrigatório)</span>
        </div>
      </template>
      <template v-if="type === 'file'">
        <b-card class="form-input-file d-flex justify-content-center align-items-center text-center my-auto">
          <i class="bi bi-upload icon"></i>
          <p>Escolha uma imagem .jpg ou .png no seu dispositivo</p>
          <b-button pill variant="outline-primary" class="bg-white">Selecionar</b-button>
        </b-card>
      </template>
      <b-form-input :id="id" v-model="inputValue" trim :type="type" v-else />
    </b-form-group>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: 'text'
  },
  type: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  }
})

const inputValue = ref('')
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
