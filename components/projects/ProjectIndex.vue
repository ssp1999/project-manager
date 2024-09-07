<template>
  <div class="m-5">
    <b-card class="project-card position-relative">
      <template #img>
        <div class="position-relative">
          <img class="project-card-img" src="https://picsum.photos/300/300/?image=41" alt="Image">
          <div class="button-container position-absolute bottom-0 end-0 d-flex gap-2 p-2">
            <b-button variant="primary" class="btn-transparent">
              <i class="bi bi-star"></i>
            </b-button>
            <b-button variant="primary" pill>
              <i class="bi bi-three-dots"></i>
            </b-button>
          </div>
        </div>
      </template>
      <template #header>
        <h5 class="project-card-title">Project 1</h5>
        <p class="project-card-text">
          <b>Cliente:</b>
          Clicksign
        </p>
      </template>
      <b-card-text class="project-card-text d-flex flex-column">
        <div class="d-flex align-items-center mb-2">
          <i class="bi bi-calendar-event me-2"></i>
          <span>01 de setembro de 2024</span>
        </div>
        <div class="d-flex align-items-center">
          <i class="bi bi-calendar-check me-2"></i>
          <span>25 de dezembro de 2024</span>
        </div>
      </b-card-text>
    </b-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style scoped lang="scss">
.project-card {
  max-width: 346px;
  max-height: 430.479px;
  overflow: hidden;
}

.project-card-img {
  width: 100%;
  max-height: 232px;
  object-fit: cover;
}

.project-card-title {
  color: #1F1283;
  font-size: 20px;
}

.project-card-text {
  color: #717171;
  font-size: 16px;
}

</style>
