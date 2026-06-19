<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { RouterLink } from 'vue-router'
import Card from 'primevue/card'
import ProjectDetail from '@/components/ProjectDetail.vue'
import TocPill from '@/components/TocPill.vue'
import ZoomableImage from '@/components/ZoomableImage.vue'
import { projects, years } from '@/data/projects'

const props = defineProps<{ slug: string }>()

const project = computed(() => projects.find((p) => p.slug === props.slug))
const showcase = computed(() =>
  project.value ? years[project.value.year].showcase : undefined,
)

watchEffect(() => {
  if (project.value) {
    document.title = `${project.value.title} · Portfolio`
  }
})

const tocItems = computed(() => {
  const p = project.value
  if (!p) return []
  const list: { id: string; label: string; level: number }[] = []
  list.push({ id: `project-${p.slug}`, label: '성과 요약', level: 0 })
  if (p.background) {
    list.push({ id: `background-${p.slug}`, label: '프로젝트 배경', level: 0 })
  }
  if (p.media?.length) {
    list.push({ id: `arch-${p.slug}`, label: '아키텍처', level: 0 })
  }
  const rationale = Array.isArray(p.techRationale)
    ? p.techRationale
    : p.techRationale
      ? [p.techRationale]
      : []
  if (rationale.length) {
    list.push({ id: `stack-${p.slug}`, label: '기술 스택', level: 0 })
  }
  if (p.codeSections?.length) {
    for (const sec of p.codeSections) {
      list.push({ id: `code-${p.slug}-${sec.slug}`, label: sec.title, level: 0 })
    }
  } else if (p.snippets?.length) {
    list.push({ id: `code-${p.slug}`, label: '핵심 코드', level: 0 })
  }
  if (showcase.value) {
    list.push({ id: `showcase-${p.slug}`, label: showcase.value.title, level: 0 })
  }
  return list
})
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-12">
    <RouterLink
      :to="{ path: '/', hash: '#projects' }"
      class="mb-6 inline-flex items-center gap-1 text-sm font-medium text-surface-500 transition-colors hover:text-primary dark:text-surface-400"
    >
      <i class="pi pi-arrow-left text-xs" aria-hidden="true" />
      프로젝트 목록
    </RouterLink>

    <div v-if="!project" class="py-16 text-center text-surface-500">
      해당 프로젝트를 찾을 수 없습니다.
    </div>

    <template v-else>
      <ProjectDetail :project="project" />

      <div v-if="showcase" class="mt-10">
        <Card :id="`showcase-${project.slug}`" class="scroll-mt-24">
          <template #title>
            <span class="flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
              <i class="pi pi-images text-base text-primary" aria-hidden="true" />
              {{ showcase.title }}
            </span>
          </template>
          <template #content>
            <p
              v-if="showcase.description"
              class="mb-5 text-sm leading-relaxed text-surface-600 dark:text-surface-300"
            >
              {{ showcase.description }}
            </p>
            <div class="grid gap-3 sm:grid-cols-2">
              <figure v-for="(item, idx) in showcase.items" :key="idx">
                <div
                  class="aspect-video overflow-hidden rounded-md border border-surface-200 bg-surface-50 dark:border-surface-700 dark:bg-surface-900"
                >
                  <ZoomableImage
                    :src="item.src"
                    :alt="item.alt"
                    fill-container
                    :image-class="
                      item.fit === 'contain'
                        ? 'block h-full w-full object-contain'
                        : 'block h-full w-full object-cover object-top'
                    "
                  />
                </div>
                <figcaption
                  v-if="item.caption"
                  class="mt-2 text-center text-xs text-surface-500 dark:text-surface-400"
                >
                  {{ item.caption }}
                </figcaption>
              </figure>
            </div>
          </template>
        </Card>
      </div>
    </template>

    <TocPill v-if="tocItems.length > 0" :items="tocItems" />
  </section>
</template>

<style scoped>
/* 섹션 카드 제목과 본문 사이에 약간의 여백 */
:deep(.p-card-title) {
  margin-bottom: 0.5rem;
}
</style>
