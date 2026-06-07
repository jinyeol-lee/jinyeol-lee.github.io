<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { yearList, getProjectsByYear } from '@/data/projects'

const summaries = yearList.map((y) => ({
  ...y,
  projects: getProjectsByYear(y.key),
}))
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <RouterLink
      v-for="item in summaries"
      :key="item.key"
      :to="{ name: item.routeName }"
      class="block transition-transform hover:-translate-y-0.5"
    >
      <Card class="h-full">
        <template #title>
          <div class="flex items-center justify-between">
            <span class="text-lg">{{ item.label }}</span>
            <Tag :value="`${item.projects.length}개`" severity="info" />
          </div>
        </template>
        <template #subtitle>
          <span class="text-xs uppercase tracking-wider text-surface-500 dark:text-surface-400">
            {{ item.range }}
          </span>
        </template>
        <template #content>
          <p class="mb-4 text-sm leading-relaxed text-surface-600 dark:text-surface-300">
            {{ item.summary }}
          </p>
          <ul class="space-y-1.5">
            <li
              v-for="p in item.projects"
              :key="p.slug"
              class="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-200"
            >
              <i class="pi pi-circle-fill mt-1.5 text-[6px] text-primary" aria-hidden="true" />
              <span class="line-clamp-2">{{ p.title }}</span>
            </li>
          </ul>
        </template>
        <template #footer>
          <span class="inline-flex items-center gap-1 text-sm font-medium text-primary">
            자세히 보기 <i class="pi pi-arrow-right text-xs" aria-hidden="true" />
          </span>
        </template>
      </Card>
    </RouterLink>
  </div>
</template>
