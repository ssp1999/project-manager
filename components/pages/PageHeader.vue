<template>
  <nuxt-link to="/" class="text-decoration-none" v-if="returnLink">
    <i class="bi bi-arrow-left"></i>
    <span class="px-2">Voltar</span>
  </nuxt-link>
  <div class="d-flex justify-content-between align-items-center w-100">
    <div class="d-flex align-items-center">
      <h1 class="page-title">{{ pageTitle }}</h1>
      <span class="counter" v-if="showCounter">({{ counter }})</span>
    </div>
    <div class="d-flex gap-2" v-if="showFilters || showCreateButton">
      <div class="d-flex gap-2 align-items-center" v-if="showFilters">
        <b-form-checkbox v-model="onlyFavorites" switch @change="emitFilterChanged" class="w-100">Apenas Favoritos</b-form-checkbox>
        <client-only>
          <b-dropdown v-model="showOrderByOptions" variant="light" class="select-order-by" no-caret>
            <template #button-content>
              {{ selectedOrderByOptionText }}
              <i :class="!showOrderByOptions ? 'bi bi-chevron-down' : 'bi bi-chevron-up'"></i>
            </template>
            <template v-for="(option, index) in orderByOptions" :key="option.value">
              <b-dropdown-item @click="emitSortChanged(option.value)">{{ option.text }}</b-dropdown-item>
              <template  v-if="index < orderByOptions.length - 1">
                <b-dropdown-divider />
              </template>
            </template>
          </b-dropdown>
        </client-only>
      </div>
      <div v-if="showCreateButton">
        <nuxt-link to="/project/create">
          <b-button variant="primary" pill>
            <div class="d-flex gap-1">
              Criar novo projeto
            </div>
          </b-button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  pageTitle: {
    type: String,
    default: 'create'
  },
  returnLink: {
    type: Boolean,
    default: true
  },
  counter: {
    type: Number,
    default: 0
  },
  showCounter: {
    type: Boolean,
    default: false
  },
  showFilters: {
    type: Boolean,
    default: false
  },
  showCreateButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['filter-changed', 'sort-changed'])
const onlyFavorites = ref(false)
const orderBy = ref('alphabetical')
const showOrderByOptions = ref(false)
const orderByOptions = ref([
  {
    value: 'alphabetical',
    text: 'Ordem alfabética'
  },
  {
    value: 'start_date',
    text: 'Iniciados mais recentes'
  },
  {
    value: 'end_date',
    text: 'Prazo mais próximo'
  }
])

const emitFilterChanged = () => {
  emit('filter-changed', { favorite: onlyFavorites.value })
}

const emitSortChanged = (order) => {
  orderBy.value = order

  emit('sort-changed', order)
}

const selectedOrderByOptionText = computed(() => {
  const option = orderByOptions.value.find(option => option.value === orderBy.value);
  return option ? option.text : '';
});
</script>

<style scoped lang="scss">
.page-title {
  color: #1F1283;
  font-size: 24px;
  font-weight: 600;
}

.counter {
  color: #695CCD;
  font-size: 17px;
}
</style>
<style lang="scss">

.select-order-by {
  min-width: 296px;

  .btn {
    width: 100%;
    text-align: left;
    border: 1px solid #717171;
    border-radius: 8px;
    color: #1C1930;
    font-feature-settings: 'liga' off, 'clig' off;
    font-size: 16px;
    font-weight: 400;
    line-height: 18px;
    padding: 10px 14px;
    position: relative;
    display: flex;
    justify-content: space-between;

    i {
      color: #717171;
    }

    &.show {
      background-color: #fff;
      border-bottom-left-radius: unset;
      border-bottom-right-radius: unset;
    }
  }

  .dropdown-menu {
    min-width: 100%;
    padding: unset;
    border-top-left-radius: unset;
    border-top-right-radius: unset;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border-color: $primary;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    li {

      button {
        padding: 18px 16px;
        color: #1C1930;
        font-feature-settings: 'liga' off, 'clig' off;
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
      }
      .dropdown-divider {
        margin: unset;
        border-color: #ECECEC;
        opacity: 1;
      }
    }
  }
}
</style>
