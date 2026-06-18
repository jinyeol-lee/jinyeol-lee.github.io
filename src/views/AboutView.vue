<script setup lang="ts">
import Card from 'primevue/card'
import SkillBadge from '@/components/SkillBadge.vue'

interface SkillGroup {
  category: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  { category: 'Language', items: ['Java', 'Python'] },
  { category: 'Backend', items: ['Spring Boot', 'FastAPI'] },
  { category: 'Database', items: ['PostgreSQL', 'TimescaleDB', 'SQL'] },
  {
    category: 'Data Engineering',
    items: ['Python', 'Airflow', 'dbt', 'Grafana'],
  },
  { category: 'DevOps', items: ['Docker', 'GitLab'] },
]

const experiences = [
  {
    company: '(주) 이노비',
    role: '선임 연구원 — Data Engineer & Backend Developer',
    period: '2023.06 ~ 현재',
    highlights: [
      {
        title: '데이터 아키텍처 및 쿼리 최적화',
        detail:
          'TimescaleDB 하이퍼테이블·연속집계 (Cagg)·청크 압축 정책 도입으로 IIoT 시계열 조회 속도 2~3배 향상, 집계 쿼리 70% 이상 단축 및 데이터 저장 공간 80% 이상 절감',
      },
      {
        title: '인프라 고도화 및 장애 예방',
        detail:
          'Prometheus 메트릭 분석 기반의 DB CPU 부하 최적화 (99% → 25%) 및 Slave DB 소스 격리, Grafana Alloy 기반의 알림 구축을 통한 현장 장비 다운 장애 사전 예방',
      },
      {
        title: '파이프라인 구축 및 비즈니스 확장',
        detail:
          'Apache Airflow 및 dbt 도입을 통한 파편화된 제조 데이터 표준화로 운영 공수 80% 감축, 생성형 AI 를 활용한 신규 CBAM 서비스 (FastAPI, Vue) 1인 전담 개발',
      },
    ],
  },
]

const education = [
  {
    title: '광운대학교 화학공학과 학사',
    period: '2014.03 ~ 2020.08',
  },
  {
    title: '국비지원 교육 과정 수료 — 자바/코틀린 웹&앱 개발',
    period: '2021.10 ~ 2022.04',
  },
]

const certificates = [
  {
    title: '빅데이터분석기사',
    issuer: '한국데이터산업진흥원',
    date: '2025.07',
  },
  {
    title: '정보처리기사',
    issuer: '한국산업인력공단',
    date: '2023.11',
  },
]
</script>

<template>
  <section class="mx-auto max-w-4xl px-4 py-16">
    <h1 class="mb-8 text-3xl font-bold text-surface-900 dark:text-surface-0">About</h1>

    <Card class="mb-10">
      <template #content>
        <div class="space-y-4 leading-relaxed text-surface-700 dark:text-surface-300">
          <p class="text-lg font-semibold leading-snug text-surface-900 dark:text-surface-0">
            "제조 현장 시계열 데이터의 처리·관제부터 표준화 파이프라인까지,<br class="hidden sm:block" />
            데이터로 시스템 가용성과 비즈니스 가치를 끌어올리는 데이터 엔지니어"
          </p>
          <p>
            스마트 팩토리·IIoT 도메인에서 약 50개 제조업체, 2,000여 개 센서가 연결된 시계열 데이터
            플랫폼의 데이터 처리·관제 영역을 담당해 온 데이터 엔지니어 겸 백엔드 개발자입니다.
          </p>
          <p>
            TimescaleDB 최적화로 시계열 조회 2~3배 향상·집계 쿼리 70% 단축·저장 공간 80% 절감을 이뤘고,
            Prometheus 진단과 Slave DB 격리로 DB CPU 부하를 99%→25% 로 안정화하며 Grafana Alloy
            알림 체계로 현장 장비 다운 장애를 사전 예방했습니다. 이어 Airflow·dbt 표준화 파이프라인으로
            운영 공수를 80% 절감하고, 생성형 AI 를 활용해 신규 CBAM 서비스(FastAPI·Vue)를 설계부터
            배포까지 1인 풀스택으로 개발했습니다.
          </p>
          <p>
            데이터 기반의 병목 진단과 자원 최적화로 시스템 가용성을 높이고, 확장 가능한 데이터 파이프라인을
            설계하는 전문 데이터 엔지니어로 성장하고자 합니다.
          </p>
        </div>
      </template>
    </Card>

    <h2 class="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-0">Experience</h2>
    <div class="mb-10 flex flex-col gap-4">
      <Card v-for="exp in experiences" :key="exp.company">
        <template #title>
          <span class="text-base">{{ exp.role }}</span>
        </template>
        <template #subtitle>
          <span class="text-sm">{{ exp.company }} · {{ exp.period }}</span>
        </template>
        <template #content>
          <ul class="space-y-3">
            <li
              v-for="h in exp.highlights"
              :key="h.title"
              class="flex gap-3 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
            >
              <i class="pi pi-check mt-1 text-xs text-primary" aria-hidden="true" />
              <span>
                <strong class="text-surface-800 dark:text-surface-100">{{ h.title }}:</strong>
                {{ h.detail }}
              </span>
            </li>
          </ul>
        </template>
      </Card>
    </div>

    <h2 class="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-0">Skills</h2>
    <div class="mb-10 grid gap-4 sm:grid-cols-2">
      <Card v-for="group in skillGroups" :key="group.category">
        <template #title>
          <span class="text-base">{{ group.category }}</span>
        </template>
        <template #content>
          <div class="flex flex-wrap gap-2">
            <SkillBadge
              v-for="item in group.items"
              :key="item"
              :name="item"
              size="lg"
            />
          </div>
        </template>
      </Card>
    </div>

    <h2 class="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-0">Education</h2>
    <div class="mb-10 flex flex-col gap-3">
      <Card v-for="edu in education" :key="edu.title">
        <template #content>
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <span class="font-medium text-surface-900 dark:text-surface-0">{{ edu.title }}</span>
            <span class="text-sm text-surface-500 dark:text-surface-400">{{ edu.period }}</span>
          </div>
        </template>
      </Card>
    </div>

    <h2 class="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-0">Certificates</h2>
    <div class="flex flex-col gap-3">
      <Card v-for="cert in certificates" :key="cert.title">
        <template #content>
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <span class="font-medium text-surface-900 dark:text-surface-0">{{ cert.title }}</span>
              <span class="ml-2 text-sm text-surface-500 dark:text-surface-400">
                · {{ cert.issuer }}
              </span>
            </div>
            <span class="text-sm text-surface-500 dark:text-surface-400">{{ cert.date }}</span>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>
