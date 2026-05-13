<script setup lang="ts">
import Card from 'primevue/card'
import Tag from 'primevue/tag'

interface Project {
  title: string
  period: string
  tags: string[]
  outcome: string
  roles: string[]
}

const projects: Project[] = [
  {
    title: 'CBAM / FEMS 멀티 테넌시 SaaS 플랫폼 개발',
    period: '2025.11 ~ 현재',
    tags: ['FastAPI', 'Vue', 'Airflow', 'dbt', 'TimescaleDB', 'JWT', 'Casbin', 'Docker'],
    outcome:
      'Airflow + dbt ELT 전환 및 멀티 테넌시 아키텍처 기반 SaaS 플랫폼 1인 구축',
    roles: [
      'FastAPI + Vue 풀스택으로 멀티 테넌시 아키텍처 설계 및 1인 개발',
      'TimescaleDB CAGG 에서 Airflow + dbt 로 전환 — 스케줄링 유연성 및 파이프라인 테스트 가능성 확보',
      '이기종 센서 테이블을 표준화·통합 모델링, 일/월별 데이터 마트 자동화 처리',
      'JWT + Casbin 기반 RBAC 구현으로 테넌트별 권한 격리',
      '전력 수요 예측을 위한 MLOps 파이프라인 설계 및 모델 학습·서빙 구성 중',
    ],
  },
  {
    title: '통합 관제 시스템 고도화 및 다채널 알림 자동화',
    period: '2024.07 ~ 2024.09',
    tags: ['Prometheus', 'Loki', 'Grafana', 'Spring Boot'],
    outcome: '장애 인지 시간 99% 단축, 수동 모니터링 운영 공수 99% 절감',
    roles: [
      'Prometheus + Loki 도입으로 시스템 메트릭 및 비정형 로그 통합 수집',
      'Spring Boot 기반 카카오 알림톡 외부 연동 API 서버 개발',
      'Grafana Alerting 으로 Slack · Email · 카카오톡 다채널 알림 발송 자동화',
    ],
  },
  {
    title: '스마트 팩토리 IoT 센서 데이터 통합 관제 시스템 구축 및 고도화',
    period: '2023.11 ~ 2025.04',
    tags: ['TimescaleDB', 'PostgreSQL', 'Streaming Replication', 'Grafana', 'Python'],
    outcome:
      '집계 쿼리 82% 단축, 데이터 처리 효율 5배 향상, CPU 점유율 80% 감소, 데이터 신뢰도 80% 확보',
    roles: [
      'TimescaleDB 하이퍼 함수 (time_bucket, first, last, histogram 등) 도입으로 시계열 집계 최적화 — 처리 효율 5배 향상',
      '연속 집계 (Continuous Aggregate) 및 Materialized View 적용으로 집계 쿼리 속도 82% 단축',
      '청크 단위 압축 정책 (Compression Policy) 설정으로 스토리지 효율화 및 오래된 데이터 조회 성능 유지',
      'Grafana 동적 변수·플러그인 활용, 11개 업체 맞춤형 실시간 대시보드 구축',
      'SQL 분석 기반 이상치 탐지 및 설치팀 피드백 루프로 데이터 품질 80% 이상 확보',
      'SQLite → PostgreSQL 마이그레이션 참여, 트랜잭션 안정성 및 DB 아키텍처 개선',
      'Streaming Replication 기반 읽기/쓰기 DB 분리 구축 참여 — CPU 점유율 80% 개선, 네트워크 트래픽 10Mbps 이하 최적화',
    ],
  },
]
</script>

<template>
  <section class="mx-auto max-w-5xl px-4 py-16">
    <h1 class="mb-2 text-3xl font-bold text-surface-900 dark:text-surface-0">Projects</h1>
    <p class="mb-10 text-surface-600 dark:text-surface-300">
      현업에서 주도적으로 설계·구현·운영한 프로젝트들을 소개합니다.
    </p>

    <div class="flex flex-col gap-6">
      <Card v-for="project in projects" :key="project.title">
        <template #title>
          <span class="text-lg">{{ project.title }}</span>
        </template>
        <template #subtitle>
          <span class="text-sm text-surface-500 dark:text-surface-400">
            {{ project.period }}
          </span>
        </template>
        <template #content>
          <div class="mb-4 flex flex-wrap gap-2">
            <Tag
              v-for="tag in project.tags"
              :key="tag"
              :value="tag"
              severity="secondary"
            />
          </div>

          <div
            class="mb-5 rounded-md border-l-4 border-primary bg-primary-50 px-4 py-3 dark:bg-primary-950/30"
          >
            <div class="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
              성과
            </div>
            <div class="text-sm leading-relaxed text-surface-800 dark:text-surface-100">
              {{ project.outcome }}
            </div>
          </div>

          <div>
            <div
              class="mb-2 text-xs font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400"
            >
              역할
            </div>
            <ul class="space-y-2 pl-1">
              <li
                v-for="role in project.roles"
                :key="role"
                class="flex gap-2 text-sm leading-relaxed text-surface-700 dark:text-surface-300"
              >
                <i class="pi pi-check mt-1 text-xs text-primary" aria-hidden="true" />
                <span>{{ role }}</span>
              </li>
            </ul>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>
