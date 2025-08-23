<template>
  <q-page class="q-pa-lg">
    <h4>Área Personal</h4>

    <!-- Directamente en el template -->
    <p v-if="user?.user_metadata?.nombre">¡Hola {{ user.user_metadata.nombre }}!</p>
    <p v-else-if="user?.email">Bienvenido {{ user.email }}</p>
    <p v-else>¡Hola Usuario!</p>

    <div class="column items-start">
      <!-- Botón azul para HorarioReserva -->
      <q-btn
        color="blue"
        label="Reservar Horario"
        icon="schedule"
        @click="goToHorarioReserva"
        class="q-mb-md"
      />

      <!-- Botón de logout -->
      <q-btn
        color="negative"
        label="Cerrar sesión"
        icon="logout"
        @click="handleLogout"
        :loading="loading"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from 'src/stores/auth';

const { user, logout } = useAuth();
const router = useRouter();
const loading = ref(false);

async function goToHorarioReserva() {
  try {
    await router.push('/HorarioReserva');
  } catch (error) {
    console.error('Error navegando a HorarioReserva:', error);
  }
}

async function handleLogout() {
  loading.value = true;
  try {
    await logout();
    await router.push('/IndexPage');
  } catch (error: unknown) {
    console.error('Logout error:', error);
  } finally {
    loading.value = false;
  }
}
</script>
