<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'
import { projects } from '@/data/projects'
import { highlight } from '@/utils/highlight'

// 최신 프로젝트 우선 (데이터는 오래된 순으로 정의됨)
const list = [...projects].reverse()
</script>

<template>
  <section id="projects" class="mx-auto max-w-5xl scroll-mt-24">
    <h2 class="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-0">Projects</h2>

    <div class="flex flex-col gap-6">
      <RouterLink
        v-for="p in list"
        :key="p.slug"
        :to="{ name: 'project-detail', params: { slug: p.slug } }"
        class="group block transition-transform hover:-translate-y-0.5"
      >
        <Card class="h-full">
          <template #content>
            <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 class="text-lg font-bold text-surface-900 dark:text-surface-0">
                {{ p.title }}
              </h3>
              <span class="text-xs uppercase tracking-wider text-surface-500 dark:text-surface-400">
                {{ p.period }}
              </span>
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <SkillBadge v-for="tag in p.tags" :key="tag" :name="tag" size="sm" />
            </div>

            <div
              class="mt-4 rounded-md border-l-4 border-primary bg-primary-50 px-4 py-3 dark:bg-primary-950/30"
            >
              <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
                성과
              </div>
              <div
                class="text-sm leading-relaxed text-surface-800 dark:text-surface-100"
                v-html="highlight(p.outcome)"
              />
            </div>

            <span class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              자세히 보기
              <i
                class="pi pi-arrow-right text-xs transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </template>
        </Card>
      </RouterLink>
    </div>
  </section>
</template>
