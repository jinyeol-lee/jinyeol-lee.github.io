const KEYWORDS = [
  'TimescaleDB',
  'Continuous Aggregate',
  'Cagg',
  'Hypertable',
  '하이퍼테이블',
  '하이퍼 함수',
  '연속집계',
  'PostgreSQL',
  'PgBouncer',
  'Streaming Replication',
  'Replica',
  'Slave DB',
  'Grafana Alloy',
  'Grafana',
  'VictoriaMetrics',
  'Prometheus',
  'Airflow',
  'dbt',
  'FastAPI',
  'Vue',
  'CBAM',
  'OPC UA',
  '1인 풀스택',
  '풀스택',
  '사전 예방',
]

const METRIC_RE =
  /(\d+(?:\.\d+)?(?:~\d+(?:\.\d+)?)?\s*(?:%|배|개월|개|시간|분|일|GB|MB|KB|TB|건|회))/g

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const SORTED_KEYWORDS = [...KEYWORDS].sort((a, b) => b.length - a.length)

/**
 * 텍스트 안의 기술 키워드(진한 검정)와 정량 임팩트(primary 색)를 강조하는 HTML 문자열을 반환.
 * v-html 로 렌더링하기 전에 HTML 특수 문자는 escape 처리.
 */
export function highlight(text: string): string {
  let out = escapeHtml(text)
  for (const kw of SORTED_KEYWORDS) {
    const re = new RegExp(
      `(${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'g',
    )
    out = out.replace(
      re,
      '<span class="font-semibold text-surface-900 dark:text-surface-0">$1</span>',
    )
  }
  out = out.replace(
    METRIC_RE,
    '<span class="font-bold text-primary">$1</span>',
  )
  return out
}
