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
          'TimescaleDB 하이퍼테이블 및 연속집계 (Cagg) 도입으로 실시간 조회 속도 5배 향상, 집계 쿼리 속도 52% 개선 및 데이터 압축 정책 수립을 통한 스토리지 관리 효율성 확보',
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
          <p>
            스마트 팩토리 및 IIoT 도메인에서 대용량 시계열 데이터 최적화, 인프라 고도화,
            데이터 표준화 파이프라인 구축을 성공적으로 이끈 데이터 엔지니어 겸 백엔드 개발자입니다.
          </p>
          <p>
            지난 재직 기간 동안 약 50개 제조업체의 2,000여 개 센서에서 발생하는 대용량 시계열 데이터를
            안정적으로 수집·관제하는 시스템을 책임지며 비즈니스 가치를 극대화하는 데 기여했습니다.
          </p>
          <p>
            TimescaleDB 의 하이퍼테이블 및 연속집계 (Cagg) 를 도입하여 실시간 조회 속도를 5배 향상시켰고,
            집계 쿼리 성능을 52% 개선하여 데이터 저장 정책의 효율성을 확보했습니다.
            또한 Prometheus 메트릭 분석을 통해 DB CPU 부하를 99%에서 25%로 최적화했으며,
            대시보드 소스를 Slave DB 로 격리하고 Grafana Alloy 기반의 알림 체계를 구축하여
            현장 장비의 다운 장애를 사전에 원천 예방했습니다.
          </p>
          <p>
            나아가 Apache Airflow 와 dbt 를 도입하여 파편화된 제조 데이터를 표준화함으로써 운영 공수를
            80% 감축시켰고, 생성형 AI 를 활용한 높은 생산성으로 신규 비즈니스인 CBAM 서비스를
            아키텍처 설계부터 인프라 배포까지 1인 전담하여 성공적으로 개발했습니다.
          </p>
          <p>
            이러한 경험을 바탕으로 앞으로 대용량 데이터 파이프라인 인프라를 설계하고 데이터 모델링을
            최적화하는 전문 데이터 엔지니어로 깊게 성장하고자 합니다.
            데이터 기반의 철저한 병목 진단과 자원 최적화를 통해 시스템의 가용성을 높이고
            회사의 데이터 비즈니스 성장을 견인하겠습니다.
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
