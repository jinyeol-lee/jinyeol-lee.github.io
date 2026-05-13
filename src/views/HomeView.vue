<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const highlights = [
  'TimescaleDB',
  'PostgreSQL',
  'FastAPI',
  'Spring Boot',
  'Airflow',
  'dbt',
  'Grafana',
  'Vue.js',
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
      스마트 팩토리 IoT 데이터 플랫폼을 설계·운영하는 Data Engineer / Backend Developer 입니다.
      TimescaleDB 기반 시계열 최적화, Grafana 모니터링 체계 구축, 멀티 테넌시 SaaS 플랫폼 1인 개발까지
      데이터 파이프라인 전반을 주도하고 있으며, 현재 Airflow + dbt ELT 전환과 MLOps 파이프라인을
      구축 중입니다.
    </p>

    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink v-slot="{ navigate }" to="/projects" custom>
        <Button label="프로젝트 보기" icon="pi pi-arrow-right" icon-pos="right" @click="navigate" />
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
      <Tag v-for="skill in highlights" :key="skill" :value="skill" severity="secondary" />
    </div>
  </section>
</template>
