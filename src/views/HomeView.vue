<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
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
    <Tag value="Data Engineer & Backend Developer" severity="info" class="mb-6" />
    <h1
      class="text-4xl font-bold tracking-tight text-surface-900 sm:text-6xl dark:text-surface-0"
    >
      안녕하세요, <span class="text-primary">이진열</span>입니다.
    </h1>
    <p class="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-surface-600 dark:text-surface-300">
      스마트 팩토리 및 IIoT 도메인에서 <strong class="text-surface-800 dark:text-surface-100">대용량 시계열 데이터 최적화</strong>,
      <strong class="text-surface-800 dark:text-surface-100">인프라 고도화</strong>,
      <strong class="text-surface-800 dark:text-surface-100">데이터 표준화 파이프라인 구축</strong>을
      성공적으로 이끈 데이터 엔지니어 겸 백엔드 개발자입니다.
    </p>
    <p class="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-surface-600 dark:text-surface-300">
      약 50개 제조업체의 2,000여 개 센서에서 발생하는 대용량 시계열 데이터를 안정적으로 수집·관제하는
      시스템을 책임지며 비즈니스 가치를 극대화해왔습니다.
    </p>

    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink v-slot="{ navigate }" to="/projects" custom>
        <Button label="프로젝트 보기" icon="pi pi-arrow-right" icon-pos="right" @click="navigate" />
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
          label="연락하기"
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
