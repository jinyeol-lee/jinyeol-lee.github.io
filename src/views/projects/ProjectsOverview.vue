<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'
import { yearList, getProjectsByYear } from '@/data/projects'

const summaries = yearList.map((y) => ({
  ...y,
  projects: getProjectsByYear(y.key),
}))

const KEYWORDS = [
  'TimescaleDB',
  'Continuous Aggregate',
  'Cagg',
  'Hypertable',
  '하이퍼테이블',
  '하이퍼 함수',
  '연속집계',
  'PostgreSQL',
  'PgBouncer',
  'Streaming Replication',
  'Replica',
  'Slave DB',
  'Grafana Alloy',
  'Grafana',
  'VictoriaMetrics',
  'Prometheus',
  'Airflow',
  'dbt',
  'FastAPI',
  'Vue',
  'CBAM',
  '1인 풀스택',
  '풀스택',
  '사전 예방',
]

const METRIC_RE = /(\d+(?:\.\d+)?\s*(?:%|배|개월|개|시간|분|일|GB|MB|KB|TB|건|회))/g

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlight(text: string): string {
  let out = escapeHtml(text)
  // 1) keyword 강조 (긴 문자열부터 매칭되도록 길이 내림차순)
  for (const kw of [...KEYWORDS].sort((a, b) => b.length - a.length)) {
    const re = new RegExp(
      `(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'g',
    )
    out = out.replace(
      re,
      '<span class="font-semibold text-surface-900 dark:text-surface-0">$1</span>',
    )
  }
  // 2) 정량 임팩트 강조
  out = out.replace(
    METRIC_RE,
    '<span class="font-bold text-primary">$1</span>',
  )
  return out
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
          <span class="text-xl font-bold text-surface-900 dark:text-surface-0">
            {{ item.label }}
          </span>
        </template>
        <template #subtitle>
          <span class="text-xs uppercase tracking-wider text-surface-500 dark:text-surface-400">
            {{ item.range }}
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
