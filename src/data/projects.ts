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
  summary: string
  showcase?: Showcase
}

export const years: Record<YearKey, YearMeta> = {
  1: {
    key: 1,
    label: '1년차',
    range: '2023.06 ~ 2024.05',
    summary:
      'TimescaleDB 하이퍼테이블·연속집계·압축 정책 도입으로 IIoT 시계열 데이터 조회 2~3배 향상·집계 쿼리 70% 이상 단축·저장 공간 80% 이상 절감, 제조 현장 실시간 관제 시스템 토대 구축.',
    showcase: {
      title: 'Dashboard Showcase',
      description:
        '1년차에 구축한 TimescaleDB + Grafana 기반 위에서 재직 기간 동안 누적·확장된 제조 현장 맞춤형 실시간 대시보드입니다. Grafana 기본 차트 외에 다양한 플러그인을 활용했으며, 특히 ECharts.js 를 활용해 커스텀 차트를 직접 구성하여 제조 현장 요구에 맞는 시각화를 제공했습니다.',
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
    summary:
      'Prometheus 진단·Slave DB 격리로 DB CPU 99%→25% 안정화, Grafana Alloy 알림 체계 구축으로 Edge 장비 다운 장애 사전 예방.',
  },
  3: {
    key: 3,
    label: '3년차',
    range: '2025.06 ~ 현재',
    summary:
      'Airflow + dbt 표준화 파이프라인 도입(운영 공수 80% 절감), 멀티테넌트 FastAPI + Vue 기반 사내 자체 관리 대시보드를 아키텍처 설계부터 배포까지 1인 풀스택 전담 — CBAM·FEMS 후속 서비스의 확장 기반 마련.',
  },
}

export interface CodeSnippet {
  title: string
  description?: string
  language: 'sql' | 'python' | 'yaml' | 'typescript' | 'java' | 'kotlin' | 'ini' | 'river'
  code: string
}

export interface CodeSection {
  slug: string
  title: string
  icon?: string
  headline?: string
  note?: string[]
  snippets: CodeSnippet[]
  media?: MediaItem[]
  /** true 면 media 를 코드 스니펫 위에 배치. 기본은 아래(false). */
  mediaAbove?: boolean
}

export interface TechRationale {
  question: string
  preface?: string
  reasons: string[]
  /** SkillBadge 로 좌측에 표시할 기술명. 비우면 question 텍스트가 헤더로 표시됩니다. */
  tech?: string
}

export interface ProjectBackground {
  /** 서술식 배경. 지정 시 context/problem/goal 라벨 대신 문단으로 렌더링. */
  narrative?: string[]
  context?: string | string[]
  problem?: string | string[]
  goal?: string | string[]
}

/**
 * 문제 해결 과정 서사 한 단위.
 * "마주친 한계 → 세운 가설 → 검증·해결" 흐름을 라벨 없이 서술식 문단(body)으로
 * 풀어 겪은 사람의 목소리를 살린다. result 는 정량 결과(선택).
 */
export interface TroubleshootStep {
  title: string
  body: string[]
  result?: string
}

export interface ProjectMetric {
  label: string
  beforeValue: number
  beforeDisplay: string
  afterValue: number
  afterDisplay: string
  improvement?: string
  /** Y 축 tick 단위. 기본은 시간(ms/s 자동 변환). 'GB' | '%' 등 직접 지정 가능. */
  unit?: string
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
  codeSections?: CodeSection[]
  techRationale?: TechRationale | TechRationale[]
  background?: ProjectBackground
  troubleshooting?: TroubleshootStep[]
  metrics?: ProjectMetric[]
  /** 0~100 사이 본인 기여도 (%) */
  contribution?: number
  /** 본인 기여 영역에 대한 짧은 설명 (게이지 옆에 표시) */
  contributionScope?: string
}

export const projects: Project[] = [
  {
    slug: 'iiot-monitoring',
    title: '스마트 팩토리 IIoT 데이터 통합 관제 시스템 구축',
    period: '2023.11 ~ 2024.04',
    year: 1,
    tags: ['TimescaleDB', 'Grafana', 'SQL'],
    contribution: 35,
    contributionScope: '데이터 시각화 · 통합 관제 대시보드 구축 담당',
    background: {
      narrative: [
        '사내 신규 프로젝트로 총 11개 공장에 IIoT 기반 ICT 인프라를 구축하게 됐고, 팀은 OPC UA 서버와 TimescaleDB · Grafana 오픈소스 스택으로 현장 PLC·센서 데이터의 수집부터 적재·시각화까지 파이프라인을 구성했습니다. 그 안에서 저는 적재된 시계열 데이터를 가공·조회하고, 11개 공장 각각의 요구에 맞는 통합 관제 대시보드를 책임졌습니다.',
        '처음에는 쿼리를 짜서 차트에 연결하면 되는 일로 보였지만, 데이터가 쌓이면서 문제가 하나씩 드러났습니다. 조회·집계 쿼리는 누적량에 비례해 점점 느려졌고, 일·월 통계가 매 조회 시점마다 즉시 계산되며 대시보드 응답 속도와 DB 부하를 동시에 끌어올렸습니다. 원본 시계열은 빠르게 차올라 스토리지 비용과 오래된 청크 조회 성능 저하, 수동 관리 공수까지 더해졌습니다. 결국 누적되는 환경에서도 일정한 응답 속도를 유지하면서 저장 효율과 운영 공수까지 함께 잡는 것이 제 목표가 됐습니다.',
      ],
    },
    troubleshooting: [
      {
        title: '누적될수록 느려지는 조회 — 시간 청크로 가른 하이퍼테이블',
        body: [
          '가장 먼저 부딪힌 건 조회 속도였습니다. 데이터가 쌓일수록 조건 검색·RAW 추출이 사실상 풀스캔에 가까워져 응답이 450ms를 넘겼고, 시간이 갈수록 더 느려질 게 분명했습니다.',
          '대시보드 질의가 대부분 "특정 시간 범위"를 본다는 점에 주목했습니다. measured_at 기준으로 데이터를 시간 청크로 쪼개 두면 조회할 때 최근 청크만 스캔해, 누적량과 무관하게 일정한 성능을 낼 수 있겠다고 판단해 TimescaleDB 하이퍼테이블로 전환했습니다. 실행 계획에서 범위 밖 청크가 실제로 프루닝되는 것을 확인하고 나서야 확신이 섰고, time_bucket·하이퍼 함수로 조회 패턴도 표준화했습니다.',
        ],
        result: '기본 시계열 조회 450ms → 150ms (약 3배 향상)',
      },
      {
        title: '매 조회마다 반복되던 집계 — 2단 연속집계와 카운터 리셋 보정',
        body: [
          '다음 벽은 집계였습니다. 일·월 통계가 조회 시점마다 수백만 건을 즉시 집계해 월별 집계가 1.8초까지 걸렸고, 여러 대시보드가 동시에 조회하면 DB 부하가 가중됐습니다.',
          '집계 결과를 미리 materialize 해 두고 증분만 갱신하면 조회 비용을 상수에 가깝게 만들 수 있겠다고 보고, 일 → 월 2단 캐스케이드 Continuous Aggregate 를 구성했습니다. 다만 최신 미집계 구간도 실시간으로 보여야 해서 materialized_only=false 로 실시간 데이터를 결합했습니다.',
          '이 과정에서 에너지 카운터가 장비 리셋 시 음수 델타를 만들어 집계가 튀는 문제를 만났습니다. last − first 에 greatest(…, 0) 를 씌우고 Toolkit 의 counter_agg + delta 로 리셋을 보정해 해결했고, 1시간 주기 자동 갱신 정책으로 운영 개입까지 없앴습니다.',
        ],
        result: '월별 통계/집계 1.8s → 540ms (약 70% 단축)',
      },
      {
        title: '빠르게 차오르는 스토리지 — sensor_id 단위 청크 압축',
        body: [
          '마지막은 저장 공간이었습니다. 원본 시계열이 빠르게 누적되며 디스크 비용과 오래된 청크 조회 성능이 동시에 나빠졌고, 오래된 데이터를 정리하는 수동 공수도 계속 늘었습니다.',
          '오래된 청크는 조회 빈도가 낮고 같은 sensor_id 안에서 값이 유사하게 반복된다는 점에 착안했습니다. compress_segmentby=\'sensor_id\' 로 컬럼 단위 압축을 걸면 압축률이 높게 나올 것이라 보고 7일 이전 청크를 자동 압축하는 정책을 세웠습니다. chunk_compression_stats 로 청크별 절감률을 직접 확인해 가설을 검증했고, 압축을 정책으로 자동화해 수동 관리 공수까지 제거했습니다.',
        ],
        result: '저장 공간 10GB → 2GB (약 80% 절감)',
      },
    ],
    outcome:
      'TimescaleDB 하이퍼테이블·연속집계·압축 정책 도입으로 IIoT 시계열 데이터 조회 2~3배 향상·집계 쿼리 70% 이상 단축·저장 공간 80% 이상 절감, 제조 현장 실시간 관제 시스템 토대 구축.',
    metrics: [
      {
        label: '기본 시계열 조건 조회 (RAW 추출)',
        beforeValue: 450,
        beforeDisplay: '450ms',
        afterValue: 150,
        afterDisplay: '150ms',
        improvement: '약 3× 향상',
      },
      {
        label: '월별 통계/집계 (분 단위 · 1년치)',
        beforeValue: 1800,
        beforeDisplay: '1.8s',
        afterValue: 540,
        afterDisplay: '540ms',
        improvement: '약 70% 단축',
      },
      {
        label: '스토리지 디스크 용량',
        beforeValue: 10,
        beforeDisplay: '10GB',
        afterValue: 2,
        afterDisplay: '2GB',
        improvement: '약 80% 절감',
        unit: 'GB',
      },
    ],
    roles: [
      'TimescaleDB 하이퍼테이블 아키텍처 및 하이퍼 함수 도입으로 시계열 데이터 조회 속도 평균 2~3배 향상',
      '연속집계 (Continuous Aggregates) 기능을 활용하여 수백만 건 규모의 통계/집계 쿼리 수행 시간 70% 이상 단축',
      '하이퍼테이블 청크 (Chunk) 단위 압축 (Compression) 정책 수립으로 데이터 저장 공간 80% 이상 절감',
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
    techRationale: [
      {
        question: 'TimescaleDB 를 선택한 이유',
        tech: 'TimescaleDB',
        preface:
          '기존 MySQL 등 일반 RDBMS 로는 시계열 데이터의 쿼리 성능이 적합하지 않아 팀에서 시계열 DB 도입을 결정했고, InfluxDB 와 TimescaleDB 두 후보를 검토한 끝에 TimescaleDB 를 채택했습니다.',
        reasons: [
          '팀이 NoSQL 에 익숙하지 않은 상황이었고, TimescaleDB 는 PostgreSQL 확장이기 때문에 기존 SQL·RDBMS 지식을 그대로 활용해 빠르게 도입할 수 있었습니다.',
          '마스터 데이터·메타정보 테이블과의 JOIN 이 자유로워, 기존 RDBMS 모델링·관계 쿼리 자산을 그대로 살릴 수 있었습니다.',
        ],
      },
      {
        question: 'Grafana 를 선택한 이유',
        tech: 'Grafana',
        preface:
          '센서 데이터 시각화·통합 관제 대시보드를 빠르게 구축해야 했고, 라이선스 비용·도메인 적합성·다중 업체 운영 요건을 종합적으로 고려해 Grafana 를 채택했습니다.',
        reasons: [
          '오픈소스로 라이선스 비용이 들지 않아 11개 업체에 확장 운영해도 비용 부담이 없습니다.',
          'IIoT · 인프라 모니터링 도메인에서 사실상 표준에 가까운 도구라 TimescaleDB(PostgreSQL) 데이터 소스 연동과 시계열 쿼리 최적화 패턴이 풍부합니다.',
          '업체별 폴더·대시보드 분리 + RBAC 기반 권한 관리로 다중 업체 환경에서도 안전하게 격리·공유 운영이 가능합니다.',
        ],
      },
    ],
    codeSections: [
      {
        slug: 'sql',
        title: 'TimescaleDB Query',
        icon: 'pi pi-database',
        headline:
          'TimescaleDB 의 하이퍼 함수 · counter_agg · 연속집계 · 청크 압축 정책을 조합해 시계열 데이터의 조회 성능 · 집계 자동화 · 저장 효율을 동시에 확보했습니다.',
        note: [
          'time_bucket + 하이퍼 함수 (avg/max/last/first) 조합으로 다중 메트릭을 단일 쿼리에서 일 단위 집계.',
          'TimescaleDB Toolkit 의 counter_agg + delta 로 카운터 메트릭의 리셋 케이스까지 자동 보정해 증분 산출.',
          '일/월 2단 Continuous Aggregate 캐스케이드 + 자동 갱신 정책으로 매 조회 시 즉시 연산하던 통계 쿼리 부담 제거.',
          '하이퍼테이블 청크 단위 압축(Compression) 정책으로 데이터 저장 공간 80% 이상 절감.',
        ],
        snippets: [
      {
        title: 'time_bucket + 하이퍼 함수 — 일별 종합 센서 통계 집계',
        description:
          'time_bucket 으로 일 단위 버킷팅한 뒤 avg/max/last/first 하이퍼 함수 조합으로 전압·전류·전력·에너지·역률을 단일 쿼리에서 집계. 에너지 사용량은 last − first 패턴으로 카운터 리셋도 안전하게 처리.',
        language: 'sql',
        code: `SELECT
  sensor_id,
  time_bucket('1 day', measured_at) AS bucket_day,

  -- 전압 평균
  avg(voltage_ln_avg_v) AS avg_voltage_ln_v,
  avg(voltage_ll_avg_v) AS avg_voltage_ll_v,

  -- 전류 평균/최대
  avg(current_total_a) AS avg_current_a,
  max(current_total_a) AS max_current_a,

  -- 전력 평균/최대
  avg(power_total_kw) AS avg_power_kw,
  max(power_total_kw) AS max_power_kw,

  -- 에너지 일간 사용량 (last − first, 카운터 리셋 시 0)
  greatest(
    last(energy_kwh, measured_at) - first(energy_kwh, measured_at),
    0
  ) AS delta_kwh,

  -- 역률 평균
  avg(power_factor) AS avg_power_factor,

  count(*) AS reading_count
FROM tbl_powermeter_reading
GROUP BY
  sensor_id,
  time_bucket('1 day', measured_at);`,
      },
      {
        title: 'counter_agg + delta — Toolkit 으로 카운터 리셋까지 안전하게 처리',
        description:
          'TimescaleDB Toolkit 의 counter_agg + delta 로 카운터 리셋까지 자동 보정해 일별 사용량을 산출.',
        language: 'sql',
        code: `SELECT
  sensor_id,
  time_bucket('1 day', measured_at) AS bucket_day,
  delta(counter_agg(measured_at, counter)) AS delta_count
FROM tbl_counter_reading
GROUP BY sensor_id, time_bucket('1 day', measured_at)
ORDER BY sensor_id, bucket_day;`,
      },
      {
        title: 'Continuous Aggregate — 일/월 2단 캐스케이드 자동 집계',
        description:
          '일 → 월 2단 캐스케이드 Cagg + 1시간 주기 자동 갱신 정책 (materialized_only=false 로 실시간 데이터 결합 조회).',
        language: 'sql',
        code: `-- 일별 에너지 사용량 Cagg
CREATE MATERIALIZED VIEW cagg_powermeter_reading_1d
WITH (timescaledb.continuous) AS
SELECT
  sensor_id,
  time_bucket('1 day', measured_at) AS bucket_day,
  greatest(
    last(energy_kwh, measured_at) - first(energy_kwh, measured_at),
    0
  ) AS delta_kwh
FROM tbl_powermeter_reading
GROUP BY sensor_id, time_bucket('1 day', measured_at)
WITH NO DATA;

CALL refresh_continuous_aggregate('cagg_powermeter_reading_1d', NULL, now()::date);

SELECT add_continuous_aggregate_policy('cagg_powermeter_reading_1d',
  start_offset      => INTERVAL '3 days',
  end_offset        => INTERVAL '1 day',
  schedule_interval => INTERVAL '1 hour');

ALTER MATERIALIZED VIEW cagg_powermeter_reading_1d
  SET (timescaledb.materialized_only = false);

-- 월별 Cagg (일 단위 Cagg 위에 캐스케이드)
CREATE MATERIALIZED VIEW cagg_powermeter_reading_1m
WITH (timescaledb.continuous) AS
SELECT
  sensor_id,
  time_bucket('1 month', bucket_day) AS bucket_month,
  sum(delta_kwh) AS delta_kwh
FROM cagg_powermeter_reading_1d
GROUP BY sensor_id, time_bucket('1 month', bucket_day)
WITH NO DATA;

SELECT add_continuous_aggregate_policy('cagg_powermeter_reading_1m',
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
    ],
  },
  {
    slug: 'infra-monitoring',
    title: '시스템 인프라 고도화 및 모니터링, 알림 구축',
    period: '2024.10 ~ 2025.05',
    year: 2,
    contribution: 50,
    contributionScope: 'DB 부하 진단 · Grafana 데이터 소스 격리 · Edge 모니터링/알람 체계 구축',
    tags: [
      'PostgreSQL',
      'TimescaleDB',
      'PgBouncer',
      'Streaming Replication',
      'Grafana',
      'Grafana Alloy',
      'Prometheus',
      'VictoriaMetrics',
    ],
    background: {
      narrative: [
        '2년차에는 업체 수 증가에 대비해 팀 차원의 인프라 확장과 OPC UA 서버 개선을 진행했고, 저는 그 안에서 DB 부하 진단과 Grafana 데이터 소스 격리, 현장 Edge 장비의 모니터링·알람 체계를 맡았습니다.',
        '그런데 증설한 신규 클라우드 서버가 예상보다 사양이 부족해 CPU 가 100% 까지 치솟았고, 서버를 통합하는 과정에서 메인 DB 의 CPU 과부하(최대 99%)가 실시간 관제 처리까지 위협했습니다. 동시에 Grafana 가 가져가는 읽기 트래픽이 누적되며 클라우드 아웃바운드 네트워크 계약 기준을 넘겨 비용이 새기 시작했고, 현장 Edge 서버는 메모리 부족으로 다운 장애가 반복되는데도 사후 대응밖에 할 수 없는 상태였습니다. 결국 DB 부하를 구조적으로 분리하고, 읽기 트래픽을 계약 기준 이내로 되돌리며, Edge 장애를 사전에 감지하는 것이 제 목표가 됐습니다.',
      ],
    },
    troubleshooting: [
      {
        title: 'CPU 99%까지 치솟은 메인 DB — 추측 대신 메트릭으로 진단',
        body: [
          '증설한 클라우드 서버의 사양이 부족해 DB 를 기존 서버로 통합했더니, 이번엔 메인 DB 의 CPU 가 피크에 99%까지 올랐습니다. 실시간 관제 처리가 밀리기 시작했고, 무작정 서버를 또 늘리는 건 비용만 키울 뿐이라 판단했습니다.',
          '원인을 추측하지 않으려고 Prometheus 로 메트릭을 먼저 쌓아 부하를 들여다봤습니다. 부하의 상당 부분이 Grafana 대시보드의 읽기 쿼리에서 온다는 걸 확인하고, 읽기와 쓰기를 물리적으로 나누면 Master 의 부담을 덜 수 있겠다고 보고 팀에 복제(Replication) 아키텍처 도입 근거를 데이터로 제시했습니다.',
          '후보였던 Logical Replication·pgpool·Patroni 중, TimescaleDB 하이퍼테이블·Cagg·확장 객체가 그대로 복제되고 운영 복잡도가 낮은 Streaming Replication 을 택했습니다.',
        ],
        result: '메인 DB CPU 99% → 25% (피크 기준 약 75%p ↓)',
      },
      {
        title: '계약 기준을 넘긴 아웃바운드 트래픽 — 읽기를 사내망으로',
        body: [
          'DB 를 통합한 뒤에도 비용 문제가 남았습니다. Grafana 대시보드가 클라우드 DB 에서 읽어가는 트래픽이 누적되며 클라우드 사업자의 아웃바운드 네트워크 계약 기준을 초과해, 매달 초과 요금이 붙기 시작했습니다.',
          '읽기 트래픽 자체를 사내망 안에서 끝내면 아웃바운드가 발생하지 않는다는 데 착안해, 사내 내부 서버에 Replica 를 두고 Grafana 의 데이터 소스를 Replica 로 옮겼습니다. 다수 Edge 서버의 커넥션은 PgBouncer 로 단일 엔드포인트에 풀링해, DB 위치가 바뀌어도 애플리케이션이 영향받지 않도록 추상화했습니다.',
        ],
        result: '아웃바운드 트래픽 30Mbps → 10Mbps (약 67% ↓ · 계약 기준 이내)',
      },
      {
        title: '반복되는 Edge 장비 다운 — 사후 대응에서 사전 감지로',
        body: [
          '현장 Edge 서버는 메모리 부족으로 다운되는 일이 반복됐는데, 늘 장애가 난 뒤에야 알 수 있어 사후 대응만 가능했습니다. 임계치를 넘기 전에 미리 잡아내는 체계가 필요했습니다.',
          'Edge 는 업체 내부망에 있어 외부에서 접근할 수 없으므로, Edge 측에서 push 로 메트릭을 보내는 구조를 택했습니다. Grafana Alloy 에이전트를 sh 스크립트로 다수 노드에 일괄 배포해 호스트 메트릭을 VictoriaMetrics 로 수집하고, 단순 Used 가 아니라 MemAvailable 기준으로 실제 사용 가능 메모리를 계산해 85% 초과 시 알람이 울리도록 했습니다. 캐시·버퍼까지 반영한 기준이라 오탐(false-positive)도 줄였습니다.',
          '덕분에 메모리가 고갈되기 전에 사전 조치할 수 있게 되어, 반복되던 장비 다운 장애를 원천적으로 예방했습니다.',
        ],
        result: '메모리 고갈 전 사전 알람 — 장비 다운 장애 사전 예방',
      },
    ],
    outcome:
      'Prometheus 진단·Slave DB 격리로 DB CPU 99%→25% 안정화·아웃바운드 트래픽 10Mbps 이하 유지, Grafana Alloy 알림 체계 구축으로 Edge 장비 다운 장애 사전 예방.',
    metrics: [
      {
        label: '메인 DB CPU 사용률 (피크 기준)',
        beforeValue: 99,
        beforeDisplay: '99%',
        afterValue: 25,
        afterDisplay: '25%',
        improvement: '약 75%p ↓',
        unit: '%',
      },
      {
        label: '클라우드 아웃바운드 트래픽 (피크 대역폭)',
        beforeValue: 30,
        beforeDisplay: '30Mbps',
        afterValue: 10,
        afterDisplay: '10Mbps',
        improvement: '약 67% ↓ · 계약 기준 이내',
        unit: 'Mbps',
      },
    ],
    roles: [
      '메인 DB CPU 과부하 (99%) 문제를 Prometheus 메트릭으로 진단하여 팀 내 복제 (Replication) 아키텍처 도입 근거 제시',
      '실시간 관제 대시보드 (Grafana) 의 데이터 소스를 Slave DB 로 이전 — Master DB CPU 사용량 안정화 (평균 25%) 및 네트워크 아웃바운드 트래픽 10Mbps 이하 유지로 초과 비용 개선',
      '현장 PC 에 Grafana Alloy 에이전트를 도입하여 호스트 메트릭 수집 및 임계치 알림 체계를 구축, 메모리 고갈 전 사전 조치로 장비 다운 원천 예방',
    ],
    media: [
      {
        label: '아키텍처',
        src: `${import.meta.env.BASE_URL}architectures/infra-monitoring.svg`,
        alt: '스트리밍 복제 기반 IoT 데이터 · 모니터링 아키텍처',
        description: [
          '클라우드의 TimescaleDB Primary 앞단에 PgBouncer 를 두어 다수의 Edge 서버에서 들어오는 커넥션을 풀링·재사용하도록 했고, 적재된 IoT 시계열 데이터를 사내 내부 서버의 Replica 로 Streaming Replication 합니다. Grafana 대시보드의 데이터 소스를 Replica 로 격리해 Master 의 부하와 네트워크 아웃바운드 트래픽을 분리했고, 현장 엣지 서버와 클라우드 DB 양쪽에 Grafana Alloy + Prometheus 를 띄워 호스트·DB 메트릭을 VictoriaMetrics 로 수집해 통합 모니터링·알림 체계를 구성했습니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'PgBouncer 를 도입한 이유',
        tech: 'PgBouncer',
        preface:
          '업체 수 증가에 대비해 신규 클라우드 DB 서버를 추가 도입했지만 예상보다 사양이 부족해 CPU 가 100% 까지 치솟는 문제가 발생했습니다. 이를 해소하기 위해 신규 서버를 기존 DB 서버로 이전·통합하는 작업을 진행했고, 이 통합 과정에서 read/write 가 여러 포트로 분산되어 있던 구조를 단일 엔드포인트로 정리하고 다수 Edge 서버의 동시 접속을 안전하게 처리하기 위해 PgBouncer 를 함께 도입했습니다.',
        reasons: [
          '여러 포트로 흩어져 있던 read/write 엔드포인트를 PgBouncer 단일 지점으로 통합 — 애플리케이션·Edge 서버가 DB 위치 변화나 포트 분기에 신경 쓰지 않도록 추상화했습니다.',
          '다수의 Edge 서버에서 동시에 발생하는 커넥션을 풀링·재사용하여 동시 접속 폭증으로 인한 max_connections 소진 문제를 해소했습니다.',
        ],
      },
      {
        question: 'Streaming Replication 을 선택한 이유',
        tech: 'Streaming Replication',
        preface:
          '클라우드 DB 통합 이후에도 Grafana 대시보드가 가져가는 읽기 트래픽이 누적되면서 클라우드 사업자의 아웃바운드 네트워크 계약 기준을 초과해 추가 비용이 발생하기 시작했습니다. 계약 기준 이내로 유지하면서 동시에 Master DB 의 CPU 부담까지 함께 분리하기 위해, 사내 내부 서버에 Replica 를 두고 읽기 트래픽을 사내망에서 처리하도록 전환하기로 팀 내에서 결정했고, 후보로 검토한 Logical Replication · pgpool · Patroni HA 중 Streaming Replication 을 채택했습니다.',
        reasons: [
          'PostgreSQL 네이티브 기능이라 별도 컴포넌트 도입 없이 빠르게 적용할 수 있었고, 운영 복잡도가 낮았습니다.',
          '물리 복제(byte-level) 방식이라 TimescaleDB 의 하이퍼테이블 · Continuous Aggregate · 확장 객체가 모두 그대로 복제되어 추가 호환성 검증이 필요 없었습니다.',
        ],
      },
      {
        question: 'Grafana Alloy 를 도입한 이유',
        tech: 'Grafana Alloy',
        preface:
          '업체 내부 네트워크에 위치한 Edge 서버의 메트릭을 중앙 모니터링 서버로 전송하려면 외부에서 접근할 수 없는 환경 특성상 Edge 측에서 push 방식으로 전송해야 했고, Prometheus agent 모드와 Grafana Alloy 두 후보를 검토한 끝에 Grafana Alloy 를 채택했습니다.',
        reasons: [
          '메트릭(Prometheus) · 로그(Promtail) · 트레이스(Tempo) 까지 통합한 올인원 에이전트라 향후 로그·트레이스 수집까지 확장할 때 단일 바이너리·단일 설정으로 운영 범위를 늘릴 수 있습니다.',
          'River 설정 언어로 환경 변수 기반 라벨링·라우팅·queue_config 같은 운영 옵션을 한 파일에서 선언적으로 관리할 수 있어 다수 Edge 노드에 sh 스크립트로 일괄 배포·운영하기에 적합했습니다.',
          'Grafana 생태계와 자연스럽게 결합되어 Edge 메트릭 수집 → VictoriaMetrics 저장 → Grafana 시각화·알람까지 동일 벤더 스택 안에서 일관되게 흐를 수 있습니다.',
        ],
      },
      {
        question: 'VictoriaMetrics 를 선택한 이유',
        tech: 'VictoriaMetrics',
        preface:
          '중앙 메트릭 저장소로 Prometheus 와 VictoriaMetrics 를 비교 검토했고, 저장 효율·메모리 점유·수평 확장성 측면에서 VictoriaMetrics 를 채택했습니다.',
        reasons: [
          'Prometheus 대비 디스크 공간을 최대 5~7배 적게 사용해 메트릭 장기 보관 비용을 구조적으로 절감할 수 있습니다.',
          '태생부터 "낮은 메모리 점유" 를 목표로 설계되어 다수 Edge 노드의 메트릭이 누적되는 환경에서도 단일 노드 자원으로 안정적 운영이 가능합니다.',
          '향후 메트릭 양이 늘면 cluster 모드로 scale-out 이 가능해 인프라 확장 경로가 단일 노드 한계에 막히지 않습니다.',
        ],
      },
    ],
    codeSections: [
      {
        slug: 'grafana',
        title: 'Grafana Dashboard · Alert',
        icon: 'pi pi-chart-line',
        headline:
          'Grafana Alerting 으로 unix exporter 메트릭과 연결된 PromQL 룰을 작성해 호스트 자원 임계치를 자동 감시·알림하도록 구성했습니다.',
        note: [
          'Alloy 가 박은 job="integrations/unix" 라벨로 필터링해 unix exporter 메트릭에만 룰이 적용되도록 분리 — 다른 exporter 와 충돌 없이 호스트 자원만 정밀하게 감시합니다.',
          'MemAvailable 기준 사용률 계산 — 단순 Used 가 아니라 Available 을 기준으로 캐시·버퍼까지 반영한 실제 사용 가능 메모리로 임계치를 판단해 false-positive 알람을 줄였습니다.',
        ],
        snippets: [
          {
            title: 'Grafana 알람 룰 — 메모리 사용률 85% 초과 감지 (PromQL)',
            description:
              '(1 − MemAvailable / MemTotal) × 100 으로 메모리 사용률을 계산하고, unix exporter job 라벨로 필터링해 85% 초과 시 알람 발송.',
            language: 'sql',
            code: `(
  1 - (
    node_memory_MemAvailable_bytes{origin_prometheus=~"", job=~"integrations/unix"}
    /
    node_memory_MemTotal_bytes{origin_prometheus=~"", job=~"integrations/unix"}
  )
) * 100`,
          },
        ],
        media: [
          {
            label: '알람',
            src: `${import.meta.env.BASE_URL}architectures/project2-01.png`,
            alt: 'Grafana Alert rule — Memory Used Over 85%',
            caption: 'Memory Used Over 85% — 메모리 사용률 임계치(>85%) 알람 룰 + 최근 발화 이력',
          },
          {
            label: '메트릭 대시보드',
            src: `${import.meta.env.BASE_URL}architectures/project2-02.png`,
            alt: 'Grafana Node Exporter Full Dashboard',
            caption: 'Node Exporter Full — 다중 노드 CPU · 메모리 · 디스크 · 네트워크 통합 대시보드',
          },
        ],
      },
    ],
  },
  {
    slug: 'pipeline-cbam',
    title: '데이터 파이프라인 구축 및 사내 자체 관리 대시보드 · 확장형 API 서버 개발',
    period: '2025.11 ~ 2026.06',
    year: 3,
    contribution: 100,
    contributionScope: '1인 풀스택 전담 (백엔드 · 프론트엔드 · 인프라 · 파이프라인)',
    tags: ['Airflow', 'dbt', 'FastAPI', 'Vue.js', 'Docker', 'Nginx', 'GitLab CI/CD'],
    background: {
      narrative: [
        '3년차에는 역할이 한 단계 넓어졌습니다. Grafana 기본 시각화만으로는 업체별·사용자별 맞춤 요구를 담기 어려워 자체 대시보드(서비스)가 필요했고, 운영 업체가 누적되며 흩어진 파이프라인을 중앙에서 관리할 체계도 절실했습니다. 여기에 사내 신규 비즈니스(CBAM·FEMS)까지 대응해야 해서, 저는 데이터 파이프라인부터 API 서버·프론트엔드·인프라까지 1인 풀스택으로 전담하게 됐습니다.',
        '문제는 두 갈래였습니다. 하나는 데이터 — 다중 업체·다중 센서 데이터가 표준 없이 파편화된 채 쌓여 표준화·이상치 정제·집계의 운영 공수가 빠르게 늘었고, 1년차에 쓰던 TimescaleDB Continuous Aggregate 만으로는 복잡한 비즈니스 단위 집계나 파이프라인 단위 테스트를 감당하기 어려웠습니다. 다른 하나는 속도 — 사내 자체 관리 대시보드와 후속 서비스의 공통 기반이 될 API 서버를 백엔드부터 프론트·인프라까지 혼자 빠르게 완성해야 했습니다. 그래서 표준화·집계를 자동화해 데이터 품질과 운영 공수를 함께 잡고, 생성형 AI 로 생산성을 끌어올려 확장 가능한 자체 서비스 기반을 1인 풀스택으로 완성하는 것을 목표로 삼았습니다.',
      ],
    },
    troubleshooting: [
      {
        title: 'Cagg의 한계에 부딪힌 집계 — 파이프라인을 Airflow로 중앙화',
        body: [
          '1년차부터 대부분의 집계를 TimescaleDB Continuous Aggregate(Cagg) 로 운영해왔는데, 업체 수가 늘자 한계가 분명해졌습니다. Cagg 는 단일 SELECT 표현 안에서만 동작해 복잡한 JOIN·전처리·조건 분기를 담기 어려웠고, refresh 주기 기반이라 정확한 시점 스케줄링이 안 됐으며, 업체별 DB 마다 Cagg 정의가 흩어져 관리 비용이 누적됐습니다.',
          '집계를 DB 기능에 묶어 두는 대신 코드로 끌어내 중앙에서 관리하기로 하고, Airflow 로 표준화·집계 파이프라인을 전환했습니다. DAG task 로 SQL·Python·외부 호출을 자유롭게 조합하고, cron 기반 정확한 실행 시점과 의존성·재시도·백필 같은 운영 컨트롤을 확보했으며, 업체별로 흩어졌던 집계 정의를 단일 Airflow 인스턴스로 모았습니다.',
        ],
        result: '파이프라인 운영 공수 약 80% 절감',
      },
      {
        title: '제각각인 센서 테이블 — dbt로 표준화하고 품질을 코드로 강제',
        body: [
          '업체·장비별로 쌓여 온 센서 테이블은 컬럼 명세도, 단위도, 이상값 처리 기준도 제각각이었습니다. 새 집계나 리포트를 하나 추가할 때마다 매번 수기 SQL 로 정제 로직을 다시 짜야 해서, 작업 한 건에 3시간씩 걸렸습니다.',
          '전처리·표준화 로직을 코드로 통일하기 위해 Airflow 와 자연스럽게 결합되는 dbt 를 도입했습니다. ref()·sources 로 모델 의존성과 lineage 를 자동 추적해 staging → intermediate → mart 의 일관된 흐름으로 표준화하고, tests·macros 로 이상값 검출·정제 규칙을 모든 모델에 일관 적용해 데이터 품질을 코드로 강제했습니다.',
        ],
        result: '신규 집계/리포트 추가 약 3시간 → 약 15분 (약 12배 가속)',
      },
      {
        title: '혼자 떠안은 풀스택 — 생성형 AI로 설계부터 배포까지',
        body: [
          '가장 큰 부담은 범위였습니다. 사내 자체 관리 대시보드와 CBAM·FEMS 후속 서비스의 공통 기반이 될 멀티테넌트 API 서버를, 백엔드부터 프론트엔드·인프라까지 혼자 빠르게 완성해야 했습니다.',
          '생성형 AI 를 단순 코드 자동완성을 넘어 설계·리팩터링·반복 작업까지 맡기는 방식으로 활용해 생산성을 끌어올렸습니다. 그 위에서 FastAPI + Vue 로 멀티테넌트 대시보드를 아키텍처 설계부터 Docker·Nginx·GitLab CI/CD 배포까지 1인 풀스택으로 완성했고, 후속 서비스가 그대로 올라탈 수 있는 확장 기반까지 마련했습니다.',
        ],
        result: 'FastAPI + Vue 멀티테넌트 서비스 1인 풀스택 완성 — CBAM·FEMS 확장 기반 마련',
      },
    ],
    outcome:
      'Airflow + dbt 표준화 파이프라인 도입으로 운영 공수 약 80% 절감·신규 집계 추가 작업 약 12배 가속, 멀티테넌트 FastAPI + Vue 기반 사내 자체 관리 대시보드를 아키텍처 설계부터 배포까지 1인 풀스택 전담 — CBAM·FEMS 후속 서비스 확장 기반 마련.',
    metrics: [
      {
        label: '데이터 파이프라인 운영 공수 (상대 비율)',
        beforeValue: 100,
        beforeDisplay: '100%',
        afterValue: 20,
        afterDisplay: '20%',
        improvement: '약 80% 절감',
        unit: '%',
      },
      {
        label: '신규 집계/리포트 추가 작업 시간',
        beforeValue: 3,
        beforeDisplay: '약 3시간',
        afterValue: 0.25,
        afterDisplay: '약 15분',
        improvement: '약 12× 빨라짐',
        unit: 'h',
      },
    ],
    roles: [
      'Apache Airflow 기반의 자동화 배치 파이프라인 및 집계 DAGs 를 구축하여 운영 공수 80% 절감',
      'dbt 를 도입하여 파편화된 제조 데이터 표준화 및 데이터 이상치 (Outlier) 정제 파이프라인 구현',
      '생성형 AI 를 활용한 생산성 극대화로 멀티테넌트 FastAPI + Vue 기반 사내 자체 관리 대시보드 (CBAM·FEMS 후속 확장 기반) 를 아키텍처 설계부터 배포까지 1인 풀스택 전담 개발',
    ],
    media: [
      {
        label: '아키텍처',
        src: `${import.meta.env.BASE_URL}architectures/iot_dataplatform_architecture.svg`,
        alt: '데이터 표준화 파이프라인 · 사내 자체 관리 대시보드 API 서버 아키텍처',
        description: [
          '1·2년차에 구축한 IoT 수집·복제 인프라 (Edge → 클라우드 TimescaleDB Primary → 사내 Replica) 위에, 3년차에는 사내 내부 서버에 Airflow + dbt 표준화 파이프라인과 FastAPI + Vue 기반 사내 자체 관리 대시보드를 신설하고, CBAM·FEMS 후속 서비스가 올라갈 공통 API 기반을 마련했습니다.',
          'Airflow 가 dbt 모델 (staging → intermediate → mart) 을 스케줄링해 Replica 원본을 표준화·집계된 마트 테이블로 가공하고, FastAPI 가 마트를 읽어 사내 자체 관리 대시보드 (Vue) 와 관리자 페이지에 REST API 로 제공합니다. 기존 Grafana 데이터 대시보드와 모니터링·알람 체계 (VictoriaMetrics) 는 1·2년차 구성을 그대로 이어 사용자·관리자에게 노출됩니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'Airflow 를 도입한 이유',
        tech: 'Airflow',
        preface:
          '1년차에 도입한 TimescaleDB Continuous Aggregate(Cagg) 로 대부분의 집계 처리를 운영해왔지만, 업체 수가 늘어나면서 한계가 드러났습니다. Cagg 는 단일 SELECT 표현 안에서만 가능해 복잡한 JOIN·전처리·조건 분기를 담기 어려웠고, refresh_interval 기반이라 "정확한 시점" 스케줄링이 불가능했으며, 업체별 DB 가 늘면서 각 DB 의 Cagg 정의·관리 비용이 누적되었습니다. 이를 해소하기 위해 표준화·집계 파이프라인을 Airflow 로 전환·중앙화하기로 결정했습니다.',
        reasons: [
          'DAG task 로 SQL · Python · 외부 호출까지 자유롭게 조합 가능 — Cagg 의 단일 SELECT 표현력 제약을 우회하고 복잡한 전처리·집계 로직을 코드로 구성할 수 있습니다.',
          'cron 기반 정확한 실행 시점 + 의존성·재시도·SLA·백필 같은 운영 컨트롤 확보 — 단순 "주기 refresh" 만 가능한 Cagg 대비 운영 시점 통제력이 강화됩니다.',
          '업체별 DB 마다 흩어져 있던 Cagg 정의를 단일 Airflow 인스턴스의 DAG 으로 중앙 집중 관리 — 업체가 늘어도 운영·변경 공수가 선형으로 증가하지 않습니다.',
        ],
      },
      {
        question: 'dbt 를 도입한 이유',
        tech: 'dbt',
        preface:
          '업체·장비별로 누적되어 온 센서 테이블이 파편화되어 컬럼 명세·단위·이상값 처리 기준이 제각각이라 관리 비용이 누적되었고, 이상값(Outlier) 정제 필요성도 함께 커졌습니다. 전처리·표준화 로직을 코드로 통일·중앙 관리할 수단이 필요했고, Airflow 와 자연스럽게 결합되는 dbt 를 채택해 데이터 표준화·중앙 관리 체계를 구축했습니다.',
        reasons: [
          'ref() · sources 로 모델 간 의존성·lineage 가 자동 추적되어 파편화된 테이블을 staging → intermediate → mart 의 일관된 흐름으로 표준화·중앙 관리할 수 있게 되었습니다.',
          'tests · macros 로 이상값 검출·전처리 규칙을 모든 모델에 일관 적용 — 수기 SQL 로 흩어져 있던 정제 로직을 제거하고 데이터 품질을 코드로 강제했습니다.',
          '기존 팀 SQL 자산을 그대로 살리면서 모델링·테스트·문서화·lineage 가 한 번에 결합 — 도입 학습 곡선이 낮고 운영 공수 절감 효과가 빠르게 가시화되었습니다.',
        ],
      },
      {
        question: 'FastAPI 를 선택한 이유',
        tech: 'FastAPI',
        preface:
          '사내 자체 관리 대시보드와 CBAM·FEMS 후속 서비스가 공통으로 올라갈 API 백엔드는 다룰 수 있는 후보인 Spring Boot 와 FastAPI 사이에서 검토했고, 1인 풀스택으로 빠른 출시·시계열 조회 성능·API 명세 동기화 비용을 종합적으로 고려해 FastAPI 를 채택했습니다.',
        reasons: [
          'pydantic 모델 기반으로 OpenAPI(Swagger) 스펙이 자동 생성·동기화되어 프론트엔드(Vue) 와의 API 계약을 별도 어노테이션·설정 없이 일치시킬 수 있습니다.',
          '타입 힌트 기반 자동 검증과 가벼운 의존성 주입으로 보일러플레이트가 적어, 1인 풀스택 환경에서 백엔드 개발 속도를 빠르게 확보할 수 있었습니다.',
          'async/await 비동기 처리로 시계열 데이터 조회 같은 I/O 바운드 워크로드에서 Spring Boot 동기 처리 대비 더 높은 동시성을 확보할 수 있을 것으로 판단했습니다.',
        ],
      },
      {
        question: 'Vue 를 선택한 이유',
        tech: 'Vue',
        preface:
          '프론트엔드는 React 와 Vue 두 후보를 검토했고, 생성형 AI 를 활용한 1인 개발 환경·생태계 표준화·UI 라이브러리 통합 비용을 종합적으로 고려해 Vue 를 채택했습니다.',
        reasons: [
          'React 대비 직관적인 SFC(Single File Component) 문법으로, 생성형 AI 가 만든 코드를 빠르게 검토·수정할 수 있어 초기 개발 생산성을 극대화했습니다.',
          '컴포넌트를 직접 설계·관리할 정도의 프론트엔드 경험이 부족했고 프로젝트 규모도 그 정도가 아니었기에, Vue Router · Pinia 같은 공식 표준 생태계가 정해져 있다는 점이 적합했습니다.',
          'PrimeVue 컴포넌트 라이브러리를 그대로 도입해 UI 구성 시간을 단축하고, 사내 자체 관리 대시보드의 비즈니스 로직에 더 많은 시간을 투입할 수 있었습니다.',
        ],
      },
    ],
    codeSections: [
      {
        slug: 'dbt',
        title: 'dbt Model · 표준화 + 정제',
        icon: 'pi pi-filter',
        headline:
          '파편화된 9개 벤더별 raw 테이블을 단일 표준 스키마로 통합(staging) → IQR + 룰 기반 정제(intermediate) → TimescaleDB hypertable 위에 incremental 적재(mart) 의 흐름으로 데이터 표준화·중앙 관리 체계를 코드화했습니다.',
        note: [
          'source_exists() 매크로로 환경별 raw 테이블 존재 여부를 런타임에 확인해 조건부 CTE 만 활성화 — 같은 dbt 코드가 업체별 DB 에 그대로 배포됩니다.',
          'staging 은 컬럼·단위 표준화, intermediate 는 dedup + range·IQR 정제, mart 는 집계 + hypertable 적재로 책임을 계층 분리했습니다.',
          'mart 는 incremental + delete+insert 전략 + post_hook 으로 TimescaleDB hypertable·인덱스 생성을 자동화 — 1년차 인프라와 매끄럽게 연결됩니다.',
        ],
        snippets: [
          {
            title: 'powermeter_union 매크로 — 9개 벤더 raw 테이블 → 단일 표준 스키마',
            description:
              'source_exists() 로 환경에 존재하는 테이블만 감지 → 컬럼·단위·구조 패턴별 src CTE 로 정규화 → UNION ALL.',
            language: 'sql',
            code: `{% macro powermeter_union() %}
{#
  9개 벤더별 powermeter raw 테이블을 단일 표준 스키마(v1/i1/kw/pf/kwh)로 통합합니다.
  - 컬럼 패턴: 약어형(v1/i1/kw) vs 서술형(phase_a_voltage_magnitude / total_active_power)
  - 단위 패턴: kW·kWh 그대로 vs W·Wh → kW·kWh 로 정규화
  - 구조 패턴: 단일 테이블 vs 채널·합계·누적 3-table JOIN
  - source_exists() 매크로로 환경(업체 DB)에 실제 존재하는 테이블만 조건부 UNION ALL
#}
{%- set has_short = source_exists('raw', 'tbl_powermeter_reading')      -%}
{%- set has_long  = source_exists('raw', 'tbl_powermeter_reading_long') -%}
{# ... 나머지 7개 변형도 동일 패턴으로 감지 #}

with empty as (
    {# 모든 src CTE 가 맞춰 정규화될 표준 컬럼 스키마 정의 #}
    select
        null::int4 as sensor_id,
        null::float8 as voltage_phase1_v, null::float8 as voltage_phase2_v, null::float8 as voltage_phase3_v,
        null::float8 as voltage_ln_avg_v,
        null::float8 as current_phase1_a, null::float8 as current_total_a,
        null::float8 as power_total_kw,
        null::float8 as power_factor,
        null::float8 as energy_kwh,
        null::timestamptz as measured_at
    where false
)

{# ── 약어형 + kW (변환 없음) ── #}
{% if has_short %}
, src_short as (
    select
        sensor_id,
        v1::float8 as voltage_phase1_v, v2::float8 as voltage_phase2_v, v3::float8 as voltage_phase3_v,
        vln::float8 as voltage_ln_avg_v,
        i1::float8 as current_phase1_a, it::float8 as current_total_a,
        kw::float8 as power_total_kw,
        pf::float8 as power_factor,
        kwh::float8 as energy_kwh,
        dt_insert as measured_at
    from {{ source('raw', 'tbl_powermeter_reading') }}
)
{% endif %}

{# ── 서술형 + W (단위 정규화 필요) ── #}
{% if has_long %}
, src_long as (
    select
        sensor_id,
        phase_a_voltage_magnitude::float8 as voltage_phase1_v,
        phase_b_voltage_magnitude::float8 as voltage_phase2_v,
        phase_c_voltage_magnitude::float8 as voltage_phase3_v,
        (phase_a_voltage_magnitude + phase_b_voltage_magnitude + phase_c_voltage_magnitude)::float8 / 3 as voltage_ln_avg_v,
        phase_a_current_magnitude::float8 as current_phase1_a,
        (phase_a_current_magnitude + phase_b_current_magnitude + phase_c_current_magnitude)::float8 as current_total_a,
        total_active_power::float8 / 1000 as power_total_kw,   -- W → kW
        total_power_factor::float8 as power_factor,
        active_energy::float8 / 1000 as energy_kwh,            -- Wh → kWh
        dt_insert as measured_at
    from {{ source('raw', 'tbl_powermeter_reading_long') }}
)
{% endif %}

{# ── 나머지 변형(3-table JOIN, 단일 테이블 내 컬럼 분기 등)도 같은 패턴으로 표준 스키마 정규화 ── #}

select * from empty
{% if has_short %} union all select * from src_short {% endif %}
{% if has_long %}  union all select * from src_long  {% endif %}
{# ... #}
{% endmacro %}`,
          },
          {
            title: 'mart_powermeter_15min — incremental mart + TimescaleDB hypertable post_hook',
            description:
              'delete+insert 증분 적재 + post_hook 으로 hypertable·인덱스 자동 생성. 1년차 TimescaleDB 인프라 위에서 mart 가 직접 hypertable 로 동작.',
            language: 'sql',
            code: `{{ config(
    materialized='incremental',
    unique_key=['sensor_id', 'bucket_15min'],
    incremental_strategy='delete+insert',
    on_schema_change='append_new_columns',
    post_hook=[
        "SELECT create_hypertable('{{ this }}', 'bucket_15min',
            chunk_time_interval => interval '1 day',
            if_not_exists => true, migrate_data => true)",
        "CREATE INDEX IF NOT EXISTS idx_{{ this.name }}_sensor_bucket
            ON {{ this }} (sensor_id, bucket_15min)"
    ]
) }}

with cleaned as (
    select * from {{ ref('int_powermeter_cleaned') }}
    {% if is_incremental() %}
    where measured_at >= (select max(bucket_15min) from {{ this }})
    {% endif %}
),

sensor_info as (
    select * from {{ source('raw', 'tbl_sensor_meta') }}
)

select
    c.sensor_id,
    max(s.name) as name,
    max(s.site) as site,
    {{ time_bucket('15 minutes', 'c.measured_at') }} as bucket_15min,

    avg(c.voltage_ln_avg_v) as avg_voltage_ln_v,
    avg(c.voltage_ll_avg_v) as avg_voltage_ll_v,

    avg(c.current_total_a) as avg_current_a,
    max(c.current_total_a) as max_current_a,

    avg(c.power_total_kw) as avg_power_kw,
    max(c.power_total_kw) as max_power_kw,

    -- 15분 구간 사용량 = last − first (카운터 리셋 시 0 으로 클램프)
    greatest(last(c.energy_kwh, c.measured_at) - first(c.energy_kwh, c.measured_at), 0) as delta_kwh,

    -- 피크전력 (15분 kWh × 4 = kW 환산)
    greatest(last(c.energy_kwh, c.measured_at) - first(c.energy_kwh, c.measured_at), 0) * 4 as demand_kw,

    avg(c.power_factor) as avg_power_factor,
    count(*) as reading_count
from cleaned c
left join sensor_info s on c.sensor_id = s.sensor_id
group by c.sensor_id, {{ time_bucket('15 minutes', 'c.measured_at') }}`,
          },
        ],
      },
      {
        slug: 'airflow',
        title: 'Airflow DAG · 멀티테넌트 동적 스케줄링',
        icon: 'pi pi-clock',
        headline:
          'Cosmos DbtTaskGroup 으로 dbt manifest 에서 모델을 task 로 자동 변환하고, 업체별 보유 센서 태그로 모델을 선택 실행하는 동적 멀티테넌트 DAG 패턴입니다.',
        note: [
          'load_clients() 로 마스터 DB 에서 업체 목록을 읽어 글로벌 네임스페이스에 DAG 를 동적 등록 — 신규 업체 추가 시 코드 변경 없이 DAG 자동 생성됩니다.',
          'tag-based select(`tag:powermeter` 등)로 업체가 보유한 센서 종류의 모델만 실행 — 불필요한 모델·테스트를 스킵해 실행 시간·DB 부하를 절감합니다.',
          '테넌트별 3분 간격 staggered cron + Airflow Pool 로 동시 fork·동시 쓰기 부하를 분산·캡 — 공유 DB 호스트의 WAL 버스트와 replica replay 충돌을 사전 차단합니다.',
        ],
        snippets: [
          {
            title: 'create_dag — 업체별 동적 DAG 생성 (Cosmos + tag-based select)',
            description:
              'DbtTaskGroup 으로 dbt 모델을 task 로 자동 변환, 업체 보유 센서 태그로 모델 선택 실행, staggered cron + Pool 로 부하 분산.',
            language: 'python',
            code: `"""dbt 모델을 업체별로 분리해 매일 새벽 staggered 스케줄로 실행하는 동적 멀티테넌트 DAG.

각 업체 DB 는 보유 센서 종류가 다르므로(예: powermeter+solar / flow+thd),
업체 메타에서 보유 센서 태그를 읽어 해당 dbt 모델만 선택 실행한다.
"""
import os
from datetime import datetime, timedelta
from pathlib import Path

from airflow import DAG
from airflow.operators.python import PythonOperator
from cosmos import (
    DbtTaskGroup, ExecutionConfig, ProfileConfig, ProjectConfig, RenderConfig,
)
from cosmos.constants import ExecutionMode, InvocationMode, LoadMode
from cosmos.profiles import PostgresUserPasswordProfileMapping

from utils.dag_utils import load_clients, check_connection

DBT_PROJECT_DIR = os.environ["DBT_PROJECT_PATH"]
DBT_MANIFEST_PATH = Path(DBT_PROJECT_DIR) / "target" / "manifest.json"
DBT_EXECUTABLE_PATH = f"{os.environ['DBT_VENV_PATH']}/bin/dbt"
# 공유 PG 호스트 동시 쓰기 캡 — Cosmos 가 모델 1개 = 태스크 1개로 만들기 때문에
# worker_concurrency × worker 수만큼 동시 쓰기가 폭증하는 것을 Pool 슬롯으로 제어.
DBT_WRITE_POOL = "dbt_db_write"

default_args = {
    "retries": 2,
    "retry_delay": timedelta(minutes=5),
    # 정상 dbt 태스크는 수 초~수 분 — 30분 초과 시 hang 으로 판단해 강제 종료 + retry.
    "execution_timeout": timedelta(minutes=30),
}


def _staggered_schedule(offset_min: int) -> str:
    """00:30 KST(15:30 UTC) 기준 offset_min 분만큼 밀린 cron 생성 (테넌트별 시작 분산)."""
    base_minute, base_hour = 30, 15
    total = base_minute + offset_min
    return f"{total % 60} {(base_hour + total // 60) % 24} * * *"


def create_dag(client_id: str, conn_id: str, sensors: list[str], offset_min: int = 0) -> DAG:
    """업체별 DAG 동적 생성. 보유 센서 태그 기반으로 모델 선택 실행."""
    dag = DAG(
        dag_id=f"dbt_sensor_{client_id}",
        schedule=_staggered_schedule(offset_min),
        start_date=datetime(2026, 1, 1),
        catchup=False,
        max_active_runs=1,
        tags=["dbt", "sensor", "analytics", client_id],
        default_args=default_args,
    )

    # 업체 보유 센서 태그 + common(공통 mart) 선택
    select_tags = [f"tag:{s}" for s in sensors] + ["tag:common"]

    with dag:
        verify_conn = PythonOperator(
            task_id="verify_connection",
            python_callable=check_connection,
            op_kwargs={"conn_id": conn_id},
        )

        dbt_group = DbtTaskGroup(
            group_id="dbt_sensor_analytics",
            project_config=ProjectConfig(
                dbt_project_path=Path(DBT_PROJECT_DIR),
                manifest_path=DBT_MANIFEST_PATH,
                dbt_vars={"sensor_types": sensors},
            ),
            profile_config=ProfileConfig(
                profile_name="sensor_analytics",
                target_name="prod",
                profile_mapping=PostgresUserPasswordProfileMapping(
                    conn_id=conn_id,
                    profile_args={"schema": "public", "threads": 4},
                ),
            ),
            render_config=RenderConfig(
                load_method=LoadMode.DBT_MANIFEST,
                select=select_tags,
                test_behavior="after_all",
                emit_datasets=False,
            ),
            execution_config=ExecutionConfig(
                execution_mode=ExecutionMode.LOCAL,
                dbt_executable_path=DBT_EXECUTABLE_PATH,
                invocation_mode=InvocationMode.SUBPROCESS,
            ),
            operator_args={
                "dbt_cmd_flags": ["--target-path", f"/tmp/dbt_target/{client_id}"],
                "pool": DBT_WRITE_POOL,  # 공유 호스트 동시 쓰기 캡
            },
        )

        verify_conn >> dbt_group

    return dag


# 마스터 DB 에서 업체 목록 동적 로딩 — 신규 추가 시 코드 변경 없이 DAG 생성.
# 정렬로 테넌트 순서 고정 → 신규 업체 추가에도 기존 스케줄 변동 최소화.
CLIENTS = sorted(load_clients(), key=lambda c: c["id"])

# 업체별 DAG 글로벌 등록 + 3분 간격 staggered → 동시 fork 부하 분산.
for i, client in enumerate(CLIENTS):
    globals()[f"dbt_sensor_{client['id']}"] = create_dag(
        client["id"], client["conn_id"], client["sensors"], offset_min=i * 3,
    )`,
          },
        ],
      },
      {
        slug: 'fastapi',
        title: 'FastAPI · Multi-Tenant API 서버 (CBAM·FEMS 확장 기반)',
        icon: 'pi pi-bolt',
        headline:
          '하나의 API 인스턴스가 X-Tenant-ID 헤더로 업체별 DB 엔진을 동적 라우팅하고, 1·2년차에 구축한 Read Replica 를 자동 fallback 하는 멀티테넌트 패턴 위에, 사내 자체 관리 대시보드와 CBAM·FEMS 후속 서비스가 공통으로 올라갈 도메인 라우터 기반을 마련했습니다.',
        note: [
          'TenantMiddleware → request.state → FastAPI Depends 체인으로 모든 라우터에 tenant_id·세션이 일관 주입 — 도메인 핸들러는 멀티테넌트 분기를 신경 쓰지 않습니다.',
          'EngineRegistry 가 테넌트별 read·write AsyncEngine 을 lazy 생성·캐시하고, Replica 연결 실패 시 자동으로 write 엔진으로 fallback + 1회만 Slack 알림 발송합니다.',
          'Casbin AsyncEnforcer 기반 require_permission(resource, action) 으로 라우터마다 한 줄 RBAC — reader → writer → admin 역할 계층이 자동 상속됩니다.',
        ],
        snippets: [
          {
            title: 'CBAM Items Router — pydantic + async SQLAlchemy + Casbin RBAC',
            description:
              'pydantic 모델로 입력 검증·OpenAPI 자동 생성, Depends 로 Replica/Primary 세션 자동 라우팅, Casbin require_permission 으로 라우터 한 줄 RBAC.',
            language: 'python',
            code: `"""CBAM 품목(Item) CRUD — pydantic + async SQLAlchemy 2.0 + Casbin RBAC."""

router = APIRouter()


# ── pydantic 스키마 (자동 OpenAPI 생성 + 입력 검증) ──

class ItemCreate(BaseModel):
    item_code: str | None = None
    cn_code: str | None = None              # EU CN(Combined Nomenclature) 코드
    name: str
    source_type: str = "internal"           # internal | external
    unit: str = "kg"
    unit_weight_kg: float | None = None
    is_cbam_target: bool = True
    routing_id: int | None = None
    group_id: int | None = None

    @model_validator(mode="after")
    def _validate_unit_weight(self):
        if self.unit == "pcs" and not self.unit_weight_kg:
            raise ValueError("단위가 'pcs' 인 경우 unit_weight_kg 는 필수입니다")
        if self.unit_weight_kg is not None and self.unit_weight_kg <= 0:
            raise ValueError("unit_weight_kg 는 0 보다 커야 합니다")
        return self


class ItemResponse(BaseModel):
    id: int
    item_code: str | None
    name: str
    source_type: str
    unit: str
    is_cbam_target: bool
    routing_id: int | None
    group_id: int | None
    is_active: bool
    model_config = {"from_attributes": True}


# ── 라우터 ──

@router.get("/items", response_model=list[ItemResponse])
async def list_items(
    is_cbam_target: bool | None = Query(None),
    group_id: int | None = Query(None),
    session: AsyncSession = Depends(get_read_session),                # ← Replica 라우팅
    _auth: AuthContext = Depends(require_permission("cbam", "read")), # ← Casbin RBAC
):
    stmt = (
        select(ItemModel)
        .where(ItemModel.is_active.is_(True))
        .order_by(ItemModel.id)
    )
    if is_cbam_target is not None:
        stmt = stmt.where(ItemModel.is_cbam_target == is_cbam_target)
    if group_id is not None:
        stmt = stmt.where(ItemModel.group_id == group_id)
    return (await session.execute(stmt)).scalars().all()


@router.post("/items", response_model=ItemResponse, status_code=201)
async def create_item(
    payload: ItemCreate,
    session: AsyncSession = Depends(get_db_session),                   # ← Primary 라우팅
    _auth: AuthContext = Depends(require_permission("cbam", "write")),
):
    # CBAM 대상 품목은 그룹·라우팅이 필수 — 배출량 산정 자동화의 사전 조건
    if payload.is_cbam_target and (payload.group_id is None or payload.routing_id is None):
        raise HTTPException(422, "CBAM 대상 품목은 품목군·기본 라우팅이 필수입니다")

    # 비대상 그룹에 대상 품목 매핑 차단 — 비대상 흡수 로직과의 정합성 보장
    if payload.group_id is not None:
        group = (await session.execute(
            select(ItemGroupModel).where(ItemGroupModel.id == payload.group_id)
        )).scalar_one_or_none()
        if group is None:
            raise HTTPException(400, f"품목군 #{payload.group_id} 을(를) 찾을 수 없습니다")
        if payload.is_cbam_target and group.cbam_yn == "N":
            raise HTTPException(409, f"품목군 #{group.id} 은 비대상 — CBAM 대상 품목 매핑 불가")

    item = ItemModel(**payload.model_dump())
    session.add(item)
    await session.flush()
    await session.refresh(item)
    return item   # pydantic from_attributes 로 ItemResponse 자동 직렬화`,
          },
        ],
        mediaAbove: true,
        media: [
          {
            label: 'FastAPI 아키텍처',
            src: `${import.meta.env.BASE_URL}architectures/fastapi-multitenant-architecture.svg`,
            alt: 'Multi-Tenant FastAPI Gateway · 확장형 API 서버 (CBAM·FEMS 기반) 아키텍처',
            caption: 'Multi-Tenant FastAPI Gateway — Middleware Chain → Depends 체인 → 테넌트별 read/write 엔진 자동 라우팅 (Replica fallback 포함)',
          },
        ],
      },
    ],
  },
]

export function getProjectsByYear(year: YearKey): Project[] {
  return projects.filter((p) => p.year === year)
}

export const yearList: YearMeta[] = [years[3], years[2], years[1]]
