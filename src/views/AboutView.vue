<script setup lang="ts">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Timeline from 'primevue/timeline'

interface SkillGroup {
  category: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Backend',
    items: [
      'Spring Boot (Java/Kotlin)',
      'FastAPI (Python)',
      'Spring Data JPA',
      'Spring Security',
      'SQLAlchemy',
    ],
  },
  {
    category: 'Data Engineering',
    items: [
      'PostgreSQL',
      'TimescaleDB',
      'Airflow',
      'dbt',
      'Grafana',
      'Prometheus',
      'Loki',
      'Pandas',
      'Scikit-learn',
      'Scipy',
    ],
  },
  { category: 'Security', items: ['JWT', 'Casbin (RBAC)'] },
  {
    category: 'DevOps',
    items: ['Docker', 'Nginx', 'GitLab CI/CD', 'Streaming Replication'],
  },
  { category: 'Frontend', items: ['Vue.js'] },
]

interface TimelineItem {
  period: string
  title: string
  org?: string
  detail?: string
}

const timeline: TimelineItem[] = [
  {
    period: '2023.06 ~ 현재',
    title: '선임 연구원 — Data Engineer & Backend Developer',
    org: '(주) 이노비',
    detail:
      '스마트 팩토리 센서 데이터 수집·분석·시각화 플랫폼 운영, 50개 이상 업체 실시간 모니터링 시스템 구축, TimescaleDB 시계열 최적화, Airflow + dbt ELT 및 MLOps 파이프라인 도입.',
  },
  {
    period: '2014.03 ~ 2020.08',
    title: '화학공학과 학사',
    org: '광운대학교',
  },
]
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-16">
    <h1 class="mb-8 text-3xl font-bold text-surface-900 dark:text-surface-0">About</h1>

    <Card class="mb-10">
      <template #content>
        <p class="leading-relaxed text-surface-700 dark:text-surface-300">
          스마트 팩토리 IoT 데이터 플랫폼을 설계·운영한 Data Engineer / Backend Developer 입니다.
          TimescaleDB 기반 시계열 최적화, Grafana 모니터링 체계 구축, 멀티 테넌시 SaaS 플랫폼 1인 개발까지
          데이터 파이프라인 전반을 주도하였으며, 현재 Airflow + dbt ELT 전환 및 MLOps 파이프라인을
          구축하고 있습니다.
        </p>
      </template>
    </Card>

    <h2 class="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-0">Skills</h2>
    <div class="mb-10 grid gap-4 sm:grid-cols-2">
      <Card v-for="group in skillGroups" :key="group.category">
        <template #title>
          <span class="text-base">{{ group.category }}</span>
        </template>
        <template #content>
          <div class="flex flex-wrap gap-2">
            <Tag
              v-for="item in group.items"
              :key="item"
              :value="item"
              severity="secondary"
            />
          </div>
        </template>
      </Card>
    </div>

    <h2 class="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-0">Timeline</h2>
    <Timeline :value="timeline" align="left">
      <template #content="slotProps">
        <Card>
          <template #title>
            <span class="text-base">{{ slotProps.item.title }}</span>
          </template>
          <template #subtitle>
            {{ slotProps.item.org }}<span v-if="slotProps.item.org"> · </span>{{ slotProps.item.period }}
          </template>
          <template v-if="slotProps.item.detail" #content>
            <p class="text-surface-600 dark:text-surface-300">
              {{ slotProps.item.detail }}
            </p>
          </template>
        </Card>
      </template>
    </Timeline>
  </section>
</template>
