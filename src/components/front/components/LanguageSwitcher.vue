<template>
  <div class="d-flex align-items-center cursor-pointer" @click="switchLanguage">
    <img src="@/assets/icons/translate.png" alt="translate" width="24" height="24" />
    <span class="ms-2">{{ $t('label.language') }}</span>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const switchLanguage = () => {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
  localStorage.setItem('lang', locale.value)
  document.dir = locale.value === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.lang = locale.value
  window.location.reload()
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
