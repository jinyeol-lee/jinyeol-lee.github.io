<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'
import { yearList, getProjectsByYear } from '@/data/projects'
import { highlight } from '@/utils/highlight'

const summaries = yearList.map((y) => ({
  ...y,
  projects: getProjectsByYear(y.key),
}))

function gaugeColor(value: number): string {
  if (value >= 80) return 'bg-emerald-500'
  if (value >= 50) return 'bg-amber-500'
  return 'bg-sky-400'
}

function gaugeTextColor(value: number): string {
  if (value >= 80) return 'text-emerald-600 dark:text-emerald-400'
  if (value >= 50) return 'text-amber-600 dark:text-amber-400'
  return 'text-sky-600 dark:text-sky-400'
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <RouterLink
      v-for="item in summaries"
      :key="item.key"
      :to="{ name: item.routeName }"
      class="block transition-transform hover:-translate-y-0.5"
    >
      <Card class="h-full">
        <template #title>
          <span class="flex flex-nowrap items-baseline gap-3 whitespace-nowrap">
            <span class="text-xl font-bold text-surface-900 dark:text-surface-0">
              {{ item.label }}
            </span>
            <span class="text-xs uppercase tracking-wider text-surface-500 dark:text-surface-400">
              {{ item.range }}
            </span>
          </span>
        </template>
        <template #content>
          <div class="flex flex-col gap-8">
            <article v-for="p in item.projects" :key="p.slug">
              <h3 class="mb-1 text-base font-bold text-surface-900 dark:text-surface-0">
                {{ p.title }}
              </h3>
              <div class="mb-4 text-xs text-surface-500 dark:text-surface-400">
                {{ p.period }}
              </div>

              <div class="mb-4 flex flex-wrap gap-2">
                <SkillBadge v-for="tag in p.tags" :key="tag" :name="tag" size="sm" />
              </div>

              <div
                v-if="typeof p.contribution === 'number'"
                class="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
              >
                <div class="flex shrink-0 items-center gap-3 sm:w-64">
                  <span
                    class="text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
                  >
                    기여도
                  </span>
                  <div
                    class="relative h-2 flex-1 overflow-hidden rounded-full bg-surface-200 dark:bg-surface-800"
                  >
                    <div
                      class="h-full rounded-full transition-[width] duration-500"
                      :class="gaugeColor(p.contribution)"
                      :style="{ width: p.contribution + '%' }"
                    />
                  </div>
                  <span
                    class="shrink-0 text-sm font-bold tabular-nums"
                    :class="gaugeTextColor(p.contribution)"
                  >
                    {{ p.contribution }}%
                  </span>
                </div>
                <span
                  v-if="p.contributionScope"
                  class="text-xs leading-relaxed text-surface-600 dark:text-surface-400"
                >
                  {{ p.contributionScope }}
                </span>
              </div>

              <div
                class="mb-4 rounded-md border-l-4 border-primary bg-primary-50 px-4 py-3 dark:bg-primary-950/30"
              >
                <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  성과
                </div>
                <div
                  class="text-sm leading-relaxed text-surface-800 dark:text-surface-100"
                  v-html="highlight(p.outcome)"
                />
              </div>

              <div>
                <div
                  class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
                >
                  역할
                </div>
                <ul class="space-y-2 pl-1">
                  <li
                    v-for="role in p.roles"
                    :key="role"
                    class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                  >
                    <i class="pi pi-check mt-1 text-xs text-primary" aria-hidden="true" />
                    <span v-html="highlight(role)" />
                  </li>
                </ul>
              </div>
            </article>
          </div>
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
