<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

interface TocItem {
  id: string
  label: string
  level?: number
}

const props = defineProps<{ items: TocItem[] }>()

const activeId = ref<string | null>(null)
let observer: IntersectionObserver | null = null

function setup() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          return
        }
      }
    },
    { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
  )
  for (const item of props.items) {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  }
}

onMounted(() => {
  // give the DOM a tick to render the target sections
  window.setTimeout(setup, 60)
})

watch(
  () => props.items.map((i) => i.id).join(','),
  () => window.setTimeout(setup, 60),
)

onUnmounted(() => observer?.disconnect())

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
  activeId.value = id
}
</script>

<template>
  <aside
    class="pointer-events-none fixed top-[40%] right-[calc(25vw-22.5rem)] z-40 hidden w-52 max-h-[calc(100vh-8rem)] -translate-y-1/2 overflow-y-auto 2xl:block"
    aria-label="목차"
  >
    <div class="pointer-events-auto">
      <div
        class="mb-3 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
      >
        목차
      </div>
      <ul class="border-l border-surface-200 dark:border-surface-800">
        <li v-for="item in items" :key="item.id">
          <a
            :href="`#${item.id}`"
            class="-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors"
            :class="[
              activeId === item.id
                ? 'border-primary font-medium text-primary'
                : 'border-transparent text-surface-600 hover:border-surface-400 hover:text-surface-900 dark:text-surface-400 dark:hover:text-surface-100',
              (item.level ?? 0) >= 1 ? 'pl-7 text-xs' : 'pl-3',
            ]"
            @click.prevent="scrollTo(item.id)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>
