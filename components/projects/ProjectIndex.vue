<template>
  <div class="m-5">
    <page-header pageTitle="Projetos" :returnLink="false" :showCounter="true" :showFilters="true" />
    <project-card />
  </div>
</template>

<script setup>
import PageHeader from '../pages/PageHeader.vue'
import ProjectCard from './ProjectCard.vue'

</script>

<style scoped lang="scss"></style>
