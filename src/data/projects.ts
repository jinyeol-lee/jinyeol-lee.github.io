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
}

export interface ProjectBackground {
  context?: string | string[]
  problem?: string | string[]
  goal?: string | string[]
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
}

export const projects: Project[] = [
  {
    slug: 'iiot-monitoring',
    title: '스마트 팩토리 IIoT 데이터 통합 관제 시스템 구축',
    period: '2023.11 ~ 2024.04',
    year: 1,
    tags: ['TimescaleDB', 'Grafana', 'SQL'],
    background: {
      context: [
        '사내 신규 프로젝트로 총 11개 공장에 IIoT 기반 ICT 인프라를 구축하는 과제 진행',
        '팀에서 OPC UA 서버 개발, TimescaleDB · Grafana 오픈소스 스택을 도입해 현장 PLC·센서 데이터의 수집부터 적재·시각화까지 파이프라인을 구성',
        '본인 역할: 수집된 IIoT 시계열 데이터를 시각화해 사용자 요구에 맞는 통합 관제 대시보드를 11개 공장에 맞춤 제공',
      ],
      problem: [
        '데이터가 누적될수록 통합 관제 대시보드에서 사용하는 시계열 조회·집계 쿼리의 응답 속도가 점점 느려져 실시간 시각화에 지장',
        '적재된 시계열 데이터가 빠르게 누적되면서 스토리지 비용·오래된 데이터 청크 조회 성능 저하·수동 데이터 관리 공수가 동시에 부담으로 작용',
        '일·월 단위 통계 집계가 매 조회 시점에 즉시 처리되어 대시보드 응답 시간과 운영 공수 모두 가중',
      ],
      goal: [
        '시계열 조회·집계 쿼리 최적화로 누적 데이터 환경에서도 안정적 응답 속도 유지',
        '데이터 파티셔닝·압축 정책 자동화로 스토리지 효율과 누적 데이터 조회 성능 동시 확보',
        '일·월 단위 집계 처리 자동화로 운영 공수 절감 및 대시보드 응답성 확보',
      ],
    },
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
    codeSections: [
      {
        slug: 'sql',
        title: 'TimescaleDB Query',
        icon: 'pi pi-database',
        headline:
          'LAG(결측 취약) → counter_agg + delta(이상치 취약) → last − first(최종 안정 패턴) 순으로 발전시켰습니다.',
        note: [
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
    ],
  },
  {
    slug: 'infra-monitoring',
    title: '시스템 인프라 고도화 및 모니터링, 알림 구축',
    period: '2024.10 ~ 2025.05',
    year: 2,
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
      context: [
        '2년차 프로젝트에 대비해 팀 내에서 추가 인프라 구축 및 OPC UA 서버 개선 작업 진행',
        '업체 수 증가에 대비해 추가한 신규 클라우드 서버가 사양 부족으로 CPU 100% 한계에 도달',
        '현장 Edge 서버에서 메모리 부족 문제가 발생해 다운 장애가 반복되어 사후 대응만 가능한 상태',
      ],
      problem: [
        '메인 DB CPU 과부하(최대 99%)로 실시간 관제 처리 효율 저하 및 인프라 추가 비용 부담',
        '클라우드 DB → 사내망 읽기 트래픽이 누적되며 아웃바운드 네트워크 계약 기준 초과로 비용 가중',
        'Edge 장비 다운 장애에 대해 사후 대응만 가능하고 임계치 기반 사전 감지 체계가 부재',
      ],
      goal: [
        '메인 DB 의 CPU·읽기 부하를 구조적으로 분리해 실시간 관제 처리 안정화',
        '읽기 트래픽을 사내망 Replica 로 격리해 아웃바운드 네트워크 비용을 계약 기준 이내로 유지',
        '호스트·DB 메트릭 실시간 수집 + 임계치 기반 자동 알람으로 Edge 장비 다운 사전 예방',
      ],
    },
    outcome:
      '메인 DB 서버의 CPU 부하 및 네트워크 트래픽 최적화로 인프라 비용 감소, 현장 Edge 장비 다운 장애 사전 예방',
    roles: [
      '메인 DB CPU 과부하 (99%) 문제를 Prometheus 메트릭으로 진단하여 팀 내 복제 (Replication) 아키텍처 도입 근거 제시',
      '실시간 관제 대시보드 (Grafana) 의 데이터 소스를 Slave DB 로 이전 — Master DB CPU 사용량 안정화 (평균 25%) 및 네트워크 아웃바운드 트래픽 초과 비용 개선',
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
        preface:
          '업체 수 증가에 대비해 신규 클라우드 DB 서버를 추가 도입했지만 예상보다 사양이 부족해 CPU 가 100% 까지 치솟는 문제가 발생했습니다. 이를 해소하기 위해 신규 서버를 기존 DB 서버로 이전·통합하는 작업을 진행했고, 이 통합 과정에서 read/write 가 여러 포트로 분산되어 있던 구조를 단일 엔드포인트로 정리하고 다수 Edge 서버의 동시 접속을 안전하게 처리하기 위해 PgBouncer 를 함께 도입했습니다.',
        reasons: [
          '여러 포트로 흩어져 있던 read/write 엔드포인트를 PgBouncer 단일 지점으로 통합 — 애플리케이션·Edge 서버가 DB 위치 변화나 포트 분기에 신경 쓰지 않도록 추상화했습니다.',
          '다수의 Edge 서버에서 동시에 발생하는 커넥션을 풀링·재사용하여 동시 접속 폭증으로 인한 max_connections 소진 문제를 해소했습니다.',
        ],
      },
      {
        question: 'Streaming Replication 을 선택한 이유',
        preface:
          '클라우드 DB 통합 이후에도 Grafana 대시보드가 가져가는 읽기 트래픽이 누적되면서 클라우드 사업자의 아웃바운드 네트워크 계약 기준을 초과해 추가 비용이 발생하기 시작했습니다. 계약 기준 이내로 유지하면서 동시에 Master DB 의 CPU 부담까지 함께 분리하기 위해, 사내 내부 서버에 Replica 를 두고 읽기 트래픽을 사내망에서 처리하도록 전환하기로 팀 내에서 결정했고, 후보로 검토한 Logical Replication · pgpool · Patroni HA 중 Streaming Replication 을 채택했습니다.',
        reasons: [
          'PostgreSQL 네이티브 기능이라 별도 컴포넌트 도입 없이 빠르게 적용할 수 있었고, 운영 복잡도가 낮았습니다.',
          '물리 복제(byte-level) 방식이라 TimescaleDB 의 하이퍼테이블 · Continuous Aggregate · 확장 객체가 모두 그대로 복제되어 추가 호환성 검증이 필요 없었습니다.',
        ],
      },
      {
        question: '팀이 구축한 복제 설정 — 핵심 구성 3계층',
        preface:
          'Streaming Replication 시스템의 구성은 다음 3계층으로 요약됩니다. 저는 이 구조의 동작 원리와 운영 포인트를 파악한 위에서 Grafana 데이터 소스 전환 시점, 복제 지연 모니터링 기준 등을 함께 판단·결정했습니다.',
        reasons: [
          'Primary 송신 안전망 — max_wal_senders · max_replication_slots · wal_keep_size 64GB 로 Standby 가 일시 지연되더라도 WAL 이 회수되지 않도록 구성',
          'Standby 읽기 워크로드 차등 튜닝 — wal_buffers · max_wal_size 를 Primary 대비 2~4배 확장 + random_page_cost 상향(Sequential Scan 선호)',
          'SSL/GSS 우선 보안 연결 — sslmode · gssencmode prefer + application_name 으로 다중 Standby 식별·모니터링',
        ],
      },
    ],
    codeSections: [
      {
        slug: 'alloy',
        title: 'Grafana Alloy Config',
        icon: 'pi pi-sliders-h',
        headline:
          'DB 서버 · Edge 서버에 sh 스크립트로 Grafana Alloy 단일 에이전트를 설치·배포하고, 노드 종류에 맞는 exporter 조합으로 호스트·Alloy 자체 메트릭을 push 방식으로 중앙 VictoriaMetrics 에 통합 전송하도록 구성했습니다.',
        note: [
          'ENV · VENDOR · REGION · ROLE 환경 변수를 external_labels 로 받아 PromQL 쿼리에서 환경 · 벤더 · 지역 · 서비스 역할 단위로 메트릭을 구분·필터링할 수 있도록 라벨링 체계를 통일했습니다.',
          'INSTANCE 환경 변수로 모든 스크레이프의 instance 라벨을 통일(discovery.relabel)했습니다 — exporter 가 기본으로 박는 가변 식별자 대신 노드 단위로 일관된 식별이 보장됩니다.',
          'Alloy 내장 unix exporter(node_exporter 호환)로 cpu · memory · filesystem · netdev 등 기본 collector 가 자동 활성화되고, enable_collectors 로 systemd · processes 등 추가 collector 도 손쉽게 확장 가능합니다.',
          'remote_write queue_config(max_shards 200, capacity 2500, batch_send_deadline 5s)로 일시 네트워크 단절 시에도 메트릭 손실 없이 중앙 VictoriaMetrics 로 안전 전송되도록 구성했습니다.',
        ],
        snippets: [
          {
            title: 'Grafana Alloy — Edge 노드 호스트 메트릭 수집 설정',
            description:
              '단일 Alloy 에이전트가 unix exporter(호스트) + Alloy 자체 메트릭을 수집해 중앙 VictoriaMetrics 로 push. 환경 라벨링·노드 식별·재시도 정책까지 한 파일에서 정의.',
            language: 'river',
            code: `logging {
  level  = "info"
  format = "logfmt"
}

// 중앙 저장소(VictoriaMetrics) remote_write
prometheus.remote_write "central" {
  external_labels = {
    env    = sys.env("ENV"),
    vendor = sys.env("VENDOR"),
    region = sys.env("REGION"),
    role   = sys.env("ROLE"),
  }

  endpoint {
    url = sys.env("REMOTE_WRITE_URL")

    basic_auth {
      username = sys.env("REMOTE_WRITE_USER")
      password = sys.env("REMOTE_WRITE_PASSWORD")
    }

    queue_config {
      max_samples_per_send = 1000
      max_shards           = 200
      capacity             = 2500
      batch_send_deadline  = "5s"
    }
  }
}

// 호스트 시스템 메트릭 (내장 unix exporter)
prometheus.exporter.unix "host" {
  // enable_collectors = ["systemd", "processes"]  // 필요 시 추가 활성화
}

// exporter 가 박는 기본 instance 라벨을 노드 식별자로 치환
discovery.relabel "host_targets" {
  targets = prometheus.exporter.unix.host.targets
  rule {
    target_label = "instance"
    replacement  = sys.env("INSTANCE")
  }
}

// Alloy 컨벤션: 수집 메트릭은 job="integrations/unix" 로 들어감
// (exporter 가 target 에 미리 박는 라벨이라 job_name 으로 덮을 수 없음)
prometheus.scrape "host_metrics" {
  targets         = discovery.relabel.host_targets.output
  forward_to      = [prometheus.remote_write.central.receiver]
  scrape_interval = "15s"
}

// Alloy 자체 메트릭
prometheus.scrape "alloy_self" {
  targets = [{
    __address__ = "127.0.0.1:12345",
    job         = "alloy",
    instance    = sys.env("INSTANCE"),
  }]
  forward_to      = [prometheus.remote_write.central.receiver]
  scrape_interval = "30s"
}`,
          },
        ],
      },
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
    title: '데이터 파이프라인 구축 및 CBAM 서비스 개발',
    period: '2025.11 ~ 2026.06',
    year: 3,
    tags: ['Airflow', 'dbt', 'FastAPI', 'Vue.js', 'Docker', 'Nginx', 'GitLab CI/CD'],
    background: {
      context: [
        'Grafana 기본 시각화만으로는 업체별·사용자별 맞춤 요구사항을 충족하기 어려워 자체 대시보드(서비스) 개발 필요성 증가',
        '데이터 수집·모니터링 운영 업체 수가 누적되며 분산된 파이프라인의 중앙 관리·자동화 체계 필요성 증가',
        '사내 신규 비즈니스인 CBAM(탄소국경조정제도) 대응 서비스의 빠른 출시 요구 발생',
      ],
      problem: [
        '다중 업체·다중 센서 데이터가 파편화된 채 누적되며 표준화·이상치 정제·집계 처리의 운영 공수가 빠르게 증가',
        '기존 TimescaleDB Continuous Aggregate 만으로는 다양한 비즈니스 단위 집계와 파이프라인 단위 테스트 가능성을 확보하기 어려움',
        '신규 CBAM 서비스를 백엔드·프론트엔드·인프라까지 1인이 빠르게 완성해야 하는 개발 부담',
      ],
      goal: [
        '표준화·이상치 정제·집계 자동화로 파이프라인 운영 공수 절감 및 데이터 품질 확보',
        'Apache Airflow + dbt 도입으로 스케줄링 유연성과 파이프라인 단위 테스트 가능성 확보',
        '생성형 AI 를 활용한 생산성 극대화로 FastAPI + Vue 기반 CBAM 서비스를 아키텍처 설계부터 배포까지 1인 풀스택으로 완성',
      ],
    },
    outcome: '데이터 파이프라인 자동화로 운영 공수 80% 단축 및 CBAM 서비스 1인 풀스택 개발',
    roles: [
      'Apache Airflow 기반의 자동화 배치 파이프라인 및 집계 DAGs 를 구축하여 운영 공수 80% 절감',
      'dbt 를 도입하여 파편화된 제조 데이터 표준화 및 데이터 이상치 (Outlier) 정제 파이프라인 구현',
      '생성형 AI 를 활용한 생산성 극대화로 신규 CBAM 서비스 (FastAPI, Vue) 아키텍처 설계부터 배포까지 1인 풀스택 전담 개발',
    ],
    media: [
      {
        label: '아키텍처',
        src: `${import.meta.env.BASE_URL}architectures/iot_dataplatform_architecture.svg`,
        alt: '데이터 표준화 파이프라인 · CBAM API 서비스 아키텍처',
        description: [
          '1·2년차에 구축한 IoT 수집·복제 인프라 (Edge → 클라우드 TimescaleDB Primary → 사내 Replica) 위에, 3년차에는 사내 내부 서버에 Airflow + dbt 표준화 파이프라인과 FastAPI + Vue 기반 CBAM 서비스를 신설했습니다.',
          'Airflow 가 dbt 모델 (staging → intermediate → mart) 을 스케줄링해 Replica 원본을 표준화·집계된 마트 테이블로 가공하고, FastAPI 가 마트를 읽어 사용자용 CBAM 앱 (Vue) 과 관리자 페이지에 REST API 로 제공합니다. 기존 Grafana 데이터 대시보드와 모니터링·알람 체계 (VictoriaMetrics) 는 1·2년차 구성을 그대로 이어 사용자·관리자에게 노출됩니다.',
        ],
      },
    ],
    techRationale: [
      {
        question: 'Airflow 를 도입한 이유',
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
        preface:
          '업체·장비별로 누적되어 온 센서 테이블이 파편화되어 컬럼 명세·단위·이상값 처리 기준이 제각각이라 관리 비용이 누적되었고, 이상값(Outlier) 정제 필요성도 함께 커졌습니다. 전처리·표준화 로직을 코드로 통일·중앙 관리할 수단이 필요했고, Airflow 와 자연스럽게 결합되는 dbt 를 채택해 데이터 표준화·중앙 관리 체계를 구축했습니다.',
        reasons: [
          'ref() · sources 로 모델 간 의존성·lineage 가 자동 추적되어 파편화된 테이블을 staging → intermediate → mart 의 일관된 흐름으로 표준화·중앙 관리할 수 있게 되었습니다.',
          'tests · macros 로 이상값 검출·전처리 규칙을 모든 모델에 일관 적용 — 수기 SQL 로 흩어져 있던 정제 로직을 제거하고 데이터 품질을 코드로 강제했습니다.',
          '기존 팀 SQL 자산을 그대로 살리면서 모델링·테스트·문서화·lineage 가 한 번에 결합 — 도입 학습 곡선이 낮고 운영 공수 절감 효과가 빠르게 가시화되었습니다.',
        ],
      },
      {
        question: 'CBAM 스택을 FastAPI + Vue 로 선택한 이유',
        preface:
          '신규 CBAM 서비스를 1인 풀스택으로 설계부터 배포까지 책임져야 했고, 사용 가능한 백엔드 스택 중 Spring Boot 와 FastAPI 를 비교 검토한 끝에 FastAPI + Vue 조합을 채택했습니다.',
        reasons: [
          'pydantic 모델 기반으로 OpenAPI 스펙이 자동 생성되어 프론트(Vue) 와의 API 계약 동기화 비용이 0 에 가깝게 줄어듭니다 — Spring Boot 대비 별도 어노테이션·설정 없이 자연스럽게 확보됩니다.',
          'async/await 기반 비동기 처리로 대용량 시계열 데이터 조회·집계 응답에 유리할 것으로 판단 — 동시 요청에 대한 처리량 측면에서 Spring Boot 동기 처리 대비 우위가 기대됩니다.',
          '생성형 AI(Claude) 활용으로 1인 풀스택 개발 생산성이 충분히 확보된다고 판단 — 백엔드·프론트엔드 양쪽을 단일 개발자가 일정 내에 완주할 수 있는 현실성이 결정 요인이었습니다.',
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
        title: 'FastAPI · Multi-Tenant CBAM API',
        icon: 'pi pi-bolt',
        headline:
          '하나의 API 인스턴스가 X-Tenant-ID 헤더로 업체별 DB 엔진을 동적 라우팅하고, 1·2년차에 구축한 Read Replica 를 자동 fallback 하는 멀티테넌트 패턴 위에 CBAM 도메인 라우터를 얹었습니다.',
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
            src: `${import.meta.env.BASE_URL}architectures/fastapi-cbam-architecture.svg`,
            alt: 'Multi-Tenant FastAPI Gateway · CBAM API 아키텍처',
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
