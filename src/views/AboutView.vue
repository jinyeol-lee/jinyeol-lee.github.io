<script setup lang="ts">
import Card from 'primevue/card'
import Timeline from 'primevue/timeline'

const timeline = [
  { year: '2024 — Present', title: 'Frontend Developer', detail: 'Vue 3 / TypeScript 기반 SPA 개발' },
  { year: '2023', title: 'Side Projects', detail: '개인 프로젝트 및 오픈소스 기여' },
  { year: '2022', title: 'Computer Science', detail: '컴퓨터 공학 학사 졸업' },
]
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-16">
    <h1 class="mb-8 text-3xl font-bold text-surface-900 dark:text-surface-0">About me</h1>

    <Card class="mb-8">
      <template #content>
        <p class="leading-relaxed text-surface-700 dark:text-surface-300">
          꾸준히 학습하고 만드는 것을 좋아하는 개발자입니다.
          좋은 사용자 경험과 유지보수 가능한 코드를 고민하며,
          새로운 기술을 직접 적용해 보는 과정을 즐깁니다.
        </p>
      </template>
    </Card>

    <h2 class="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-0">Timeline</h2>
    <Timeline :value="timeline" align="alternate">
      <template #content="slotProps">
        <Card>
          <template #title>{{ slotProps.item.title }}</template>
          <template #subtitle>{{ slotProps.item.year }}</template>
          <template #content>
            <p class="text-surface-600 dark:text-surface-300">{{ slotProps.item.detail }}</p>
          </template>
        </Card>
      </template>
    </Timeline>
  </section>
</template>
