<template>
  <b-navbar class="header">
    <b-container class="d-flex justify-content-center align-items-center">
      <img src="~/assets/images/symbol.png" class="text-white" alt="logo">
      <span class="text-white mx-3 title">Gerenciador<br> de Projetos</span>
    </b-container>
    <i class="bi bi-search text-white icon-margin"></i>
  </b-navbar>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style lang="scss">
.header {
  background-color: #1C1930;
  height: 80px;
}

.title {
  font-size: 18px;
}

.icon-margin {
  margin-right: 31px;
}
</style>
