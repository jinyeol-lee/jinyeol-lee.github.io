<script setup lang="ts">
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'
import CodeBlock from '@/components/CodeBlock.vue'
import MetricBar from '@/components/MetricBar.vue'
import TechStackTabs from '@/components/TechStackTabs.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import ZoomableImage from '@/components/ZoomableImage.vue'
import { type MediaItem, type Project, type TechRationale } from '@/data/projects'
import { highlight } from '@/utils/highlight'

defineProps<{ project: Project }>()

function tabLabel(title: string): string {
  // "X — Y (Z)" 형태에서 ' — ' 앞 부분만 추출 (탭 헤더용 짧은 라벨)
  const sep = title.indexOf(' — ')
  return sep > 0 ? title.slice(0, sep) : title
}

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

function asRationaleList(
  r: TechRationale | TechRationale[] | undefined,
): TechRationale[] {
  if (!r) return []
  return Array.isArray(r) ? r : [r]
}

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
  <article
    :id="`project-${project.slug}`"
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

        <div
          v-if="typeof project.contribution === 'number'"
          class="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4"
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
                :class="gaugeColor(project.contribution)"
                :style="{ width: project.contribution + '%' }"
              />
            </div>
            <span
              class="shrink-0 text-sm font-bold tabular-nums"
              :class="gaugeTextColor(project.contribution)"
            >
              {{ project.contribution }}%
            </span>
          </div>
          <span
            v-if="project.contributionScope"
            class="text-xs leading-relaxed text-surface-600 dark:text-surface-400"
          >
            {{ project.contributionScope }}
          </span>
        </div>

        <div
          v-if="project.outcome"
          class="mt-5 rounded-md border-l-4 border-primary bg-primary-50 px-4 py-3 dark:bg-primary-950/30"
        >
          <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
            성과
          </div>
          <div
            class="text-sm leading-relaxed text-surface-800 dark:text-surface-100"
            v-html="highlight(project.outcome)"
          />
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
              <span v-html="highlight(role)" />
            </li>
          </ul>
        </div>

        <div
          v-if="project.metrics?.length"
          class="mt-5 rounded-md border border-surface-200 bg-surface-50/50 px-4 py-4 dark:border-surface-800 dark:bg-surface-900/30"
        >
          <div class="mb-4 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
            Before / After
          </div>
          <div
            class="grid gap-6"
            :class="
              project.metrics.length >= 3
                ? 'sm:grid-cols-2 lg:grid-cols-3'
                : project.metrics.length === 2
                  ? 'sm:grid-cols-2'
                  : ''
            "
          >
            <MetricBar v-for="(m, i) in project.metrics" :key="i" v-bind="m" />
          </div>
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

            <div :class="group.items.length > 1 ? 'grid gap-3 sm:grid-cols-2' : ''">
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

    <Card
      v-if="asRationaleList(project.techRationale).length"
      :id="`stack-${project.slug}`"
      class="scroll-mt-24"
    >
      <template #title>
        <span class="flex items-center gap-2 text-xl font-bold text-surface-900 dark:text-surface-0">
          <i class="pi pi-wrench text-base text-primary" aria-hidden="true" />
          기술 스택
        </span>
      </template>
      <template #content>
        <TechStackTabs :items="asRationaleList(project.techRationale)" />
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
          class="mb-4"
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
              class="flex gap-2.5 text-sm leading-relaxed text-surface-600 dark:text-surface-300"
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
        <Tabs v-if="(project.snippets?.length ?? 0) > 1" :value="'0'">
          <TabList>
            <Tab v-for="(s, i) in project.snippets" :key="i" :value="String(i)">
              {{ tabLabel(s.title) }}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel v-for="(s, i) in project.snippets" :key="i" :value="String(i)">
              <CodeBlock
                :title="s.title"
                :description="s.description"
                :language="s.language"
                :code="s.code"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <div v-else class="flex flex-col gap-4">
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
        <div v-if="section.headline || section.note?.length" class="mb-4">
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
              class="flex gap-2.5 text-sm leading-relaxed text-surface-600 dark:text-surface-300"
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
          <section v-for="(group, gIdx) in groupMedia(section.media)" :key="gIdx">
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
            <div :class="group.items.length > 1 ? 'grid gap-3 sm:grid-cols-2' : ''">
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

        <Tabs v-if="section.snippets.length > 1" :value="'0'">
          <TabList>
            <Tab v-for="(s, i) in section.snippets" :key="i" :value="String(i)">
              {{ tabLabel(s.title) }}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel v-for="(s, i) in section.snippets" :key="i" :value="String(i)">
              <CodeBlock
                :title="s.title"
                :description="s.description"
                :language="s.language"
                :code="s.code"
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <div v-else class="flex flex-col gap-4">
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
          <section v-for="(group, gIdx) in groupMedia(section.media)" :key="gIdx">
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
            <div :class="group.items.length > 1 ? 'grid gap-3 sm:grid-cols-2' : ''">
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
</template>
