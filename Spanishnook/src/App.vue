<template>
<component :is="layoutComponent">
  <router-view />
</component>
</template>

<script setup lang="ts">

import MainLayout from 'layouts/MainLayout.vue'
import EmptyLayout from 'layouts/EmptyLayout.vue'
import {useRoute} from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const layoutComponent = computed(() => route.meta.layout === 'empty' ? EmptyLayout : MainLayout)

</script>

