<template>
  <div class="page-header">
    <nuxt-link to="/" class="text-decoration-none" v-if="returnLink">
      <i class="bi bi-arrow-left"></i>
      <span class="px-2">Voltar</span>
    </nuxt-link>
    <div class="d-flex justify-content-between align-items-center w-100">
      <div class="d-flex align-items-center">
        <h1 class="page-title">{{ pageTitle }}</h1>
        <span class="counter" v-if="showCounter">({{ counter }})</span>
      </div>
      <div class="d-flex gap-3" v-if="showFilters || showCreateButton">
        <div class="d-flex gap-4 align-items-center" v-if="showFilters">
          <b-form-checkbox v-model="favoritesOnly" switch class="toggle-favorites">Apenas Favoritos</b-form-checkbox>
          <client-only>
            <b-dropdown v-model="showOrderByOptions" variant="light" class="select-order-by" no-caret>
              <template #button-content>
                {{ selectedOrderByOptionText }}
                <i :class="!showOrderByOptions ? 'bi bi-chevron-down' : 'bi bi-chevron-up'"></i>
              </template>
              <template v-for="(option, index) in orderByOptions" :key="option.value">
                <b-dropdown-item @click="handleOrderByChange(option.value)">{{ option.text }}</b-dropdown-item>
                <template v-if="index < orderByOptions.length - 1">
                  <b-dropdown-divider />
                </template>
              </template>
            </b-dropdown>
          </client-only>
        </div>
        <div v-if="showCreateButton">
          <nuxt-link to="/project/create">
            <b-button variant="primary" pill class="px-4">
              Criar novo projeto
            </b-button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProjectsStore } from '~/stores/projects'
import type { OrderBy } from '~/types/project'

interface OrderByOption {
  value: OrderBy
  text: string
}

const projectsStore = useProjectsStore()

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

const favoritesOnly = computed({
  get: () => projectsStore.filters.favorites_only,
  set: (value) => projectsStore.setFilters('favorites_only', value)
})
const orderBy = computed({
  get: () => projectsStore.filters.order_by,
  set: (value) => projectsStore.setFilters('order_by', value)
})
const isSearching = computed(() => projectsStore.isSearching)
const pageTitle = computed(() => {
  if (isSearching.value) {
    return 'Resultado da busca'
  }
  
  return props.pageTitle
})
const showFilters = computed(() => {
  if (isSearching.value) {
    projectsStore.setFilters('favorites_only', false)
    projectsStore.setFilters('order_by', 'alphabetical')

    return false
  }

  return props.showFilters
}) 
const showOrderByOptions = ref(false)
const orderByOptions = ref<OrderByOption[]>([
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

const handleOrderByChange = (value: OrderBy) => {
  orderBy.value = value
}

const selectedOrderByOptionText = computed(() => {
  const option = orderByOptions.value.find((option) => option.value === orderBy.value)

  return option ? option.text : ''
})
</script>

<style scoped lang="scss">
.page-header {
  margin-bottom: 22px;
}

.page-title {
  color: #1F1283;
  font-size: 24px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: unset;
}

.counter {
  margin-left: 6px;
  color: #695CCD;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
<style lang="scss">
.toggle-favorites {
  margin-bottom: unset;
  padding: unset;

  .form-check-input {
    margin: unset;
    width: 48px;
    height: 24px;

    &:checked {
      background-color: #FFB23D;
      border-color: #FFB23D
    }

    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(255, 178, 61, 0.25);
    }
  }

  .form-check-label {
    color: #1E1E1E;
    font-size: 16px;
    font-weight: 400;
    line-height: 22px;
    margin-left: 8px;
  }
}

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
