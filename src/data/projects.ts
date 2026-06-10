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
  codeSections?: CodeSection[]
  techRationale?: TechRationale | TechRationale[]
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
    period: '2024.08 ~ 2025.05',
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
  },
]

export function getProjectsByYear(year: YearKey): Project[] {
  return projects.filter((p) => p.year === year)
}

export const yearList: YearMeta[] = [years[3], years[2], years[1]]
