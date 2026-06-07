<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { yearList } from '@/data/projects'

const tabs = [
  { to: { name: 'projects' }, label: '개요' },
  ...yearList.map((y) => ({ to: { name: y.routeName }, label: y.label })),
]
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-12">
    <header class="mb-8">
      <h1 class="mb-2 text-3xl font-bold text-surface-900 dark:text-surface-0">Projects</h1>
      <p class="text-surface-600 dark:text-surface-300">
        (주) 이노비 입사(2023.06) 후 연차별로 주도한 프로젝트들을 정리했습니다.
      </p>
    </header>

    <nav
      class="mb-8 flex flex-wrap gap-1 border-b border-surface-200 dark:border-surface-800"
      aria-label="Projects sub navigation"
    >
      <RouterLink
        v-for="tab in tabs"
        :key="tab.label"
        v-slot="{ isActive, navigate }"
        :to="tab.to"
        custom
      >
        <button
          type="button"
          class="-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors"
          :class="
            isActive
              ? 'border-primary text-primary'
              : 'border-transparent text-surface-500 hover:border-surface-300 hover:text-surface-700 dark:text-surface-400 dark:hover:border-surface-700 dark:hover:text-surface-200'
          "
          @click="navigate"
        >
          {{ tab.label }}
        </button>
      </RouterLink>
    </nav>

    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
