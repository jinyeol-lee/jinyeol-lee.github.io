<script setup lang="ts">
import Button from 'primevue/button'

defineProps<{ isDark: boolean }>()
const emit = defineEmits<{ 'update:isDark': [value: boolean] }>()

const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`
</script>

<template>
  <div
    class="fixed bottom-5 right-5 z-50 flex items-center gap-1 rounded-full border border-surface-200 bg-white/85 px-1.5 py-1.5 shadow-lg backdrop-blur dark:border-surface-700 dark:bg-surface-900/85"
  >
    <Button
      as="a"
      :href="resumeUrl"
      target="_blank"
      rel="noopener"
      label="Resume"
      icon="pi pi-file-pdf"
      severity="contrast"
      size="small"
      rounded
    />
    <Button
      :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
      variant="text"
      rounded
      severity="secondary"
      aria-label="Toggle theme"
      @click="emit('update:isDark', !isDark)"
    />
  </div>
</template>
