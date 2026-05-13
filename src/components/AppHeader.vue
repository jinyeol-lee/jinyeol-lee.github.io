<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'

defineProps<{ isDark: boolean }>()
const emit = defineEmits<{ 'update:isDark': [value: boolean] }>()

const mobileOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-surface-200 bg-white/80 backdrop-blur dark:border-surface-800 dark:bg-surface-900/80"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <RouterLink
        to="/"
        class="text-lg font-semibold text-surface-900 dark:text-surface-0"
      >
        Portfolio
      </RouterLink>

      <nav class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          v-slot="{ isActive, navigate }"
          :to="link.to"
          custom
        >
          <Button
            :label="link.label"
            :severity="isActive ? 'primary' : 'secondary'"
            :variant="isActive ? undefined : 'text'"
            size="small"
            @click="navigate"
          />
        </RouterLink>
        <Button
          :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
          variant="text"
          rounded
          severity="secondary"
          aria-label="Toggle theme"
          @click="emit('update:isDark', !isDark)"
        />
      </nav>

      <div class="flex items-center gap-1 md:hidden">
        <Button
          :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
          variant="text"
          rounded
          severity="secondary"
          aria-label="Toggle theme"
          @click="emit('update:isDark', !isDark)"
        />
        <Button
          :icon="mobileOpen ? 'pi pi-times' : 'pi pi-bars'"
          variant="text"
          rounded
          severity="secondary"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        />
      </div>
    </div>

    <nav
      v-if="mobileOpen"
      class="border-t border-surface-200 px-4 py-2 md:hidden dark:border-surface-800"
    >
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="block rounded px-3 py-2 text-surface-700 hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
        active-class="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
        @click="mobileOpen = false"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>
