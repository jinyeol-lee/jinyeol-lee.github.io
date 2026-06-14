<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import FloatingToc from '@/components/FloatingToc.vue'
import ZoomableImage from '@/components/ZoomableImage.vue'
import {
  getProjectsByYear,
  years,
  type MediaItem,
  type TechRationale,
  type YearKey,
} from '@/data/projects'

function asRationaleList(
  r: TechRationale | TechRationale[] | undefined,
): TechRationale[] {
  if (!r) return []
  return Array.isArray(r) ? r : [r]
}

const props = defineProps<{ year: YearKey }>()

const meta = computed(() => years[props.year])
const items = computed(() => getProjectsByYear(props.year))

const tocItems = computed(() => {
  const list: { id: string; label: string; level: number }[] = []
  for (const p of items.value) {
    list.push({ id: `project-${p.slug}`, label: p.title, level: 0 })
    if (p.background) {
      list.push({ id: `background-${p.slug}`, label: '프로젝트 배경', level: 0 })
    }
    if (p.media?.length) {
      list.push({ id: `arch-${p.slug}`, label: '아키텍처', level: 0 })
    }
    if (p.codeSections?.length) {
      for (const sec of p.codeSections) {
        list.push({
          id: `code-${p.slug}-${sec.slug}`,
          label: sec.title,
          level: 0,
        })
      }
    } else if (p.snippets?.length) {
      list.push({ id: `code-${p.slug}`, label: '핵심 코드', level: 0 })
    }
  }
  if (meta.value.showcase) {
    list.push({
      id: `showcase-${props.year}`,
      label: meta.value.showcase.title,
      level: 0,
    })
  }
  return list
})

interface MediaGroup {
  label: string
  items: MediaItem[]
}

function groupMedia(media: MediaItem[]): MediaGroup[] {
  const groups: MediaGroup[] = []
  for (const item of media) {
    const last = groups[groups.length - 1]
    if (last && last.label === item.label) last.items.push(item)
    else groups.push({ label: item.label, items: [item] })
  }
  return groups
}
</script>

<template>
  <div>
    <div v-if="items.length === 0" class="py-10 text-center text-surface-500">
      등록된 프로젝트가 없습니다.
    </div>

    <div v-if="items.length > 0" class="flex flex-col gap-10">
      <article
        v-for="project in items"
        :id="`project-${project.slug}`"
        :key="project.slug"
        class="flex flex-col gap-3 scroll-mt-24"
      >
      <Card>
        <template #title>
          <span class="text-xl font-bold text-surface-900 dark:text-surface-0">{{ project.title }}</span>
        </template>
        <template #subtitle>
          <span class="text-sm text-surface-500 dark:text-surface-400">
            {{ project.period }}
          </span>
        </template>
        <template #content>
          <div class="flex flex-wrap gap-2">
            <SkillBadge v-for="tag in project.tags" :key="tag" :name="tag" />
          </div>

          <p class="mt-5 text-sm leading-relaxed text-surface-700 dark:text-surface-300">
            {{ meta.summary }}
          </p>

          <div
            v-if="project.outcome"
            class="mt-5 rounded-md border-l-4 border-primary bg-primary-50 px-4 py-3 dark:bg-primary-950/30"
          >
            <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
              성과
            </div>
            <div class="text-sm leading-relaxed text-surface-800 dark:text-surface-100">
              {{ project.outcome }}
            </div>
          </div>

          <div v-if="project.roles?.length" class="mt-5">
            <div
              class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
            >
              역할
            </div>
            <ul class="space-y-2 pl-1">
              <li
                v-for="role in project.roles"
                :key="role"
                class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
              >
                <i class="pi pi-check mt-1 text-xs text-primary" aria-hidden="true" />
                <span>{{ role }}</span>
              </li>
            </ul>
          </div>
        </template>
      </Card>

      <Card
        v-if="project.background"
        :id="`background-${project.slug}`"
        class="scroll-mt-24"
      >
        <template #title>
          <span class="flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
            <i class="pi pi-bullseye text-base text-primary" aria-hidden="true" />
            프로젝트 배경
          </span>
        </template>
        <template #content>
          <div class="flex flex-col gap-5">
            <section v-if="project.background.context">
              <div class="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">
                <i class="pi pi-globe text-sm text-primary" aria-hidden="true" />
                배경
              </div>
              <ul
                v-if="Array.isArray(project.background.context)"
                class="space-y-2 pl-1"
              >
                <li
                  v-for="(item, i) in project.background.context"
                  :key="i"
                  class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                >
                  <i class="pi pi-circle-fill mt-1.5 text-[5px] text-primary" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
              <p v-else class="text-sm leading-relaxed text-surface-700 dark:text-surface-300">
                {{ project.background.context }}
              </p>
            </section>
            <section v-if="project.background.problem">
              <div class="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">
                <i class="pi pi-exclamation-triangle text-sm text-primary" aria-hidden="true" />
                문제
              </div>
              <ul
                v-if="Array.isArray(project.background.problem)"
                class="space-y-2 pl-1"
              >
                <li
                  v-for="(item, i) in project.background.problem"
                  :key="i"
                  class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                >
                  <i class="pi pi-circle-fill mt-1.5 text-[5px] text-primary" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
              <p v-else class="text-sm leading-relaxed text-surface-700 dark:text-surface-300">
                {{ project.background.problem }}
              </p>
            </section>
            <section v-if="project.background.goal">
              <div class="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-surface-700 dark:text-surface-200">
                <i class="pi pi-flag text-sm text-primary" aria-hidden="true" />
                목표
              </div>
              <ul
                v-if="Array.isArray(project.background.goal)"
                class="space-y-2 pl-1"
              >
                <li
                  v-for="(item, i) in project.background.goal"
                  :key="i"
                  class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                >
                  <i class="pi pi-circle-fill mt-1.5 text-[5px] text-primary" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>
              <p v-else class="text-sm leading-relaxed text-surface-700 dark:text-surface-300">
                {{ project.background.goal }}
              </p>
            </section>
          </div>
        </template>
      </Card>

      <Card
        v-if="project.media?.length"
        :id="`arch-${project.slug}`"
        class="scroll-mt-24"
      >
        <template #title>
          <span class="flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
            <i class="pi pi-sitemap text-base text-primary" aria-hidden="true" />
            아키텍처
          </span>
        </template>
        <template #content>
          <div class="space-y-8">
            <section v-for="(group, gIdx) in groupMedia(project.media)" :key="gIdx">
              <div
                v-if="groupMedia(project.media).length > 1"
                class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
              >
                {{ group.label }}
                <span
                  v-if="group.items.length > 1"
                  class="ml-1 normal-case text-surface-400"
                >
                  ({{ group.items.length }})
                </span>
              </div>
              <div
                v-if="group.items[0]?.description?.length"
                class="mb-4 space-y-2"
              >
                <p
                  v-for="(para, pIdx) in group.items[0].description"
                  :key="pIdx"
                  class="text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                >
                  {{ para }}
                </p>
              </div>

              <div
                :class="
                  group.items.length > 1
                    ? 'grid gap-3 sm:grid-cols-2'
                    : ''
                "
              >
                <figure v-for="(item, idx) in group.items" :key="idx">
                  <div
                    class="overflow-hidden rounded-md border border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900"
                    :class="group.items.length > 1 ? 'aspect-video' : ''"
                  >
                    <ZoomableImage
                      :src="item.src"
                      :alt="item.alt"
                      :fill-container="group.items.length > 1"
                      :image-class="
                        group.items.length > 1
                          ? (item.fit === 'contain'
                              ? 'block h-full w-full object-contain'
                              : 'block h-full w-full object-cover object-top')
                          : 'block w-full'
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

              <div
                v-if="gIdx === 0 && asRationaleList(project.techRationale).length"
                class="mt-5 flex flex-col gap-3"
              >
                <div
                  v-for="(rationale, qIdx) in asRationaleList(project.techRationale)"
                  :key="qIdx"
                  class="overflow-hidden rounded-lg border border-primary-200 bg-primary-50/40 dark:border-primary-800 dark:bg-primary-950/20"
                >
                  <div
                    class="flex items-center gap-2 border-b border-primary-200 bg-primary-50/60 px-4 py-2.5 dark:border-primary-800 dark:bg-primary-950/30"
                  >
                    <i
                      class="pi pi-question-circle text-sm text-primary"
                      aria-hidden="true"
                    />
                    <span class="text-sm font-semibold text-surface-900 dark:text-surface-0">
                      {{ rationale.question }}
                    </span>
                  </div>
                  <div class="space-y-3 p-4">
                    <p
                      v-if="rationale.preface"
                      class="text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                    >
                      {{ rationale.preface }}
                    </p>
                    <ol class="space-y-2 pl-0">
                      <li
                        v-for="(reason, rIdx) in rationale.reasons"
                        :key="rIdx"
                        class="flex gap-2.5 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
                      >
                        <span
                          class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
                        >
                          {{ rIdx + 1 }}
                        </span>
                        <span>{{ reason }}</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </template>
      </Card>

      <Card
        v-if="!project.codeSections?.length && project.snippets?.length"
        :id="`code-${project.slug}`"
        class="scroll-mt-24"
      >
        <template #title>
          <span class="flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
            <i class="pi pi-code text-base text-primary" aria-hidden="true" />
            핵심 코드
          </span>
        </template>
        <template #content>
          <div
            v-if="project.snippetsHeadline || project.snippetsNote?.length"
            class="mb-4 rounded-md border-l-4 border-primary-300 bg-primary-50/60 px-4 py-3 dark:border-primary-700 dark:bg-primary-950/30"
          >
            <p
              v-if="project.snippetsHeadline"
              class="text-sm font-semibold leading-relaxed text-surface-900 dark:text-surface-0"
            >
              {{ project.snippetsHeadline }}
            </p>
            <ol
              v-if="project.snippetsNote?.length"
              class="space-y-2 pl-0"
              :class="project.snippetsHeadline ? 'mt-3' : ''"
            >
              <li
                v-for="(item, idx) in project.snippetsNote"
                :key="idx"
                class="flex gap-2.5 text-sm leading-relaxed text-surface-700 dark:text-surface-200"
              >
                <span
                  class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
                >
                  {{ idx + 1 }}
                </span>
                <span>{{ item }}</span>
              </li>
            </ol>
          </div>
          <div class="flex flex-col gap-4">
            <CodeBlock
              v-for="snippet in project.snippets"
              :key="snippet.title"
              :title="snippet.title"
              :description="snippet.description"
              :language="snippet.language"
              :code="snippet.code"
            />
          </div>
        </template>
      </Card>

      <Card
        v-for="section in project.codeSections"
        :key="section.slug"
        :id="`code-${project.slug}-${section.slug}`"
        class="scroll-mt-24"
      >
        <template #title>
          <span class="flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
            <i :class="[section.icon ?? 'pi pi-code', 'text-base text-primary']" aria-hidden="true" />
            {{ section.title }}
          </span>
        </template>
        <template #content>
          <div
            v-if="section.headline || section.note?.length"
            class="mb-4 rounded-md border-l-4 border-primary-300 bg-primary-50/60 px-4 py-3 dark:border-primary-700 dark:bg-primary-950/30"
          >
            <p
              v-if="section.headline"
              class="text-sm font-semibold leading-relaxed text-surface-900 dark:text-surface-0"
            >
              {{ section.headline }}
            </p>
            <ol
              v-if="section.note?.length"
              class="space-y-2 pl-0"
              :class="section.headline ? 'mt-3' : ''"
            >
              <li
                v-for="(item, idx) in section.note"
                :key="idx"
                class="flex gap-2.5 text-sm leading-relaxed text-surface-700 dark:text-surface-200"
              >
                <span
                  class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
                >
                  {{ idx + 1 }}
                </span>
                <span>{{ item }}</span>
              </li>
            </ol>
          </div>
          <div
            v-if="section.media?.length && section.mediaAbove"
            class="mb-6 space-y-8"
          >
            <section
              v-for="(group, gIdx) in groupMedia(section.media)"
              :key="gIdx"
            >
              <div
                class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
              >
                {{ group.label }}
                <span
                  v-if="group.items.length > 1"
                  class="ml-1 normal-case text-surface-400"
                >
                  ({{ group.items.length }})
                </span>
              </div>
              <div
                :class="
                  group.items.length > 1
                    ? 'grid gap-3 sm:grid-cols-2'
                    : ''
                "
              >
                <figure v-for="(item, idx) in group.items" :key="idx">
                  <div
                    class="overflow-hidden rounded-md border border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900"
                    :class="group.items.length > 1 ? 'aspect-video' : ''"
                  >
                    <ZoomableImage
                      :src="item.src"
                      :alt="item.alt"
                      :fill-container="group.items.length > 1"
                      :image-class="
                        group.items.length > 1
                          ? (item.fit === 'contain'
                              ? 'block h-full w-full object-contain'
                              : 'block h-full w-full object-cover object-top')
                          : 'block w-full'
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
            </section>
          </div>

          <div class="flex flex-col gap-4">
            <CodeBlock
              v-for="snippet in section.snippets"
              :key="snippet.title"
              :title="snippet.title"
              :description="snippet.description"
              :language="snippet.language"
              :code="snippet.code"
            />
          </div>

          <div
            v-if="section.media?.length && !section.mediaAbove"
            class="mt-6 space-y-8"
          >
            <section
              v-for="(group, gIdx) in groupMedia(section.media)"
              :key="gIdx"
            >
              <div
                class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
              >
                {{ group.label }}
                <span
                  v-if="group.items.length > 1"
                  class="ml-1 normal-case text-surface-400"
                >
                  ({{ group.items.length }})
                </span>
              </div>
              <div
                :class="
                  group.items.length > 1
                    ? 'grid gap-3 sm:grid-cols-2'
                    : ''
                "
              >
                <figure v-for="(item, idx) in group.items" :key="idx">
                  <div
                    class="overflow-hidden rounded-md border border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900"
                    :class="group.items.length > 1 ? 'aspect-video' : ''"
                  >
                    <ZoomableImage
                      :src="item.src"
                      :alt="item.alt"
                      :fill-container="group.items.length > 1"
                      :image-class="
                        group.items.length > 1
                          ? (item.fit === 'contain'
                              ? 'block h-full w-full object-contain'
                              : 'block h-full w-full object-cover object-top')
                          : 'block w-full'
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
            </section>
          </div>
        </template>
      </Card>
      </article>
    </div>

    <div v-if="meta.showcase" class="mt-10">
      <Card :id="`showcase-${year}`" class="scroll-mt-24">
        <template #title>
          <span class="flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
            <i class="pi pi-images text-base text-primary" aria-hidden="true" />
            {{ meta.showcase.title }}
          </span>
        </template>
        <template #content>
          <p
            v-if="meta.showcase.description"
            class="mb-5 text-sm leading-relaxed text-surface-600 dark:text-surface-300"
          >
            {{ meta.showcase.description }}
          </p>
          <div class="grid gap-3 sm:grid-cols-2">
            <figure v-for="(item, idx) in meta.showcase.items" :key="idx">
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

    <FloatingToc v-if="tocItems.length > 0" :items="tocItems" />
  </div>
</template>
