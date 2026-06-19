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
  { category: 'Frontend', items: ['Vue'] },
  { category: 'Database', items: ['PostgreSQL', 'TimescaleDB', 'SQL'] },
  { category: 'Data Engineering', items: ['Airflow', 'dbt'] },
  { category: 'Monitoring', items: ['Grafana', 'Prometheus', 'Grafana Alloy'] },
  { category: 'DevOps', items: ['Docker', 'Nginx', 'Linux', 'GitLab'] },
  { category: 'AI · Productivity', items: ['Claude Code'] },
]
</script>

<template>
  <section id="skills" class="mx-auto max-w-4xl scroll-mt-24">
    <h2 class="mb-6 text-2xl font-bold text-surface-900 dark:text-surface-0">Skills</h2>
    <div class="grid gap-4 sm:grid-cols-2">
      <Card v-for="group in skillGroups" :key="group.category">
        <template #title>
          <span class="text-base">{{ group.category }}</span>
        </template>
        <template #content>
          <div class="flex flex-wrap gap-2">
            <SkillBadge v-for="item in group.items" :key="item" :name="item" size="lg" />
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>
