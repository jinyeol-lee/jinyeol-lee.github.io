<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Message from 'primevue/message'

const name = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

function onSubmit() {
  submitted.value = true
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <section class="mx-auto max-w-2xl px-4 py-16">
    <h1 class="mb-2 text-3xl font-bold text-surface-900 dark:text-surface-0">Contact</h1>
    <p class="mb-8 text-surface-600 dark:text-surface-300">
      궁금한 점이나 협업 제안이 있다면 편하게 연락 주세요.
    </p>

    <Message v-if="submitted" severity="success" class="mb-6">
      메시지가 전송되었습니다. 감사합니다!
    </Message>

    <Card>
      <template #content>
        <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
          <div class="flex flex-col gap-2">
            <label for="name" class="text-sm font-medium">이름</label>
            <InputText id="name" v-model="name" required />
          </div>
          <div class="flex flex-col gap-2">
            <label for="email" class="text-sm font-medium">이메일</label>
            <InputText id="email" v-model="email" type="email" required />
          </div>
          <div class="flex flex-col gap-2">
            <label for="message" class="text-sm font-medium">메시지</label>
            <Textarea id="message" v-model="message" rows="5" required />
          </div>
          <Button type="submit" label="보내기" icon="pi pi-send" />
        </form>
      </template>
    </Card>
  </section>
</template>
