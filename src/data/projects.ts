export type YearKey = 1 | 2 | 3

export interface MediaItem {
  label: string
  src: string
  alt: string
  caption?: string
  fit?: 'cover' | 'contain'
  /** 그룹(같은 라벨이 연속된 첫 항목 기준) 라벨 아래에 렌더링되는 단락 설명 */
  description?: string[]
}

export interface Showcase {
  title: string
  description?: string
  items: MediaItem[]
}

export interface YearMeta {
  key: YearKey
  label: string
  range: string
  routeName: string
  summary: string
  showcase?: Showcase
}

export const years: Record<YearKey, YearMeta> = {
  1: {
    key: 1,
    label: '1년차',
    range: '2023.06 ~ 2024.05',
    routeName: 'projects-year-1',
    summary:
      'TimescaleDB 하이퍼테이블·연속집계 도입으로 IIoT 시계열 데이터 조회 5배·집계 쿼리 82% 개선, 제조 현장 실시간 관제 시스템 토대 구축.',
    showcase: {
      title: 'Dashboard Showcase',
      description:
        '1년차에 구축한 TimescaleDB + Grafana 기반 위에서 재직 기간 동안 누적·확장된 제조 현장 맞춤형 실시간 대시보드입니다.',
      items: Array.from({ length: 6 }, (_, i) => {
        const n = String(i + 1).padStart(2, '0')
        return {
          label: '대시보드',
          src: `${import.meta.env.BASE_URL}architectures/dashboard-${n}.png`,
          alt: `Grafana IIoT 실시간 모니터링 대시보드 ${n}`,
        }
      }),
    },
  },
  2: {
    key: 2,
    label: '2년차',
    range: '2024.06 ~ 2025.05',
    routeName: 'projects-year-2',
    summary:
      'Prometheus 진단·Slave DB 격리로 DB CPU 99%→25% 안정화, Grafana Alloy 알림 체계 구축으로 Edge 장비 다운 장애 사전 예방.',
  },
  3: {
    key: 3,
    label: '3년차',
    range: '2025.06 ~ 현재',
    routeName: 'projects-year-3',
    summary:
      'Airflow + dbt 표준화 파이프라인 도입(운영 공수 80% 절감), 신규 CBAM 서비스(FastAPI, Vue) 아키텍처 설계부터 배포까지 1인 풀스택 전담.',
  },
}

export interface CodeSnippet {
  title: string
  description?: string
  language: 'sql' | 'python' | 'yaml' | 'typescript' | 'java' | 'kotlin'
  code: string
}

export interface TechRationale {
  question: string
  preface?: string
  reasons: string[]
}

export interface Project {
  slug: string
  title: string
  period: string
  year: YearKey
  tags: string[]
  outcome: string
  roles: string[]
  media?: MediaItem[]
  snippets?: CodeSnippet[]
  snippetsHeadline?: string
  snippetsNote?: string[]
  techRationale?: TechRationale
}

export const projects: Project[] = [
  {
    slug: 'iiot-monitoring',
    title: '스마트 팩토리 IIoT 데이터 통합 관제 시스템 구축',
    period: '2023.11 ~ 2024.09',
    year: 1,
    tags: ['TimescaleDB', 'Grafana', 'SQL'],
    outcome: '시계열 데이터 조회 쿼리 속도 5배 향상 및 집계 쿼리 속도 82% 개선',
    roles: [
      'TimescaleDB 의 하이퍼테이블 및 하이퍼 함수를 사용하여 대용량 시계열 데이터 조회 성능 5배 최적화',
      '연속집계 (Cagg) 기능을 활용한 대용량 통계/집계 쿼리 수행 속도 82% 개선',
      '데이터 파티셔닝 및 압축 정책 설정을 통한 데이터 저장 및 관리 정책 수립',
      'Grafana 를 활용하여 제조 현장 맞춤형 IIoT 센서 데이터 실시간 대시보드 구축',
    ],
    media: [
      {
        label: '아키텍처',
        src: `${import.meta.env.BASE_URL}architectures/iiot-monitoring.svg`,
        alt: '스마트 팩토리 IIoT 데이터 통합 관제 시스템 아키텍처',
        description: [
          '팀 전체 시스템은 현장 서버에서 IoT 센서·PLC 장비 데이터를 수집해 TimescaleDB 에 적재하고, Grafana 로 시각화하여 사용자에게 실시간 대시보드를 제공하는 구조입니다.',
          '이 흐름 안에서 저는 적재된 데이터를 쿼리로 가공·조회하고 시각화하는 역할을 담당했고, 나아가 TimescaleDB 하이퍼 함수와 Continuous Aggregate(Cagg) 로 쿼리를 최적화하고 파티셔닝·압축 정책을 설정·관리하여 저장 효율과 조회 성능을 함께 책임졌습니다.',
        ],
      },
    ],
    techRationale: {
      question: 'TimescaleDB 를 선택한 이유',
      preface:
        '기존 MySQL 등 일반 RDBMS 로는 시계열 데이터의 쿼리 성능이 적합하지 않아 팀에서 시계열 DB 도입을 결정했고, InfluxDB 와 TimescaleDB 두 후보를 검토한 끝에 TimescaleDB 를 채택했습니다.',
      reasons: [
        '팀이 NoSQL 에 익숙하지 않은 상황이었고, TimescaleDB 는 PostgreSQL 확장이기 때문에 기존 SQL·RDBMS 지식을 그대로 활용해 빠르게 도입할 수 있었습니다.',
        '마스터 데이터·메타정보 테이블과의 JOIN 이 자유로워, 기존 RDBMS 모델링·관계 쿼리 자산을 그대로 살릴 수 있었습니다.',
      ],
    },
    snippetsHeadline:
      'LAG(결측 취약) → counter_agg + delta(이상치 취약) → last − first(최종 안정 패턴) 순으로 발전시켰습니다.',
    snippetsNote: [
      'LAG 방식은 직전 행이 결측이면 산정이 불가했습니다.',
      'TimescaleDB Toolkit 의 delta 는 결측 문제를 보완했지만, 누적 카운터 내부 상태에 의존해 스파이크성 이상치 영향이 커졌습니다.',
      '버킷 양 끝점만 사용하는 last − first 방식이 결측·이상치 모두에 가장 안전했고, 이를 Continuous Aggregate 로 캐스케이드하여 운영에 채택했습니다.',
    ],
    snippets: [
      {
        title: 'time_bucket + LAG — 누적 카운터에서 일별 사용량 추출 (Grafana 동적 쿼리)',
        description:
          '일 단위 last() 로 버킷 마지막 누적값을 뽑고 LAG 윈도우 함수로 전일 대비 차이를 계산 (Grafana 변수·시간 매크로 연결).',
        language: 'sql',
        code: `SELECT
  sensor_id,
  time,
  GREATEST(data - LAG(data) OVER (PARTITION BY sensor_id ORDER BY time), 0) AS delta
FROM (
  SELECT
    sensor_id,
    time_bucket('1d', dt_insert, 'Asia/Seoul') AS time,
    last(kwh, dt_insert) AS data
  FROM tbl_powermeter_reading
  WHERE sensor_id IN ($sensor_id)
    AND $__timeFilter(dt_insert)
  GROUP BY 1, 2
) s
ORDER BY 2;`,
      },
      {
        title: 'counter_agg + delta — Toolkit 으로 카운터 리셋까지 안전하게 처리',
        description:
          'TimescaleDB Toolkit 의 counter_agg + delta 로 카운터 리셋까지 자동 보정해 일별 사용량을 산출.',
        language: 'sql',
        code: `SELECT
  sensor_id,
  time_bucket('1d', dt_insert, 'Asia/Seoul') AS dt_insert,
  delta(counter_agg(dt_insert, counter)) AS ct
FROM tbl_sensor_reading_counter
WHERE sensor_id IN ($sensor_id)
  AND $__timeFilter(dt_insert)
GROUP BY 1, 2
ORDER BY 1, 2;`,
      },
      {
        title: 'Continuous Aggregate — 일/월 2단 캐스케이드 자동 집계',
        description:
          '일 → 월 2단 캐스케이드 Cagg + 1시간 주기 자동 갱신 정책 (materialized_only=false 로 실시간 데이터 결합 조회).',
        language: 'sql',
        code: `-- 일별 사용량 Cagg
CREATE MATERIALIZED VIEW cagg_power_reading_1d
WITH (timescaledb.continuous) AS
SELECT
  sensor_id,
  time_bucket('1d', dt_insert, 'Asia/Seoul') AS dt_insert,
  GREATEST(last(kwh, dt_insert) - first(kwh, dt_insert), 0) AS usage
FROM tbl_powermeter_reading
GROUP BY 1, 2
WITH NO DATA;

CALL refresh_continuous_aggregate('cagg_power_reading_1d', NULL, now()::date);

SELECT add_continuous_aggregate_policy('cagg_power_reading_1d',
  start_offset      => INTERVAL '3 days',
  end_offset        => INTERVAL '1 day',
  schedule_interval => INTERVAL '1 hour');

ALTER MATERIALIZED VIEW cagg_power_reading_1d
  SET (timescaledb.materialized_only = false);

-- 월별 Cagg (일 단위 Cagg 위에 캐스케이드)
CREATE MATERIALIZED VIEW cagg_power_reading_1m
WITH (timescaledb.continuous) AS
SELECT
  sensor_id,
  time_bucket('1 month', dt_insert, 'Asia/Seoul') AS dt_insert,
  SUM(usage) AS usage
FROM cagg_power_reading_1d
GROUP BY 1, 2
WITH NO DATA;

SELECT add_continuous_aggregate_policy('cagg_power_reading_1m',
  start_offset      => INTERVAL '3 months',
  end_offset        => INTERVAL '1 day',
  schedule_interval => INTERVAL '1 hour');`,
      },
      {
        title: 'Compression Policy — sensor_id 기준 청크 압축 및 효과 검증',
        description:
          'sensor_id 단위 segmentby 로 7일 이전 청크 자동 압축 + 청크별 크기·절감률 검증 쿼리.',
        language: 'sql',
        code: `-- 압축 정책 활성화 (sensor_id 단위 segmentby)
ALTER TABLE tbl_powermeter_reading SET (
  timescaledb.compress,
  timescaledb.compress_segmentby = 'sensor_id'
);
SELECT add_compression_policy('tbl_powermeter_reading', INTERVAL '7 days');

-- 기존 데이터 수동 압축 (정책 적용 전 청크 일괄 처리)
SELECT compress_chunk(c)
FROM show_chunks('tbl_powermeter_reading', older_than => INTERVAL '7 days') c;

-- 압축 전/후 크기 비교
SELECT
  chunk_name,
  compression_status,
  pg_size_pretty(before_compression_total_bytes) AS before,
  pg_size_pretty(after_compression_total_bytes)  AS after,
  ROUND(
    (1 - after_compression_total_bytes::numeric / before_compression_total_bytes) * 100, 1
  ) AS saved_pct
FROM chunk_compression_stats('tbl_powermeter_reading')
WHERE compression_status = 'Compressed';`,
      },
    ],
  },
  {
    slug: 'infra-monitoring',
    title: '시스템 인프라 고도화 및 모니터링, 알림 구축',
    period: '2024.08 ~ 2025.05',
    year: 2,
    tags: ['Grafana', 'Prometheus', 'PostgreSQL', 'Streaming Replication'],
    outcome:
      '메인 DB 서버의 CPU 부하 및 네트워크 트래픽 최적화로 인프라 비용 감소, 현장 Edge 장비 다운 장애 사전 예방',
    roles: [
      '메인 DB CPU 과부하 (99%) 문제를 Prometheus 메트릭으로 진단하여 팀 내 복제 (Replication) 아키텍처 도입 근거 제시',
      '실시간 관제 대시보드 (Grafana) 의 데이터 소스를 Slave DB 로 이전 — Master DB CPU 사용량 안정화 (평균 25%) 및 네트워크 아웃바운드 트래픽 초과 비용 개선',
      '현장 PC 에 Grafana Alloy 에이전트를 도입하여 호스트 메트릭 수집 및 임계치 알림 체계를 구축, 메모리 고갈 전 사전 조치로 장비 다운 원천 예방',
    ],
  },
  {
    slug: 'pipeline-cbam',
    title: '데이터 파이프라인 구축 및 CBAM 서비스 개발',
    period: '2025.11 ~ 2026.06',
    year: 3,
    tags: ['Airflow', 'dbt', 'FastAPI', 'Vue.js', 'Docker', 'Nginx', 'GitLab CI/CD'],
    outcome: '데이터 파이프라인 자동화로 운영 공수 80% 단축 및 CBAM 서비스 1인 풀스택 개발',
    roles: [
      'Apache Airflow 기반의 자동화 배치 파이프라인 및 집계 DAGs 를 구축하여 운영 공수 80% 절감',
      'dbt 를 도입하여 파편화된 제조 데이터 표준화 및 데이터 이상치 (Outlier) 정제 파이프라인 구현',
      '생성형 AI 를 활용한 생산성 극대화로 신규 CBAM 서비스 (FastAPI, Vue) 아키텍처 설계부터 배포까지 1인 풀스택 전담 개발',
    ],
  },
]

export function getProjectsByYear(year: YearKey): Project[] {
  return projects.filter((p) => p.year === year)
}

export const yearList: YearMeta[] = [years[3], years[2], years[1]]
