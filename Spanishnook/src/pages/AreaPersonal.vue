<template>
  <q-page class="q-pa-lg">
    <h4>Área Personal</h4>

    <!-- Saludo personalizado -->
    <p v-if="user?.user_metadata?.nombre">¡Hola {{ user.user_metadata.nombre }}!</p>
    <p v-else-if="user?.email">Bienvenido {{ user.email }}</p>
    <p v-else>¡Hola Usuario!</p>

    <!-- Reservas Confirmadas -->
    <div class="q-mt-lg">
      <h5>Mis Reservas</h5>

      <q-list bordered v-if="reservasConfirmadas.length > 0">
        <q-item v-for="reserva in reservasConfirmadas" :key="reserva.id">
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ formatFecha(reserva.fecha) }} a las {{ reserva.hora }}
            </q-item-label>
            <q-item-label caption> Estado: {{ reserva.estado }} </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              color="negative"
              icon="delete"
              @click="cancelarReserva(reserva.id)"
              size="sm"
              label="Cancelar"
            />
          </q-item-section>
        </q-item>
      </q-list>

      <p v-else class="text-grey">No tienes reservas confirmadas.</p>
    </div>

    <!-- Botones de acción -->
    <div class="column items-start q-gutter-y-md q-mt-lg">
      <q-btn color="primary" label="Hacer Nueva Reserva" icon="add" to="/ClasesIndividuales" />

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
import { ref, onMounted } from 'vue';
import { useAuth } from 'src/stores/auth';
import { supabase } from 'src/supabaseClient';
import { useRouter } from 'vue-router';

interface Reserva {
  id: string;
  user_id: string;
  fecha: string;
  hora: string;
  estado: string;
  created_at?: string;
}

const { user, logout } = useAuth();
const router = useRouter();
const loading = ref(false);
const reservasConfirmadas = ref<Reserva[]>([]);

// Formatear fecha
const formatFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Cargar reservas confirmadas del usuario
const cargarReservasConfirmadas = async () => {
  if (!user.value?.id) {
    reservasConfirmadas.value = [];
    return;
  }

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select('*')
      .eq('user_id', user.value.id)
      .eq('estado', 'confirmada')
      .gte('fecha', new Date().toISOString().split('T')[0])
      .order('fecha', { ascending: true })
      .order('hora', { ascending: true });

    if (error) {
      console.error('Error cargando reservas confirmadas:', error);
      return;
    }

    reservasConfirmadas.value = data || [];
    console.log('Reservas confirmadas cargadas:', reservasConfirmadas.value);
  } catch (error) {
    console.error('Error cargando reservas:', error);
    reservasConfirmadas.value = [];
  }
};

// Cancelar reserva
const cancelarReserva = async (reservaId: string) => {
  if (!confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
    return;
  }

  try {
    const { error } = await supabase
      .from('reservas')
      .delete()
      .eq('id', reservaId)
      .eq('user_id', user.value?.id);

    if (error) throw error;

    // Actualizar lista localmente
    reservasConfirmadas.value = reservasConfirmadas.value.filter(
      (reserva) => reserva.id !== reservaId,
    );

    alert('✅ Reserva cancelada correctamente');
  } catch (error) {
    console.error('Error cancelando reserva:', error);
    alert(' Error al cancelar la reserva');
  }
};

// Cerrar sesión
const handleLogout = async () => {
  loading.value = true;
  try {
    await logout();
    await router.push('/');
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  } finally {
    loading.value = false;
  }
};

// Cargar reservas al montar el componente
onMounted(() => {
  void cargarReservasConfirmadas();
});
</script>

<style scoped>
.q-item {
  border-bottom: 1px solid #eee;
}
.q-item:last-child {
  border-bottom: none;
}
</style>
