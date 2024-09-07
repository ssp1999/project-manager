<template>
  <b-card
    class="form-input-file d-flex justify-content-center align-items-center text-center my-auto position-relative">
    <input type="file" accept="image/png, image/jpeg" ref="fileInput" style="display: none"
      @change="handleFileChange" />
    <template v-if="imageSrc">
      <div class="position-relative">
        <b-button pill size="sm" variant="outline-primary" class="bg-white position-absolute top-0 end-0 m-2"
          @click="removeImage" aria-label="Remover imagem">
          <i class="bi bi-trash3"></i>
        </b-button>
        <b-card-img :src="imageSrc" class="card-image"></b-card-img>
      </div>
    </template>
    <template v-else>
      <div class="placeholder-content">
        <i class="bi bi-upload icon"></i>
        <p>Escolha uma imagem .jpg ou .png no seu dispositivo</p>
        <b-button pill variant="outline-primary" class="bg-white" @click="triggerFileInput">
          Selecionar
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script setup>
import { ref } from 'vue'

const fileInput = ref(null)
const imageSrc = ref('')

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
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
</script>

<style scoped>
.form-input-file {
  position: relative;
  width: 702px;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.card-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  min-width: 702px;
  min-height: 395px;
}

.placeholder-content {
  text-align: center;
}
</style>
