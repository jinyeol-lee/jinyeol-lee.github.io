<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SkillBadge from '@/components/SkillBadge.vue'
import type { TechRationale } from '@/data/projects'

const props = defineProps<{
  items: TechRationale[]
}>()

const selectedIdx = ref(0)

// items 갱신 시 첫 번째로 reset
watch(
  () => props.items.length,
  () => {
    selectedIdx.value = 0
  },
)

const selected = computed(() => props.items[selectedIdx.value])
</script>

<template>
  <div>
    <!-- 클릭 가능한 기술 뱃지 탭 -->
    <div class="mb-5 flex flex-wrap gap-2">
      <button
        v-for="(item, i) in items"
        :key="i"
        type="button"
        class="rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-900"
        :class="[
          i === selectedIdx
            ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-surface-900'
            : 'opacity-50 hover:opacity-100',
        ]"
        :aria-pressed="i === selectedIdx"
        @click="selectedIdx = i"
      >
        <SkillBadge
          v-if="item.tech"
          :name="item.tech"
          size="lg"
        />
        <span
          v-else
          class="inline-flex items-center rounded-md border border-surface-300 px-3 py-1.5 text-sm font-medium text-surface-800 dark:border-surface-700 dark:text-surface-100"
        >
          {{ item.question }}
        </span>
      </button>
    </div>

    <!-- 선택된 기술의 설명 -->
    <div v-if="selected" class="space-y-3">
      <p
        v-if="selected.preface"
        class="text-sm leading-relaxed text-surface-700 dark:text-surface-300"
      >
        {{ selected.preface }}
      </p>
      <ol v-if="selected.reasons?.length" class="space-y-2 pl-0">
        <li
          v-for="(reason, rIdx) in selected.reasons"
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
</template>
