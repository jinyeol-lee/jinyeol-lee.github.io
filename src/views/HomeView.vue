<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import SkillBadge from '@/components/SkillBadge.vue'

const stats = [
  { value: '50+', label: '제조업체' },
  { value: '2,000+', label: '센서' },
  { value: '520MB', label: '일 적재량' },
  { value: '3', label: '년차' },
]

const techStack = [
  'Java',
  'Python',
  'Spring Boot',
  'FastAPI',
  'PostgreSQL',
  'TimescaleDB',
  'Airflow',
  'dbt',
  'Grafana',
  'Docker',
]
</script>

<template>
  <section class="relative mx-auto max-w-6xl overflow-hidden px-4 py-20 sm:py-28">
    <!-- 배경 그라데이션 모티프 -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-3xl bg-gradient-to-b from-primary-100/40 to-transparent blur-3xl dark:from-primary-900/30"
    />

    <!-- Hero 타이틀 블록 (가운데 배치, 내부 좌측 정렬로 大·데·데 운율 강조) -->
    <div class="mx-auto max-w-3xl text-left">
      <h1
        class="text-3xl font-bold leading-[1.15] tracking-tight text-surface-900 sm:text-4xl md:text-5xl dark:text-surface-0"
      >
        <span class="block">
          <span class="text-primary">제</span>조 현장 시계열
        </span>
        <span class="block">
          <span class="text-primary">데</span>이터 인프라를 설계·운영하는
        </span>
        <span class="block">
          <span class="text-primary">데</span>이터 엔지니어
        </span>
      </h1>

      <p class="mt-6 text-lg font-medium text-surface-600 dark:text-surface-300">
        이진열 · Lee Jinyeol
      </p>

      <p
        class="mt-8 text-base leading-relaxed text-surface-600 dark:text-surface-300"
      >
        스마트 팩토리 및 IIoT 도메인에서
        <strong class="text-surface-800 dark:text-surface-100">시계열 데이터 최적화</strong> ·
        <strong class="text-surface-800 dark:text-surface-100">인프라 고도화</strong> ·
        <strong class="text-surface-800 dark:text-surface-100">데이터 표준화 파이프라인 구축</strong>
        을 책임지며, 제조 현장 시계열 데이터를 안정적으로 수집·관제하는 시스템을 운영해왔습니다.
      </p>
    </div>

    <!-- CTA -->
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink v-slot="{ navigate }" to="/projects" custom>
        <Button label="Projects" icon="pi pi-arrow-right" icon-pos="right" @click="navigate" />
      </RouterLink>
      <RouterLink v-slot="{ navigate }" to="/about" custom>
        <Button
          label="About"
          icon="pi pi-user"
          severity="secondary"
          variant="outlined"
          @click="navigate"
        />
      </RouterLink>
      <RouterLink v-slot="{ navigate }" to="/contact" custom>
        <Button
          label="Contact"
          icon="pi pi-envelope"
          severity="secondary"
          variant="outlined"
          @click="navigate"
        />
      </RouterLink>
    </div>

    <!-- KPI Stats -->
    <div
      class="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
    >
      <div
        v-for="s in stats"
        :key="s.label"
        class="rounded-xl border border-surface-200 bg-white px-4 py-6 shadow-sm transition-transform hover:-translate-y-0.5 dark:border-surface-800 dark:bg-surface-900"
      >
        <div class="text-3xl font-bold tabular-nums text-primary sm:text-4xl">
          {{ s.value }}
        </div>
        <div
          class="mt-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
        >
          {{ s.label }}
        </div>
      </div>
    </div>

    <!-- 기술 스택 클러스터 -->
    <div class="mt-14 text-center">
      <div
        class="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-surface-500 dark:text-surface-400"
      >
        Tech Stack
      </div>
      <div class="flex flex-wrap justify-center gap-2.5">
        <SkillBadge
          v-for="skill in techStack"
          :key="skill"
          :name="skill"
          size="lg"
        />
      </div>
    </div>
  </section>
</template>
