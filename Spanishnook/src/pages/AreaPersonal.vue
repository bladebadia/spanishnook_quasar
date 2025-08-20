<template>
  <q-page class="q-pa-lg">
    <h4>Área Personal</h4>
    <p>Bienvenido {{ user?.email }}</p>

    <q-btn
      color="negative"
      label="Cerrar sesión"
      icon="logout"
      @click="handleLogout"
      :loading="loading"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from 'src/stores/auth';

//import { useQuasar } from 'quasar';

//const $q = useQuasar();
const { user, logout } = useAuth();
const router = useRouter();
const loading = ref(false);

async function handleLogout() {
  loading.value = true;
  try {
    await logout();
    //$q.notify({
    //type: 'positive',
    //message: 'Sesión cerrada correctamente',
    //});
    await router.push('/IndexPage');
  } catch (error: unknown) {
    //const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    //$q.notify({
    //type: 'negative',
    //message: `Error al cerrar sesión: ${errorMessage}`,
    //});
    console.error('Logout error:', error);
  } finally {
    loading.value = false;
  }
}
</script>
