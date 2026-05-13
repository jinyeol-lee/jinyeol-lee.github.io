<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

const skills = ['Vue 3', 'TypeScript', 'Node.js', 'TailwindCSS', 'PrimeVue']
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-20 text-center">
    <Tag value="Welcome" severity="info" class="mb-6" />
    <h1
      class="text-4xl font-bold tracking-tight text-surface-900 sm:text-6xl dark:text-surface-0"
    >
      안녕하세요, <span class="text-primary">개발자 이진영</span>입니다.
    </h1>
    <p class="mx-auto mt-6 max-w-2xl text-lg text-surface-600 dark:text-surface-300">
      Vue · TypeScript 기반 프론트엔드와 풀스택 개발에 관심이 많습니다.
      이 사이트는 제가 만든 프로젝트들을 모아둔 공간입니다.
    </p>

    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <RouterLink v-slot="{ navigate }" to="/projects" custom>
        <Button label="프로젝트 보기" icon="pi pi-arrow-right" icon-pos="right" @click="navigate" />
      </RouterLink>
      <RouterLink v-slot="{ navigate }" to="/contact" custom>
        <Button
          label="연락하기"
          icon="pi pi-envelope"
          severity="secondary"
          variant="outlined"
          @click="navigate"
        />
      </RouterLink>
    </div>

    <div class="mt-12 flex flex-wrap justify-center gap-2">
      <Tag v-for="skill in skills" :key="skill" :value="skill" severity="secondary" />
    </div>
  </section>
</template>
