<script setup lang="ts">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: 'Portfolio Site',
    description: 'Vue 3 + PrimeVue + Tailwind 기반 개인 포트폴리오 사이트.',
    tags: ['Vue', 'TypeScript', 'TailwindCSS'],
    link: '#',
  },
  {
    title: 'Sample Project',
    description: '여기에 프로젝트 설명을 작성하세요.',
    tags: ['Vue', 'API'],
    link: '#',
  },
  {
    title: 'Another Project',
    description: '여기에 프로젝트 설명을 작성하세요.',
    tags: ['Node.js', 'PostgreSQL'],
  },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-16">
    <h1 class="mb-2 text-3xl font-bold text-surface-900 dark:text-surface-0">Projects</h1>
    <p class="mb-8 text-surface-600 dark:text-surface-300">
      그동안 진행한 프로젝트들을 소개합니다.
    </p>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card v-for="project in projects" :key="project.title" class="h-full">
        <template #title>{{ project.title }}</template>
        <template #content>
          <p class="mb-4 text-surface-600 dark:text-surface-300">
            {{ project.description }}
          </p>
          <div class="flex flex-wrap gap-2">
            <Tag v-for="tag in project.tags" :key="tag" :value="tag" severity="secondary" />
          </div>
        </template>
        <template #footer>
          <Button
            v-if="project.link"
            label="자세히 보기"
            icon="pi pi-external-link"
            variant="text"
            size="small"
            as="a"
            :href="project.link"
            target="_blank"
            rel="noopener"
          />
        </template>
      </Card>
    </div>
  </section>
</template>
