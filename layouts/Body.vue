<template>
  <div class="body">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>
  </div>
</template>

<script setup>
</script>

<style scoped>
.body {
  margin: 3.75rem 2.625rem;
}

@media (max-width: 39rem) {
  .body {
    margin: 2.25rem 2rem;
  }
}
</style>
