<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import SkillBadge from '@/components/SkillBadge.vue'

const highlights = [
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
  <section class="mx-auto max-w-6xl px-4 py-20 text-center">
    <h1
      class="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-surface-900 sm:text-5xl dark:text-surface-0"
    >
      대용량 시계열 데이터 인프라를 설계·운영하는
      <span class="text-primary">데이터 엔지니어</span>
    </h1>
    <p class="mt-4 text-lg font-medium text-surface-600 dark:text-surface-300">
      이진열 · Lee Jinyeol
    </p>
    <p class="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-surface-600 dark:text-surface-300">
      스마트 팩토리 및 IIoT 도메인에서
      <strong class="text-surface-800 dark:text-surface-100">시계열 데이터 최적화</strong> ·
      <strong class="text-surface-800 dark:text-surface-100">인프라 고도화</strong> ·
      <strong class="text-surface-800 dark:text-surface-100">데이터 표준화 파이프라인 구축</strong>
      을 책임지며, 약 50개 제조업체의 2,000여 개 센서에서 발생하는 대용량 시계열 데이터를
      안정적으로 수집·관제하는 시스템을 운영해왔습니다.
    </p>

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

    <div class="mt-12 flex flex-wrap justify-center gap-2">
      <SkillBadge v-for="skill in highlights" :key="skill" :name="skill" />
    </div>
  </section>
</template>
