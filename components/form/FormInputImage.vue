<template>
  <b-card class="form-input-image-card" :class="{ 'form-input-has-image': imageSrc !== '' }">
    <input type="file" accept="image/png, image/jpg, image/jpeg" ref="fileInput" style="display: none"
      @change="handleImageChange" />
    <template v-if="imageSrc">
      <div>
        <b-button pill size="sm" variant="outline-primary" class="bg-white position-absolute top-0 end-0 m-2"
          @click="removeImage" aria-label="Remover imagem">
          <i class="bi bi-trash3"></i>
        </b-button>
        <b-card-img :src="imageSrc" class="card-image"></b-card-img>
      </div>
    </template>
    <template v-else>
      <div class="placeholder-content">
        <i class="bi bi-upload icon placeholder-upload-icon"></i>
        <p class="placeholder-text">Escolha uma imagem .jpg ou .png no seu dispositivo</p>
        <b-button pill variant="outline-primary" class="bg-white placeholder-button-select-image"
          @click="triggerFileInput">
          Selecionar
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])
const model = defineModel()

const fileInput = ref(null)
const imageSrc = ref('')

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageSrc.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  imageSrc.value = ''
}

watch(
  () => imageSrc.value,
  (newValue) => {
    if (model.value !== newValue) {
      emit('update:modelValue', newValue) 
    }
  }
);

watchEffect(() => {
  imageSrc.value = model.value
})
</script>

<style lang="scss">
.form-input-image-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: transparent;
  border: 1px dashed #717171;

  .card-body {
    padding: unset;
    height: 100%;
    width: 100%;
  }

  .placeholder-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.3125rem 0;

    .placeholder-upload-icon {
      display: flex;
      font-size: 1.5rem;
      color: #717171;
    }

    .placeholder-text {
      color: #717171;
      text-align: center;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.375rem;
      margin-block: 1rem 1.5rem;
    }

    .placeholder-button-select-image {
      max-width: 9rem;
      color: #695CCD;
      padding: .5625rem 2rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }

  &.form-input-has-image {
    border-style: solid;
    padding: 0;
    border-color: #dee2e6;
  }
}
</style>
